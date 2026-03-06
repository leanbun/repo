import { MessageSquare, ClipboardCheck, PlayCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "상담 문의",
    description: "전화나 방문을 통해 훈련 스케줄과 프로그램에 대해 상세히 안내해드립니다.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "테스트 및 등록",
    description: "테스트 결과와 상담 내용을 바탕으로 최적의 클래스로 배정합니다.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "훈련 시작",
    description: "배정된 클래스에서 전문 코치진과 함께 즐겁고 체계적인 훈련을 시작합니다.",
    icon: PlayCircle,
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="mb-12">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-primary">
          PROCESS
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {"입단 및 교육 절차"}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.number}
              className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
            >
              {/* Step number */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-primary/30">{step.number}</span>
              </div>

              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
