"use client"

import { useEffect, useState, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { ProgramsSection } from "@/components/programs-section"
import { ProcessSection } from "@/components/process-section"
import { CoachesSection } from "@/components/coaches-section"
import { NewsSection } from "@/components/news-section"
import { ContactSection } from "@/components/contact-section"

const sectionIds = ["hero", "programs", "process", "coaches", "news", "contact"]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: 0.3 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Detect sidebar collapse state by checking sidebar width
  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector("aside")
      if (sidebar) {
        setSidebarCollapsed(sidebar.offsetWidth <= 72)
      }
    }

    checkSidebar()
    const interval = setInterval(checkSidebar, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} />

      {/* Main content */}
      <main
        ref={mainRef}
        className={`min-h-screen flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"
        }`}
      >
        <HeroSection />
        <div className="border-t border-border" />
        <ProgramsSection />
        <div className="border-t border-border" />
        <ProcessSection />
        <div className="border-t border-border" />
        <CoachesSection />
        <div className="border-t border-border" />
        <NewsSection />
        <div className="border-t border-border" />
        <ContactSection />
      </main>
    </div>
  )
}
