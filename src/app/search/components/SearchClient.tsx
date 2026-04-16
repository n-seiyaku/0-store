'use client'

import { Drink, Topping, Brand, Size } from '@/src/lib/db/type'
import { useState, useCallback } from 'react'
import { getSizesByCategory } from '@/src/lib/sizeStore'
import ProductGrid from '@/src/components/ProductGrid'
import Addition from '@/src/app/buy/[brandName]/components/Addition'

interface SearchClientProps {
    drinks: (Drink & { brand: Brand; hasTopping: boolean })[]
    toppings: Topping[]
}

export default function SearchClient({ drinks, toppings }: SearchClientProps) {
    const [selectedDrink, setSelectedDrink] = useState<
        (Drink & { brand: Brand; hasTopping: boolean }) | null
    >(null)

    // Cache sizes per category - fetch once and reuse
    const [sizesCache, setSizesCache] = useState<Record<string, Size[]>>({})

    // Fetch sizes for the selected drink's category if not already cached
    const fetchSizesIfNeeded = useCallback(
        async (categoryId: string) => {
            if (sizesCache[categoryId]) return
            const data = await getSizesByCategory(categoryId)
            setSizesCache((prev) => ({ ...prev, [categoryId]: data }))
        },
        [sizesCache],
    )

    // When a drink is selected, also trigger size fetch
    const handleSelectDrink = (
        drink: Drink & { brand: Brand; hasTopping: boolean },
    ) => {
        setSelectedDrink(drink)
        fetchSizesIfNeeded(drink.categoryId)
    }

    // Group drinks by brand
    const groupedDrinks = drinks.reduce(
        (acc, drink) => {
            const brandName = drink.brand.name
            if (!acc[brandName]) {
                acc[brandName] = []
            }
            acc[brandName].push(drink)
            return acc
        },
        {} as Record<string, typeof drinks>,
    )

    return (
        <div>
            {Object.entries(groupedDrinks).map(([brandName, brandDrinks]) => (
                <div key={brandName} className="mb-12">
                    <div className="mb-6 flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {brandName}
                        </h2>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <ProductGrid
                        drinks={brandDrinks}
                        onSelectProduct={handleSelectDrink}
                    />
                </div>
            ))}

            {/* Modal Overlay Logic - Reused from BuyClient */}
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
                            toppings={toppings.filter(
                                (t) => t.brandId === selectedDrink.brand.id,
                            )}
                            hasTopping={selectedDrink.hasTopping}
                            onClose={() => setSelectedDrink(null)}
                            sizes={sizesCache[selectedDrink.categoryId] ?? []}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
