'use client'

import { Brand, Category } from '@/src/lib/db/type'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { toSlug } from '@/src/utils/toSlug'

export default function Sidebar({
    categories,
    selectedCategory,
    handleChangeCategory,
    brands,
    currentBrand,
}: {
    categories: Category[]
    selectedCategory: string
    handleChangeCategory: (category: string) => void
    brands: Brand[]
    currentBrand: Brand | null
}) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleBrandSelect = (brand: Brand) => {
        setIsOpen(false)
        router.push(`/buy/${toSlug(brand.name)}?brandId=${brand.id}`)
    }

    return (
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
            <div className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-1 backdrop-blur-xl lg:p-6">

                {/* Brand Switcher */}
                <div className="mb-4 p-2 lg:p-0" ref={dropdownRef}>
                    <p className="mb-1.5 hidden text-xs font-bold tracking-widest text-gray-500 uppercase lg:block">
                        Thương hiệu
                    </p>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen((v) => !v)}
                            className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-700/60 bg-gray-800/80 px-3 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-blue-600/60 hover:bg-gray-800"
                        >
                            <span className="truncate">
                                {currentBrand?.name ?? 'Chọn thương hiệu'}
                            </span>
                            <span
                                className={`material-symbols-outlined text-base text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            >
                                expand_more
                            </span>
                        </button>

                        {/* Dropdown list */}
                        {isOpen && (
                            <div className="absolute left-0 z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-700/60 bg-gray-900 shadow-xl shadow-black/40">
                                {brands.map((brand) => {
                                    const isActive =
                                        brand.id === currentBrand?.id
                                    return (
                                        <button
                                            key={brand.id}
                                            onClick={() =>
                                                handleBrandSelect(brand)
                                            }
                                            className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                                                isActive
                                                    ? 'bg-blue-600/20 text-blue-300'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            {isActive && (
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                                            )}
                                            {!isActive && (
                                                <span className="h-1.5 w-1.5 shrink-0" />
                                            )}
                                            {brand.name}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-4 hidden h-px bg-gray-800 lg:block" />

                {/* Category list */}
                <h3 className="mb-4 hidden text-xs font-bold tracking-widest text-gray-500 uppercase lg:block">
                    Danh mục
                </h3>
                <div className="scrollbar-hide flex gap-2 overflow-x-auto p-2 lg:flex-col lg:p-0">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleChangeCategory(category.id)}
                            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 lg:w-full lg:text-left lg:text-base ${
                                selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white lg:bg-transparent lg:hover:bg-gray-800/50'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
