'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

// Success content component that uses searchParams
function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-white">
            {/* Animated circle */}
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
                {/* Outer ring animation */}
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30" />
                {/* Inner circle */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                    <span className="material-symbols-outlined text-5xl text-white [font-variation-settings:'FILL'_1]">
                        check_circle
                    </span>
                </div>
            </div>

            {/* Title */}
            <h1 className="mb-3 text-4xl font-bold tracking-tight">
                Đặt hàng thành công!
            </h1>
            <p className="mb-8 text-center text-gray-400">
                Cảm ơn bạn đã tin tưởng chúng tôi.
                <br />
                Đơn hàng của bạn đang được xử lý.
            </p>

            {/* Order ID card */}
            {orderId && (
                <div className="mb-10 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-900/80 p-6 text-center backdrop-blur-sm">
                    <p className="mb-2 text-sm tracking-widest text-gray-500 uppercase">
                        Mã đơn hàng
                    </p>
                    <p className="font-mono text-2xl font-bold text-emerald-400">
                        #{orderId}
                    </p>
                    <p className="mt-3 text-xs text-gray-500">
                        Lưu mã này để theo dõi đơn hàng của bạn
                    </p>
                </div>
            )}

            {/* Info steps */}
            <div className="mb-10 flex w-full max-w-sm flex-col gap-3">
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
                        label: 'Vận chuyển đến bạn',
                        done: false,
                    },
                ].map((step, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-3"
                    >
                        <span
                            className={`material-symbols-outlined text-xl [font-variation-settings:'FILL'_1] ${
                                step.done ? 'text-emerald-400' : 'text-gray-600'
                            }`}
                        >
                            {step.icon}
                        </span>
                        <span
                            className={`text-sm ${step.done ? 'text-white' : 'text-gray-500'}`}
                        >
                            {step.label}
                        </span>
                        {step.done && (
                            <span className="material-symbols-outlined ml-auto text-base text-emerald-400 [font-variation-settings:'FILL'_1]">
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
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-3 font-semibold text-gray-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">
                        home
                    </span>
                    Về trang chủ
                </Link>
                <Link
                    href="/menu"
                    className="flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-8 py-3 font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-800 hover:text-white active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">
                        restaurant_menu
                    </span>
                    Mua thêm
                </Link>
            </div>
        </div>
    )
}

// Main page with Suspense boundary (required for useSearchParams)
export default function OrderSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                    <span className="material-symbols-outlined animate-spin text-4xl text-emerald-400">
                        progress_activity
                    </span>
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    )
}
