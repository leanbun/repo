import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-baseball.jpg"
          alt="Baseball training facility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-wider text-primary">
              BASEBALL ACADEMY
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-pretty">
              {"야구 아카데미의"}
              <br />
              <span className="text-primary">{"새로운 기준"}</span>
            </span>
          </h1>

          <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {"감에 의존하는 훈련은 이제 그만. 첨단 장비 분석과 프로 코치진의 체계적인 야구 레슨으로 선수의 잠재력을 확실한 실력으로 만들어드립니다."}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              {"수업 문의하기"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
              {"프로그램 보기"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid max-w-xl grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">5+</div>
            <div className="mt-1 text-sm text-muted-foreground">{"전문 코치진"}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">300</div>
            <div className="mt-1 text-sm text-muted-foreground">{"평 규모 시설"}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">6+</div>
            <div className="mt-1 text-sm text-muted-foreground">{"전문 프로그램"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
