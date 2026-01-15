'use server'

import { db } from '@/src/lib/db/drizzle'
import { orders, orderItems } from '@/src/lib/db/schema'
import { CartItem } from '@/src/type/cart-item.types'

interface CreateOrderParams {
    customerName: string
    customerPhone: string
    customerEmail?: string
    shippingAddress: string
    shippingNote?: string
    paymentMethod: string
    discount: number
    discountType: 'percentage' | 'fixed'
    totalAmount: number
    items: CartItem[]
}

export const createOrder = async (orderData: CreateOrderParams) => {
    try {
        // Create the order
        const [newOrder] = await db
            .insert(orders)
            .values({
                customerName: orderData.customerName,
                customerPhone: orderData.customerPhone,
                customerEmail: orderData.customerEmail,
                shippingAddress: orderData.shippingAddress,
                shippingNote: orderData.shippingNote,
                paymentMethod: orderData.paymentMethod,
                discount: orderData.discount,
                discountType: orderData.discountType,
                totalAmount: orderData.totalAmount,
                status: 'pending',
            })
            .returning()

        // Create order items
        if (newOrder) {
            const itemsToInsert = orderData.items.map((item) => ({
                orderId: newOrder.id,
                drinkName: item.name,
                drinkImage: item.imageUrl,
                quantity: item.quantity,
                unitPrice: item.price,
                totalPrice: item.total,
                toppings: item.toppings,
                note: item.note,
            }))

            await db.insert(orderItems).values(itemsToInsert)
        }

        return { success: true, orderId: newOrder.id }
    } catch (error) {
        console.error('Error creating order:', error)
        return { success: false, error: 'Failed to create order' }
    }
}
