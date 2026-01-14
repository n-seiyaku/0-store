'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Header() {
    const { totalItems, toggleCart } = useCart()

    return (
        <header className="dark:bg-brand-dark/80 sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent"
                >
                    Trà sữa 0 Ngàn
                </Link>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        Products
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="group flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                        <span className="material-symbols-outlined text-xl">
                            search
                        </span>
                    </button>
                    <button
                        onClick={() => toggleCart()}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined text-xl">
                            shopping_cart
                        </span>
                        {totalItems > 0 && (
                            <span className="ring-brand-dark absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2">
                                {totalItems}
                            </span>
                        )}
                    </button>
                    <button className="group flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                        <span className="material-symbols-outlined text-xl">
                            person
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}
