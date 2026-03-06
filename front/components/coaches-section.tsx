const coaches = [
  {
    name: "이경태",
    role: "대표 / Head Coach",
    description: "선수 개개인의 특성에 맞춘 체계적인 지도와 데이터 기반의 분석으로 최고의 기량을 이끌어냅니다.",
    tags: ["선수 육성", "투수/타격", "피지컬"],
    initials: "KT",
  },
  {
    name: "조용호",
    role: "야수 전문 총괄 코치",
    description: "실전 수비 노하우와 견고한 타격 이론을 바탕으로 한 야수 전문 트레이닝.",
    tags: ["야수 레슨", "수비/타격", "실전 감각"],
    initials: "YH",
  },
  {
    name: "이원준",
    role: "투수 총괄 코치",
    description: "프로 출신 투수 코치의 전문적인 피칭 메커니즘 지도 및 구종 연마.",
    tags: ["투수 레슨", "피칭 메커니즘", "구속 증가"],
    initials: "WJ",
  },
  {
    name: "김유민",
    role: "수비 코치",
    description: "기본기부터 심화 과정까지, 탄탄한 수비력을 기르는 전문 수비 지도.",
    tags: ["수비 기본기", "포지션 훈련", "핸들링"],
    initials: "YM",
  },
  {
    name: "김지원",
    role: "센터장 / 트레이너",
    description: "과학적인 신체 분석과 맞춤형 트레이닝으로 부상 방지 및 퍼포먼스 향상.",
    tags: ["재활/교정", "피지컬 트레이닝", "컨디셔닝"],
    initials: "JW",
  },
]

export function CoachesSection() {
  return (
    <section id="coaches" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="mb-12">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-primary">
          INSTRUCTORS
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {"코치진 소개"}
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          {"실력과 열정을 겸비한 최고의 코치진이 선수들과 함께합니다."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {coaches.map((coach) => (
          <div
            key={coach.name}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {coach.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{coach.name}</h3>
                <p className="text-sm text-primary">{coach.role}</p>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{coach.description}</p>

            <div className="flex flex-wrap gap-2">
              {coach.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
