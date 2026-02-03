'use client'

import { Drink, Topping, Brand } from '@/src/lib/db/type'
import { useState } from 'react'
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
                        onSelectProduct={setSelectedDrink}
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
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
