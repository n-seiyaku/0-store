'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/src/context/CartContext'
import { useState } from 'react'
interface CartSummaryProps {
    subTotal: number
    disabled: boolean
}

export function CartSummary({ subTotal, disabled }: CartSummaryProps) {
    const router = useRouter()
    const { toggleCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="mt-6 space-y-4 border-t border-gray-800 pt-6">
            <div className="flex items-center justify-between">
                <p className="text-gray-400">Tổng tiền:</p>
                <p className="text-xl font-bold text-white">
                    {subTotal.toLocaleString()} VND
                </p>
            </div>
            <button
                onClick={() => {
                    setIsLoading(true)
                    router.push('/pay')
                    toggleCart()
                    setIsLoading(false)
                }}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    'Thanh toán'
                )}
            </button>
        </div>
    )
}
