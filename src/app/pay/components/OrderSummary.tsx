import Link from 'next/link'
import { CartItem } from '@/src/type/cart-item.types'
import { CheckoutItem } from './CheckoutItem'
import { useState } from 'react'
import { Order } from '@/src/lib/db/type'

interface OrderSummaryProps {
    cart: CartItem[]
    subTotal: number
    onApplyDiscount: (
        data: {
            value: number
            type: 'percentage' | 'fixed'
            code: string
        } | null,
    ) => void
    onOrder: () => Promise<void> | void
    // love-check thành công -> mở khóa phương thức thanh toán đặc biệt
    onLoveUnlocked?: () => void
}

type DiscountData = {
    isLovingCaring: boolean
    reason: string
    reasonSummary: string
}

export function OrderSummary({
    cart,
    subTotal,
    onApplyDiscount,
    onOrder,
    onLoveUnlocked,
}: OrderSummaryProps) {
    const [discountCode, setDiscountCode] = useState('')
    const [discount, setDiscount] = useState<number | null>(null)
    const [notDiscountReason, setNotDiscountReason] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(
        'fixed',
    )
    // Loading state for the order button
    const [isOrdering, setIsOrdering] = useState(false)

    const checkDiscountCode = async () => {
        setNotDiscountReason('')
        setDiscount(null)
        onApplyDiscount(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/love-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence: discountCode }),
            })
            const data = (await res.json()) as DiscountData

            if (data.isLovingCaring) {
                setDiscount(100)
                setDiscountType('percentage')
                onApplyDiscount({
                    value: 100,
                    type: 'percentage',
                    code: discountCode,
                })
                // Mở khóa phương thức thanh toán đặc biệt
                onLoveUnlocked?.()
            } else {
                setNotDiscountReason(data.reasonSummary)
            }
        } catch (error) {
            console.error('Error checking discount code:', error)
            setNotDiscountReason('Lỗi khi kiểm tra mã giảm giá')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="sticky top-8 space-y-6 rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
                Đơn hàng ({cart.length} món)
            </h2>

            {/* Checkout Items */}
            <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800 max-h-100 space-y-4 overflow-y-auto pr-2">
                {cart.map((item) => (
                    <CheckoutItem key={item.itemId} item={item} />
                ))}
            </div>

            {/* Discount Code */}
            <div className="border-t border-gray-800 pt-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Mã giảm giá"
                        className="flex-1 rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={checkDiscountCode}
                        disabled={isLoading}
                        className="relative min-w-22 rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? (
                            // Spinner hiện khi đang xử lý
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin text-blue-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                            </span>
                        ) : (
                            'Áp dụng'
                        )}
                    </button>
                </div>
                {notDiscountReason && (
                    <p className="mt-2 text-sm text-red-500">
                        {notDiscountReason}
                    </p>
                )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-800 py-4 text-sm">
                <div className="flex justify-between text-gray-400">
                    <span>Tạm tính</span>
                    <span>{subTotal.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Giảm giá</span>
                    <span>
                        {discount && discountType === 'percentage'
                            ? (-((discount / 100) * subTotal).toFixed(
                                  0,
                              )).toLocaleString()
                            : discount && discountType === 'fixed'
                              ? (-discount).toLocaleString()
                              : 0}{' '}
                        VND
                    </span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Phí giao hàng</span>
                    <span>Chưa tính</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-3 text-lg font-bold text-white">
                    <span>Tổng cộng</span>
                    <span className="text-blue-400">
                        {(discount && discountType === 'percentage'
                            ? subTotal - (discount / 100) * subTotal
                            : discount && discountType === 'fixed'
                              ? subTotal - discount
                              : subTotal
                        ).toLocaleString()}{' '}
                        VND
                    </span>
                </div>
            </div>

            <button
                onClick={async () => {
                    setIsOrdering(true)
                    try {
                        await onOrder()
                    } finally {
                        setIsOrdering(false)
                    }
                }}
                disabled={isOrdering}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isOrdering ? (
                    <>
                        <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Đang xử lý...
                    </>
                ) : (
                    'Đặt hàng ngay'
                )}
            </button>

            <p className="text-center text-xs text-gray-500">
                Bằng việc đặt hàng, bạn đồng ý với{' '}
                <Link href="#" className="text-blue-400 hover:underline">
                    điều khoản sử dụng
                </Link>
            </p>
        </div>
    )
}
