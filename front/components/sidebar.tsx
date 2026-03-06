"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  Dumbbell,
  Users,
  Newspaper,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "hero", label: "HOME", icon: Home },
  { id: "programs", label: "PROGRAMS", icon: Dumbbell },
  { id: "process", label: "PROCESS", icon: ChevronRight },
  { id: "coaches", label: "COACHES", icon: Users },
  { id: "news", label: "NEWS", icon: Newspaper },
  { id: "contact", label: "CONTACT", icon: MapPin },
]

interface SidebarProps {
  activeSection: string
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const supabase = createClient()
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
      supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u ?? null))
      return () => subscription.unsubscribe()
    } catch {
      setUser(null)
      return () => {}
    }
  }, [])

  async function handleLogout() {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {
      // env 미설정 등
    }
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-lg bg-card p-2 text-foreground lg:hidden"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[240px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold tracking-tight">BSA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold tracking-wider text-foreground">
                BROTHER SPORTS
              </span>
              <span className="truncate text-xs text-muted-foreground">ACADEMY</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Contact CTA */}
        {!collapsed && (
          <div className="border-t border-border p-4">
            <button
              onClick={() => handleNavClick("contact")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" />
              <span>032-425-4225</span>
            </button>
          </div>
        )}

        {/* 로그인 / 회원가입 / 로그아웃 */}
        <div className="border-t border-border p-3 space-y-2">
          {user ? (
            <>
              <p className="truncate px-2 text-xs text-muted-foreground">{user.email}</p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-muted-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!collapsed && <span>로그아웃</span>}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="block" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
                  <LogIn className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>로그인</span>}
                </Button>
              </Link>
              <Link href="/signup" className="block" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
                  <UserPlus className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>회원가입</span>}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-10 items-center justify-center border-t border-border text-muted-foreground transition-colors hover:text-foreground lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>
    </>
  )
}
