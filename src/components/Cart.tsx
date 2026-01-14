'use client'

import { useCart } from '@/src/context/CartContext'
import { useState } from 'react'
import { CartItem } from '@/src/type/cart-item.types'
import { Drink, Topping } from '@/src/lib/db/type'
import { getCategoryById } from '@/src/lib/drinkStore'
import { getAllToppingsByBrandId } from '@/src/lib/toppingStore'
import Addition from '@/src/app/buy/[brandName]/components/Addition'
import { CartItemCard } from './cart/CartItemCard'
import { CartEmptyState } from './cart/CartEmptyState'
import { CartSummary } from './cart/CartSummary'

export default function Cart() {
    const {
        cart,
        subTotal,
        isOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
    } = useCart()

    const [editingItem, setEditingItem] = useState<CartItem | null>(null)
    const [availableToppings, setAvailableToppings] = useState<Topping[]>([])
    const [currentDrink, setCurrentDrink] = useState<Drink | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = async (item: CartItem) => {
        setIsLoading(true)
        try {
            const category = await getCategoryById(item.categoryId)
            if (category) {
                const toppings = await getAllToppingsByBrandId(category.brandId)
                setCurrentDrink(item)
                setAvailableToppings(toppings)
                setEditingItem(item)
            }
        } catch (error) {
            console.error('Error preparing edit:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuantityChange = (
        itemId: string,
        currentQuantity: number,
        change: number,
    ) => {
        const newQuantity = currentQuantity + change
        if (newQuantity < 1) {
            removeFromCart(itemId)
        } else {
            updateQuantity(itemId, newQuantity)
        }
    }

    return (
        <div
            className={`relative z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={toggleCart}
            />
            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 flex w-full max-w-lg flex-col border-l border-gray-800 bg-gray-950 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Giỏ hàng</h1>
                    <button
                        onClick={toggleCart}
                        className="p-2 text-gray-400 transition-colors hover:text-white"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {cart.length === 0 ? (
                        <CartEmptyState />
                    ) : (
                        cart.map((item) => (
                            <CartItemCard
                                key={item.itemId}
                                item={item}
                                isLoading={isLoading}
                                onEdit={handleEdit}
                                onRemove={removeFromCart}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    )}
                </div>

                <CartSummary subTotal={subTotal} disabled={cart.length === 0} />

                {/* Edit Modal */}
                {editingItem && currentDrink && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                        <Addition
                            drink={currentDrink}
                            toppings={availableToppings}
                            initialItem={editingItem || undefined}
                            onClose={() => setEditingItem(null)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
