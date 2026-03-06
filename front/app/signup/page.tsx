"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const signupSchema = z
  .object({
    email: z.string().email("올바른 이메일을 입력하세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

const EMAIL_RATE_LIMIT_SECONDS = 25

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  /** 25초 쿨다운 시 남은 초 (0이면 제한 없음) */
  const [cooldownLeft, setCooldownLeft] = useState(0)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  // 25초 쿨다운 타이머
  useEffect(() => {
    if (cooldownLeft <= 0) return
    const t = setInterval(() => setCooldownLeft((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldownLeft])

  async function onSubmit(values: SignupFormValues) {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      // 메일 인증 없이 즉시 가입 (Supabase 대시보드에서 Confirm email 끄면 세션 바로 발급)
    })
    setLoading(false)
    if (signUpError) {
      const isRateLimit = signUpError.message.includes("25 seconds")
      setError(
        isRateLimit
          ? "보안을 위해 이메일 인증 요청은 25초에 한 번만 가능합니다. 잠시 후 다시 시도해 주세요."
          : signUpError.message
      )
      if (isRateLimit) setCooldownLeft(EMAIL_RATE_LIMIT_SECONDS)
      return
    }
    // 가입 완료 시 홈으로 이동 (Confirm email 비활성화 시 이미 로그인된 상태)
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>브라더스 스포츠 아카데미 계정을 만드세요.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-8">
              <Button type="submit" className="w-full" disabled={loading || cooldownLeft > 0}>
                {loading
                  ? "가입 중…"
                  : cooldownLeft > 0
                    ? `${cooldownLeft}초 후 다시 시도 가능`
                    : "회원가입"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-primary underline underline-offset-4 hover:no-underline">
                  로그인
                </Link>
              </p>
              <Link href="/" className="text-center text-sm text-muted-foreground underline underline-offset-4 hover:no-underline">
                홈으로
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
