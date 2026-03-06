import { ArrowUpRight } from "lucide-react"

const newsItems = [
  {
    category: "News",
    title: "브라더스포츠아카데미 2호점(간석점) 오픈 안내",
    description: "인천 최대 규모 300평 시설, 엘리트 선수반 및 재활 센터 완비",
    color: "bg-primary/10 text-primary",
  },
  {
    category: "Event",
    title: "선수 트레이닝 센터",
    description: "국제바로병원 협약 기념, 무료 체형 분석 이벤트 진행중",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    category: "Program",
    title: "유소년 야구단",
    description: "야구를 좋아하는 아이라면 누구나! 즐겁게 배우는 야구 교실",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    category: "Lesson",
    title: "투수/타격 정밀 분석",
    description: "랩소도, 4채널 카메라 등 첨단 장비를 활용한 데이터 분석 레슨",
    color: "bg-chart-5/10 text-chart-5",
  },
]

export function NewsSection() {
  return (
    <section id="news" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-primary">
            NEWS & EVENTS
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"아카데미 소식"}
          </h2>
        </div>
        <button className="hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:inline-flex">
          {"블로그 더보기"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {newsItems.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
          >
            <div>
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${item.color}`}
              >
                {item.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
              {"Read more"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
