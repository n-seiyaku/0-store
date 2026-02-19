'use client'

import { useEffect, useState } from 'react'

interface LoveUnlockedModalProps {
    // Callback khi user bấm nút tiếp tục
    onClose: () => void
}

// Vị trí các particle trái tim cố định (tránh hydration mismatch)
const PARTICLES = [
    // Hàng trên
    { left: '5%', top: '8%', delay: '0s', size: 'text-2xl', duration: '2.2s' },
    {
        left: '18%',
        top: '5%',
        delay: '0.4s',
        size: 'text-xl',
        duration: '2.8s',
    },
    {
        left: '32%',
        top: '12%',
        delay: '0.9s',
        size: 'text-3xl',
        duration: '2.0s',
    },
    {
        left: '48%',
        top: '4%',
        delay: '0.2s',
        size: 'text-2xl',
        duration: '3.0s',
    },
    {
        left: '62%',
        top: '9%',
        delay: '0.7s',
        size: 'text-xl',
        duration: '2.5s',
    },
    {
        left: '76%',
        top: '6%',
        delay: '0.1s',
        size: 'text-3xl',
        duration: '2.3s',
    },
    {
        left: '90%',
        top: '11%',
        delay: '0.5s',
        size: 'text-2xl',
        duration: '2.7s',
    },
    // Hàng trái
    {
        left: '2%',
        top: '28%',
        delay: '1.1s',
        size: 'text-xl',
        duration: '2.4s',
    },
    {
        left: '8%',
        top: '45%',
        delay: '0.3s',
        size: 'text-3xl',
        duration: '2.9s',
    },
    {
        left: '3%',
        top: '62%',
        delay: '0.8s',
        size: 'text-2xl',
        duration: '2.1s',
    },
    {
        left: '11%',
        top: '78%',
        delay: '0.6s',
        size: 'text-xl',
        duration: '2.6s',
    },
    // Hàng phải
    {
        left: '88%',
        top: '30%',
        delay: '0.2s',
        size: 'text-2xl',
        duration: '2.3s',
    },
    {
        left: '94%',
        top: '48%',
        delay: '1.0s',
        size: 'text-xl',
        duration: '2.8s',
    },
    {
        left: '87%',
        top: '65%',
        delay: '0.4s',
        size: 'text-3xl',
        duration: '2.0s',
    },
    {
        left: '92%',
        top: '80%',
        delay: '0.7s',
        size: 'text-2xl',
        duration: '3.1s',
    },
    // Hàng dưới
    {
        left: '15%',
        top: '88%',
        delay: '0.9s',
        size: 'text-xl',
        duration: '2.5s',
    },
    {
        left: '28%',
        top: '92%',
        delay: '0.1s',
        size: 'text-2xl',
        duration: '2.2s',
    },
    {
        left: '42%',
        top: '86%',
        delay: '0.6s',
        size: 'text-3xl',
        duration: '2.7s',
    },
    {
        left: '57%',
        top: '91%',
        delay: '0.3s',
        size: 'text-xl',
        duration: '2.4s',
    },
    {
        left: '71%',
        top: '85%',
        delay: '0.8s',
        size: 'text-2xl',
        duration: '3.0s',
    },
    // Vùng giữa (xung quanh modal)
    {
        left: '22%',
        top: '35%',
        delay: '1.2s',
        size: 'text-lg',
        duration: '2.6s',
    },
    {
        left: '74%',
        top: '38%',
        delay: '0.5s',
        size: 'text-lg',
        duration: '2.1s',
    },
    {
        left: '25%',
        top: '58%',
        delay: '0.0s',
        size: 'text-xl',
        duration: '2.9s',
    },
    {
        left: '72%',
        top: '55%',
        delay: '1.3s',
        size: 'text-xl',
        duration: '2.3s',
    },
    {
        left: '38%',
        top: '22%',
        delay: '0.7s',
        size: 'text-lg',
        duration: '2.5s',
    },
    {
        left: '60%',
        top: '25%',
        delay: '0.2s',
        size: 'text-2xl',
        duration: '2.0s',
    },
    {
        left: '35%',
        top: '72%',
        delay: '1.0s',
        size: 'text-lg',
        duration: '2.8s',
    },
    {
        left: '64%',
        top: '75%',
        delay: '0.4s',
        size: 'text-xl',
        duration: '2.4s',
    },
    {
        left: '50%',
        top: '18%',
        delay: '0.6s',
        size: 'text-2xl',
        duration: '3.2s',
    },
    {
        left: '50%',
        top: '82%',
        delay: '1.1s',
        size: 'text-xl',
        duration: '2.6s',
    },
]

