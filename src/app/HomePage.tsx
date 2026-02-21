'use client'

import { useState, useEffect } from 'react'
import { Brand } from '@/src/lib/db/type'
import Link from 'next/link'
import { toSlug } from '@/src/utils/toSlug'

interface HomePageProps {
    brands: Brand[]
}

// Rotating gradient accent per brand card
const CARD_ACCENTS = [
    { ring: 'hover:ring-pink-400/30', dot: 'bg-pink-400', glow: 'group-hover:shadow-pink-500/10' },
    { ring: 'hover:ring-violet-400/30', dot: 'bg-violet-400', glow: 'group-hover:shadow-violet-500/10' },
    { ring: 'hover:ring-sky-400/30', dot: 'bg-sky-400', glow: 'group-hover:shadow-sky-500/10' },
    { ring: 'hover:ring-emerald-400/30', dot: 'bg-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
    { ring: 'hover:ring-amber-400/30', dot: 'bg-amber-400', glow: 'group-hover:shadow-amber-500/10' },
    { ring: 'hover:ring-rose-400/30', dot: 'bg-rose-400', glow: 'group-hover:shadow-rose-500/10' },
] as const

const BRAND_EMOJI = ['🧋', '🍵', '☕', '🍹', '🧃', '🥤']

// A few short love lines shown randomly in the greeting
const LOVE_LINES = [
    'Hôm nay em muốn uống gì?',
    'Uống gì chọn đi ❤️',
]

export default function HomePage({ brands }: HomePageProps) {
    // Default to first line on SSR, pick randomly on client to avoid hydration mismatch
    const [line, setLine] = useState(LOVE_LINES[0])

    useEffect(() => {
        setLine(LOVE_LINES[Math.floor(Math.random() * LOVE_LINES.length)])
    }, [])

    return (
        <div className="min-h-screen bg-[#081d35]">

            {/* ─── Greeting ─── */}
            <section className="relative overflow-hidden px-4 pt-24 pb-16 text-center">
                {/* Soft background glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[100px]" />
                    <div className="absolute top-12 left-1/2 h-48 w-[400px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[80px]" />
                </div>

                <div className="relative mx-auto max-w-xl">
                    {/* Small heart badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
                        <span>🫶</span>
                        <span className="font-medium">Làm với yêu thương</span>
                    </div>

                    {/* Main headline */}
                    <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                        Trà sữa 0 đồng,{' '}
                        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                            tặng cho bống hồng nhà tui
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-base leading-relaxed text-blue-100/50 md:text-lg">
                        {line}
                    </p>
                </div>
            </section>

            {/* ─── Brand Grid ─── */}
            <section className="px-4 pb-24">
                <div className="container mx-auto max-w-4xl">

                    {/* Subtle label */}
                    <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-blue-100/25">
                        Chọn thương hiệu
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {brands.map((brand: Brand, index: number) => {
                            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
                            const emoji = BRAND_EMOJI[index % BRAND_EMOJI.length]

                            return (
                                <Link
                                    href={`/buy/${toSlug(brand.name)}?brandId=${brand.id}`}
                                    key={brand.id}
                                    className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/6 bg-[#0d223a] p-5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:shadow-xl ${accent.ring} ${accent.glow}`}
                                >
                                    {/* Emoji icon */}
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/8 transition-transform duration-300 group-hover:scale-105">
                                        {emoji}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="truncate text-base font-semibold text-white transition-colors group-hover:text-blue-200">
                                            {brand.name}
                                        </h2>
                                        <p className="mt-0.5 text-xs text-blue-100/35">
                                            Xem menu →
                                        </p>
                                    </div>

                                    {/* Accent dot */}
                                    <div className={`h-2 w-2 shrink-0 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100 ${accent.dot}`} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

        </div>
    )
}
