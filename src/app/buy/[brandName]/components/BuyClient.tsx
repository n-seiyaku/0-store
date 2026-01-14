'use client'

import { Drink, Topping, Category } from '@/src/lib/db/type'
import { useState } from 'react'
import { getDrinksByCategory } from '@/src/lib/drinkStore'
import Sidebar from './Sidebar'
import ProductGrid from './ProductGrid'
import Addition from './Addition'

interface BuyClientProps {
    categories: Category[]
    initialDrinks: Drink[]
    toppings: Topping[]
}

export default function BuyClient({
    categories,
    initialDrinks,
    toppings,
}: BuyClientProps) {
    const [drinks, setDrinks] = useState<Drink[]>(initialDrinks)
    const [selectedCategory, setSelectedCategory] = useState<string>(
        categories.length > 0 ? categories[0].id : '',
    )
    const [isDrinksLoading, setIsDrinksLoading] = useState(false)
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)

    const fetchDrinks = async (selectedCategory: string) => {
        setIsDrinksLoading(true)
        try {
            const drinks = await getDrinksByCategory(selectedCategory)
            setDrinks(drinks)
        } finally {
            setIsDrinksLoading(false)
        }
    }

    const handleChangeCategory = (category: string) => {
        if (selectedCategory === category) return
        setSelectedCategory(category)
        fetchDrinks(category)
    }

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
                            selectedCategory={selectedCategory}
                            isLoading={isDrinksLoading}
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
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
