"use client"

import { useState } from "react"
import { MapPin, Phone, Clock } from "lucide-react"

const locations = [
  {
    id: "branch1",
    name: "1호점",
    address: "인천광역시 남동구 방축로 488-3, 3층",
    subAddress: "브라더스포츠아카데미 1호점",
    phone: "032-425-4225",
    hours: [
      { label: "평일", value: "09:00 - 24:00" },
      { label: "토요일", value: "08:00 - 24:00" },
      { label: "일요일/공휴일", value: "08:00 - 24:00" },
    ],
    note: "연중무휴 | 상담시간 10:00 - 22:00",
    transit: "1호선 간석역 2번 출구 (도보 3분 거리)",
    mapUrl: "https://www.google.com/maps?q=인천광역시+남동구+방축로+488-3",
  },
  {
    id: "branch2",
    name: "2호점 (간석점)",
    address: "인천광역시 남동구 간석동",
    subAddress: "브라더스포츠아카데미 2호점",
    phone: "032-425-4225",
    hours: [
      { label: "평일", value: "09:00 - 24:00" },
      { label: "토요일", value: "08:00 - 24:00" },
      { label: "일요일/공휴일", value: "08:00 - 24:00" },
    ],
    note: "연중무휴 | 상담시간 10:00 - 22:00",
    transit: "인천 최대 규모 300평 시설",
    mapUrl: "https://www.google.com/maps?q=인천광역시+남동구+간석동",
  },
]

export function ContactSection() {
  const [activeTab, setActiveTab] = useState("branch1")
  const location = locations.find((l) => l.id === activeTab)!

  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="mb-10">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-primary">
          CONTACT
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {"오시는 길"}
        </h2>
      </div>

      {/* Tab buttons */}
      <div className="mb-6 flex gap-2">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveTab(loc.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeTab === loc.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Location Card */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-xl font-bold text-foreground">{location.name}</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-foreground">{location.address}</p>
                <p className="text-xs text-muted-foreground">({location.subAddress})</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm font-semibold text-foreground">{"문의 전화 "}{location.phone}</p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="space-y-1">
                {location.hours.map((h) => (
                  <div key={h.label} className="flex gap-4 text-sm">
                    <span className="w-20 text-muted-foreground">{h.label}</span>
                    <span className="text-foreground">{h.value}</span>
                  </div>
                ))}
                <p className="mt-2 text-xs text-muted-foreground">{location.note}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-secondary p-4">
            <p className="text-xs font-semibold text-muted-foreground">{"교통편"}</p>
            <p className="mt-1 text-sm text-foreground">{location.transit}</p>
          </div>

          <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            {"방문상담 신청하기"}
          </button>
        </div>

        {/* Map placeholder */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            className="h-full min-h-[400px] w-full border-0 grayscale invert-[0.9] hue-rotate-180"
            loading="lazy"
            title={`${location.name} 지도`}
            allowFullScreen
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              BSA
            </div>
            <span className="text-sm font-bold tracking-wider text-foreground">BROTHER SPORTS ACADEMY</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {"Copyright Brother Sports Academy. All rights reserved."}
          </p>
        </div>
      </footer>
    </section>
  )
}
