"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const programs = [
  {
    id: "pitching",
    title: "투수 전문 레슨",
    subtitle: "PITCHING CLASS",
    tag: "Elite",
    image: "/images/pitching.jpg",
    description: "정밀 투구 메커니즘 분석과 구종 연마. 랩소도를 활용한 데이터 기반 피칭 트레이닝.",
  },
  {
    id: "batting",
    title: "타격 전문 레슨",
    subtitle: "BATTING CLASS",
    tag: "Elite",
    image: "/images/batting.jpg",
    description: "과학적 스윙 분석과 맞춤 타격 교정. 타격 타이밍과 파워를 동시에 향상.",
  },
  {
    id: "fielding",
    title: "수비 전문 레슨",
    subtitle: "FIELDING CLASS",
    tag: "Elite",
    image: "/images/fielding.jpg",
    description: "포지션별 수비 노하우 전수. 기본기부터 실전 수비까지 체계적 지도.",
  },
  {
    id: "rehab",
    title: "재활 프로그램",
    subtitle: "REHAB CLASS",
    tag: "Medical",
    image: "/images/rehab.jpg",
    description: "국제바로병원 협약. 부상 예방 및 재활, 체형 교정 전문 프로그램.",
  },
  {
    id: "training",
    title: "선수 트레이닝",
    subtitle: "TRAINING CLASS",
    tag: "Conditioning",
    image: "/images/training.jpg",
    description: "과학적 신체 분석과 맞춤형 피지컬 트레이닝. 퍼포먼스 극대화.",
  },
  {
    id: "hobby",
    title: "사회인 / 취미반",
    subtitle: "HOBBY CLASS",
    tag: "Hobby",
    image: "/images/hobby.jpg",
    description: "야구를 좋아하는 분이라면 누구나! 즐겁게 배우는 야구 교실.",
  },
]

const filters = ["전체", "선수반", "취미반"]

export function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState("전체")

  const filteredPrograms = programs.filter((p) => {
    if (activeFilter === "전체") return true
    if (activeFilter === "선수반") return p.tag !== "Hobby"
    return p.tag === "Hobby"
  })

  return (
    <section id="programs" className="py-20 px-6 md:px-12 lg:px-16">
      {/* Section header */}
      <div className="mb-10">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-primary">
          CLASS PROGRAM
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {"야구 레슨 프로그램"}
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          {"목표에 맞춘 전문 코칭으로 선수의 잠재력을 이끌어냅니다."}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="rounded-md bg-primary/20 px-2 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                  {program.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="mb-1 block text-[11px] font-semibold tracking-[0.15em] text-muted-foreground">
                {program.subtitle}
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">{program.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
              <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                {"상세 보기"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
