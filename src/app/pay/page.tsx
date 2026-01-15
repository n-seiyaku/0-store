'use client'

import { useCart } from '@/src/context/CartContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ContactForm } from './components/ContactForm'
import { ShippingForm } from './components/ShippingForm'
import { PaymentMethod } from './components/PaymentMethod'
import { OrderSummary } from './components/OrderSummary'
import { createOrder } from './actions'
import { useRouter } from 'next/navigation'

export default function PayPage() {
    const { cart, subTotal, clearCart } = useCart()
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('cod')

    // Form States
    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        email: '',
    })
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        note: '',
    })

    const [discountData, setDiscountData] = useState<{
        value: number
        type: 'percentage' | 'fixed'
    } | null>(null)

    const handleOrder = async () => {
        if (!contactInfo.name || !contactInfo.phone || !shippingInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin liên hệ và địa chỉ!')
            return
        }

        const orderPayload = {
            customerName: contactInfo.name,
            customerPhone: contactInfo.phone,
            customerEmail: contactInfo.email,
            shippingAddress: shippingInfo.address,
            shippingNote: shippingInfo.note,
            paymentMethod,
            discount: discountData ? discountData.value : 0,
            discountType: discountData ? discountData.type : 'fixed',
            totalAmount: subTotal,
            items: cart,
        }

        const res = await createOrder(orderPayload)

        if (res.success) {
            clearCart()
            alert('Đặt hàng thành công! Mã đơn: ' + res.orderId)
            router.push('/')
        } else {
            alert('Có lỗi xảy ra: ' + res.error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-8 text-white md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold">Thanh Toán</h1>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column - Forms */}
                    <div className="space-y-6 lg:col-span-8">
                        {/* Contact Info */}
                        <ContactForm
                            value={contactInfo}
                            onChange={setContactInfo}
                        />

                        {/* Shipping Address */}
                        <ShippingForm
                            value={shippingInfo}
                            onChange={setShippingInfo}
                        />

                        {/* Payment Method */}
                        <PaymentMethod
                            selectedMethod={paymentMethod}
                            onSelect={setPaymentMethod}
                        />
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-4">
                        <OrderSummary
                            cart={cart}
                            subTotal={subTotal}
                            onApplyDiscount={setDiscountData}
                            onOrder={handleOrder}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
