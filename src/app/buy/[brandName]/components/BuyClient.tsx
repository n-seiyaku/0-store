'use client'

import { Drink, Topping, Category, Size } from '@/src/lib/db/type'
import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { getDrinksByCategory } from '@/src/lib/drinkStore'
import { getSizesByCategory } from '@/src/lib/sizeStore'
import Sidebar from './Sidebar'
import ProductGrid from '@/src/components/ProductGrid'
import Addition from './Addition'

interface BuyClientProps {
    categories: Category[]
    initialDrinks: Drink[]
    initialCategoryId: string
    toppings: Topping[]
}

export default function BuyClient({
    categories,
    initialDrinks,
    initialCategoryId,
    toppings,
}: BuyClientProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [drinks, setDrinks] = useState<Drink[]>(initialDrinks)
    const [selectedCategory, setSelectedCategory] =
        useState<string>(initialCategoryId)
    const [isDrinksLoading, setIsDrinksLoading] = useState(false)
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)
    // Cache sizes: { [categoryId]: Size[] } - fetch once per category
    const [sizesCache, setSizesCache] = useState<Record<string, Size[]>>({})

    const fetchDrinks = async (categoryId: string) => {
        setIsDrinksLoading(true)
        try {
            const drinks = await getDrinksByCategory(categoryId)
            setDrinks(drinks)
        } finally {
            setIsDrinksLoading(false)
        }
    }

    // Fetch sizes only if not already cached for the given category
    const fetchSizesIfNeeded = useCallback(
        async (categoryId: string) => {
            if (sizesCache[categoryId]) return
            const data = await getSizesByCategory(categoryId)
            setSizesCache((prev) => ({ ...prev, [categoryId]: data }))
        },
        [sizesCache],
    )

    // Update URL param when category changes (preserves other params)
    const updateCategoryParam = useCallback(
        (categoryId: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('categoryId', categoryId)
            router.replace(`${pathname}?${params.toString()}`, { scroll: false })
        },
        [router, pathname, searchParams],
    )

    const handleChangeCategory = (category: string) => {
        if (selectedCategory === category) return
        setSelectedCategory(category)
        updateCategoryParam(category)
        fetchDrinks(category)
        fetchSizesIfNeeded(category)
    }

    // Preload sizes for initial category on mount
    useEffect(() => {
        if (selectedCategory) fetchSizesIfNeeded(selectedCategory)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="min-h-screen px-4 py-8 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                        <Sidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                        <ProductGrid
                            drinks={drinks}
                            isLoading={isDrinksLoading}
                            isSidebar
                            onSelectProduct={setSelectedDrink}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Overlay Logic */}
            {selectedDrink && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedDrink(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-md duration-200">
                        <Addition
                            drink={selectedDrink}
                            toppings={toppings}
                            onClose={() => setSelectedDrink(null)}
                            sizes={sizesCache[selectedDrink.categoryId] ?? []}
                            hasTopping={
                                categories.find(
                                    (c) => c.id === selectedDrink.categoryId,
                                )?.hasTopping ?? true
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
