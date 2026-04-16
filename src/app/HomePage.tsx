'use client'

import { Brand } from '@/src/lib/db/type'
import Link from 'next/link'
import { toSlug } from '@/src/utils/toSlug'

interface HomePageProps {
    brands: Brand[]
}

const CARD_ACCENTS = [
    {
        bg: 'from-blue-950 to-blue-900',
        border: 'border-blue-700/30',
        badge: 'bg-blue-500/15 text-blue-300',
        dot: 'bg-blue-400',
    },
    {
        bg: 'from-violet-950 to-violet-900',
        border: 'border-violet-700/30',
        badge: 'bg-violet-500/15 text-violet-300',
        dot: 'bg-violet-400',
    },
    {
        bg: 'from-cyan-950 to-cyan-900',
        border: 'border-cyan-700/30',
        badge: 'bg-cyan-500/15 text-cyan-300',
        dot: 'bg-cyan-400',
    },
    {
        bg: 'from-indigo-950 to-indigo-900',
        border: 'border-indigo-700/30',
        badge: 'bg-indigo-500/15 text-indigo-300',
        dot: 'bg-indigo-400',
    },
    {
        bg: 'from-sky-950 to-sky-900',
        border: 'border-sky-700/30',
        badge: 'bg-sky-500/15 text-sky-300',
        dot: 'bg-sky-400',
    },
    {
        bg: 'from-purple-950 to-purple-900',
        border: 'border-purple-700/30',
        badge: 'bg-purple-500/15 text-purple-300',
        dot: 'bg-purple-400',
    },
]

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
    const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

    return (
        <Link
            href={`/buy/${toSlug(brand.name)}?brandId=${brand.id}`}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-linear-to-br ${accent.bg} ${accent.border} p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99]`}
        >
            {/* Top row */}
            <div className="flex items-start justify-between">
                <div
                    className={`rounded-xl px-3 py-1 text-xs font-medium ${accent.badge}`}
                >
                    Trà sữa
                </div>
                <span className="material-symbols-outlined text-xl text-white/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60">
                    arrow_outward
                </span>
            </div>

            {/* Emoji */}
            <div className="my-6 text-center text-6xl transition-transform duration-300 group-hover:scale-110">
                🧋
            </div>

            {/* Bottom */}
            <div>
                <h3 className="mb-1 text-lg font-bold text-white">
                    {brand.name}
                </h3>
                <div className="flex items-center gap-1.5">
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                    />
                    <p className="text-xs text-white/50">Xem menu đầy đủ</p>
                </div>
            </div>
        </Link>
    )
}

export default function HomePage({ brands }: HomePageProps) {
    return (
        <div className="min-h-screen bg-[#081d35]">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="mb-1 text-3xl font-bold text-white">
                        Chọn thương hiệu
                    </h1>
                    <p className="text-sm text-gray-400">
                        {brands.length} thương hiệu đang hoạt động
                    </p>
                </div>

                {/* Brand grid */}
                {brands.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {brands.map((brand, i) => (
                            <BrandCard key={brand.id} brand={brand} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/5 bg-white/3 py-20 text-center">
                        <span className="text-5xl">🧋</span>
                        <p className="text-gray-500">
                            Chưa có thương hiệu nào.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
