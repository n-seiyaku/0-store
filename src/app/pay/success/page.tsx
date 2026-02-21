'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

// Random love messages shown after ordering
const SUCCESS_LOVE_LINES = [
    'Anh đặt rồi nha, chờ tí thôi 🧋',
    'Em xứng đáng được uống ly trà ngon nhất 💛',
    'Đặt xong rồi, giờ ngồi yên để anh lo nốt nhé ❤️',
]

// Success content component that uses searchParams
function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')

    // Pick a random love line on client
    const loveLine =
        SUCCESS_LOVE_LINES[
            Math.floor(Math.random() * SUCCESS_LOVE_LINES.length)
        ]

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#081d35] px-4 text-white">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/8 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[80px]" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Heart icon */}
                <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
                    {/* Ping rings */}
                    <div className="absolute inset-0 animate-ping rounded-full bg-pink-500/15" />
                    <div className="absolute inset-2 animate-ping rounded-full bg-pink-500/10 [animation-delay:300ms]" />
                    <div className="absolute inset-0 rounded-full border border-pink-400/20" />
                    {/* Center */}
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-violet-500 shadow-[0_0_50px_rgba(244,114,182,0.35)]">
                        <span className="text-4xl">🫶</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="mb-3 text-center text-4xl font-bold tracking-tight">
                    Đặt hàng thành công!
                </h1>

                {/* Love tagline */}
                <p className="mb-8 text-center text-base leading-relaxed text-blue-100/50">
                    {loveLine}
                </p>

                {/* Order ID card */}
                {orderId && (
                    <div className="mb-8 w-full max-w-sm rounded-2xl border border-white/8 bg-white/4 p-6 text-center backdrop-blur-sm">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-100/30">
                            Mã đơn hàng
                        </p>
                        <p className="font-mono text-2xl font-bold text-pink-400">
                            #{orderId}
                        </p>
                        <p className="mt-3 text-xs text-blue-100/25">
                            Lưu mã này để theo dõi nhé 🌸
                        </p>
                    </div>
                )}

                {/* Status steps */}
                <div className="mb-10 flex w-full max-w-sm flex-col gap-2.5">
                    {[
                        {
                            icon: 'receipt_long',
                            label: 'Đơn hàng đã được ghi nhận',
                            done: true,
                        },
                        {
                            icon: 'inventory_2',
                            label: 'Đang chuẩn bị hàng',
                            done: false,
                        },
                        {
                            icon: 'local_shipping',
                            label: 'Vận chuyển đến em',
                            done: false,
                        },
                    ].map((step, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                                step.done
                                    ? 'border-pink-400/20 bg-pink-500/8'
                                    : 'border-white/5 bg-white/3'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-xl [font-variation-settings:'FILL'_1] ${
                                    step.done
                                        ? 'text-pink-400'
                                        : 'text-blue-100/20'
                                }`}
                            >
                                {step.icon}
                            </span>
                            <span
                                className={`text-sm ${step.done ? 'text-white' : 'text-blue-100/30'}`}
                            >
                                {step.label}
                            </span>
                            {step.done && (
                                <span className="material-symbols-outlined ml-auto text-base text-pink-400 [font-variation-settings:'FILL'_1]">
                                    check
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:brightness-110 hover:shadow-pink-500/40 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">
                            home
                        </span>
                        Về trang chủ
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-blue-100/70 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">
                            add_circle
                        </span>
                        Đặt thêm
                    </Link>
                </div>

                {/* Footer love note */}
                <p className="mt-12 text-xs text-blue-100/20">
                    Làm với yêu thương · Trà Sữa 0 Ngàn 🧋
                </p>
            </div>
        </div>
    )
}

// Main page with Suspense boundary (required for useSearchParams)
export default function OrderSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-[#081d35] text-white">
                    <span className="material-symbols-outlined animate-spin text-4xl text-pink-400">
                        progress_activity
                    </span>
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    )
}
