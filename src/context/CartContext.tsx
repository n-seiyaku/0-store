'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from '../type/cart-item.types'

interface CartContextType {
    cart: CartItem[]
    isOpen: boolean
    subTotal: number
    totalItems: number
    toggleCart: () => void
    clearCart: () => void
    addToCart: (item: CartItem) => void
    removeFromCart: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    updateItem: (item: CartItem) => void
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [subTotal, setSubTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    const [isInitialized, setIsInitialized] = useState(false)

    const addToCart = (item: CartItem) => {
        setCart((prev) => [...prev, item])
    }

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((item) => item.itemId !== itemId))
    }

    const updateQuantity = (itemId: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.itemId === itemId ? { ...item, quantity } : item,
            ),
        )
    }

    const updateItem = (updatedItem: CartItem) => {
        setCart((prev) =>
            prev.map((item) =>
                item.itemId === updatedItem.itemId ? updatedItem : item,
            ),
        )
    }

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    const clearCart = () => {
        setCart([])
        setSubTotal(0)
    }

    const calculateSubTotal = () => {
        setSubTotal(
            cart.reduce((total, item) => total + item.total * item.quantity, 0),
        )
    }

    const calculateTotalItems = () => {
        setTotalItems(cart.reduce((total, item) => total + item.quantity, 0))
    }

    // Load cart from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart))
                } catch (error) {
                    console.error(
                        'Failed to parse cart from local storage:',
                        error,
                    )
                }
            }
            setIsInitialized(true)
        }
    }, [])

    // Update totals and save to localStorage when cart changes
    useEffect(() => {
        calculateSubTotal()
        calculateTotalItems()

        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart, isInitialized])

    return (
        <CartContext.Provider
            value={{
                cart,
                isOpen,
                subTotal,
                totalItems,
                toggleCart,
                clearCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateItem,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
