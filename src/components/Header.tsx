'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'
import SearchInput from './SearchInput'

export default function Header() {
    const { totalItems, toggleCart } = useCart()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/6 bg-[#081d35]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                        🧋
                    </span>
                    <div className="flex flex-col leading-none">
                        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-base font-bold text-transparent">
                            Trà Sữa 0 Ngàn
                        </span>
                        <span className="text-[10px] text-blue-100/30 tracking-wide">
                            Thanh Nhàn mua cho bạn 🫶
                        </span>
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <SearchInput />

                    {/* Cart button */}
                    <button
                        onClick={() => toggleCart()}
                        aria-label="Giỏ hàng"
                        className="group relative flex h-10 w-10 items-center justify-center rounded-full text-blue-100/50 transition-all hover:bg-white/6 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-xl">
                            shopping_bag
                        </span>
                        {totalItems > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-[#081d35]">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </header>
    )
}