export function LoveUnlockedModal({ onClose }: LoveUnlockedModalProps) {
    // State để điều khiển animation vào/ra
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Trigger animation vào sau 1 frame
        const t = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(t)
    }, [])

    // Đóng modal với animation fade-out trước
    const handleClose = () => {
        setVisible(false)
        setTimeout(onClose, 350)
    }

    return (
        <>
            <style>{`
                @keyframes floatUp {
                    0%   { opacity: 0; transform: translateY(0) scale(0.5); }
                    30%  { opacity: 1; }
                    100% { opacity: 0; transform: translateY(-120px) scale(1.2); }
                }
                @keyframes popIn {
                    0%   { opacity: 0; transform: scale(0.7) translateY(24px); }
                    60%  { transform: scale(1.04) translateY(-4px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 24px 4px rgba(236, 72, 153, 0.35); }
                    50%       { box-shadow: 0 0 48px 12px rgba(236, 72, 153, 0.6); }
                }
                .particle {
                    position: absolute;
                    animation: floatUp 2.4s ease-in-out infinite;
                    pointer-events: none;
                    user-select: none;
                }
                .modal-card {
                    animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .shimmer-text {
                    background: linear-gradient(
                        90deg,
                        #f9a8d4 0%,
                        #ec4899 25%,
                        #ffffff 50%,
                        #ec4899 75%,
                        #f9a8d4 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 2.5s linear infinite;
                }
                .glow-btn {
                    animation: pulseGlow 2s ease-in-out infinite;
                }
            `}</style>

            {/* Backdrop */}
            <div
                onClick={handleClose}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(8px)',
                    transition: 'opacity 0.35s ease',
                    opacity: visible ? 1 : 0,
                }}
            >
                {/* Floating particles */}
                {PARTICLES.map((p, i) => (
                    <span
                        key={i}
                        className={`particle ${p.size}`}
                        style={{
                            left: p.left,
                            top: p.top,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                        }}
                    >
                        ♡
                    </span>
                ))}

                {/* Modal card — click không lan ra backdrop */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="modal-card relative w-full max-w-md overflow-hidden rounded-3xl border border-pink-500/30 bg-gray-900 p-8 text-center shadow-2xl"
                    style={{
                        transition: 'opacity 0.35s ease',
                        opacity: visible ? 1 : 0,
                    }}
                >
                    {/* Glow ring */}
                    <div className="glow-btn absolute inset-0 rounded-3xl" />

                    {/* Background gradient trang trí */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
                        style={{
                            background:
                                'radial-gradient(ellipse at 50% 0%, #ec489980, transparent 70%)',
                        }}
                    />

                    {/* Icon trái tim lớn */}
                    <div className="relative mb-4 flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-pink-500/40 bg-pink-500/10">
                            <span className="text-5xl leading-none">♡</span>
                        </div>
                    </div>

                    {/* Tiêu đề */}
                    <h2 className="shimmer-text relative mb-2 text-3xl font-extrabold tracking-tight">
                        Mở khóa thành công!
                    </h2>

                    {/* Nhãn badge mới */}
                    <span className="relative mb-4 inline-block rounded-full border border-pink-500/50 bg-pink-500/15 px-4 py-1 text-xs font-semibold tracking-widest text-pink-300 uppercase">
                        Tính năng mới
                    </span>

                    {/* Mô tả */}
                    <p className="relative mt-3 leading-relaxed text-gray-300">
                        Anh đã mở khóa phương thức thanh toán đặc biệt
                    </p>
                    <p className="relative mt-1 text-lg font-bold text-pink-300">
                        &ldquo;Để anh trả&rdquo;
                    </p>
                    <p className="relative mt-2 text-sm text-gray-500">
                        Chọn phương thức này để anh thanh toán giúp em, không
                        cần lo gì hết nhé.
                    </p>

                    {/* Divider */}
                    <div className="relative my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent to-pink-500/30" />
                        <span className="text-xs text-pink-400">♡</span>
                        <div className="h-px flex-1 bg-linear-to-l from-transparent to-pink-500/30" />
                    </div>

                    {/* Nút CTA */}
                    <button
                        onClick={handleClose}
                        className="relative w-full rounded-2xl bg-linear-to-r from-pink-600 to-pink-400 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:from-pink-500 hover:to-pink-300 hover:shadow-pink-500/40 active:scale-[0.97]"
                    >
                        Chọn phương thức ngay
                    </button>

                    <p className="relative mt-3 text-xs text-gray-600">
                        Bấm bất kỳ đâu để đóng
                    </p>
                </div>
            </div>
        </>
    )
}
