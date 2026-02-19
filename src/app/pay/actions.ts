'use server'

import { db } from '@/src/lib/db/drizzle'
import { orders, orderItems } from '@/src/lib/db/schema'
import { CartItem } from '@/src/type/cart-item.types'
import { sendTelegramNotification } from '@/src/lib/telegram'

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
    discountCode?: string
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

            // Send Telegram Notification
            const message = `
<b>🔥 Có đơn hàng mới!</b>

<b>Khách hàng:</b> ${orderData.customerName}
<b>SĐT:</b> ${orderData.customerPhone}
<b>Địa chỉ:</b> ${orderData.shippingAddress}
<b>Tổng tiền:</b> ${orderData.totalAmount.toLocaleString()}

<b>Chi tiết đơn hàng:</b>
${orderData.items
    .map(
        (item) =>
            `- ${item.name} (x${item.quantity}) - ${item.total.toLocaleString()}${
                item.toppings.length > 0
                    ? `\n  + Topping: ${item.toppings
                          .map((t) => t.name)
                          .join(', ')}`
                    : ''
            }`,
    )
    .join('\n')}
<b>Ghi chú:</b> ${orderData.shippingNote} 
<b>Mã giảm giá:</b> ${orderData.discountCode}
`
            // Fire and forget (or await if you want to ensure it sends before returning)
            await sendTelegramNotification(message)
        }

        return { success: true, orderId: newOrder.id }
    } catch (error) {
        console.error('Error creating order:', error)
        return { success: false, error: 'Failed to create order' }
    }
}
