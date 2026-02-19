'use client'

import { useCart } from '@/src/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import { ContactForm } from './components/ContactForm'
import { ShippingForm } from './components/ShippingForm'
import { PaymentMethod } from './components/PaymentMethod'
import { OrderSummary } from './components/OrderSummary'
import { LoveUnlockedModal } from './components/LoveUnlockedModal'
import { createOrder } from './actions'
import { useRouter } from 'next/navigation'

// Validation error types
type ContactErrors = Partial<Record<'name' | 'phone' | 'email', string>>
type ShippingErrors = Partial<Record<'address' | 'note', string>>

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

    // Inline validation errors
    const [contactErrors, setContactErrors] = useState<ContactErrors>({})
    const [shippingErrors, setShippingErrors] = useState<ShippingErrors>({})

    const [discountData, setDiscountData] = useState<{
        value: number
        type: 'percentage' | 'fixed'
        code: string
    } | null>(null)

    // Hiện phương thức thanh toán đặc biệt sau khi love-check thành công
    const [showLovePayment, setShowLovePayment] = useState(false)
    // Hiện modal thông báo mở khóa
    const [showLoveModal, setShowLoveModal] = useState(false)

    // Callback khi love-check thành công: mở modal trước, sau khi đóng mới unlock
    const handleLoveUnlocked = () => {
        setShowLoveModal(true)
    }

    // Khi user đóng modal: ẩn modal và mở phương thức mới
    const handleModalClose = () => {
        setShowLoveModal(false)
        setShowLovePayment(true)
    }

    // Validate all fields and set inline errors, returns true if valid
    const validate = (): boolean => {
        const newContactErrors: ContactErrors = {}
        const newShippingErrors: ShippingErrors = {}
        let valid = true

        if (!contactInfo.name.trim()) {
            newContactErrors.name = 'Vui lòng nhập họ và tên'
            valid = false
        }

        if (!contactInfo.phone.trim()) {
            newContactErrors.phone = 'Vui lòng nhập số điện thoại'
            valid = false
        } else if (
            !/^[0-9]{9,11}$/.test(contactInfo.phone.replace(/\s/g, ''))
        ) {
            newContactErrors.phone = 'Số điện thoại không hợp lệ'
            valid = false
        }

        if (!shippingInfo.address.trim()) {
            newShippingErrors.address = 'Vui lòng nhập địa chỉ giao hàng'
            valid = false
        }

        setContactErrors(newContactErrors)
        setShippingErrors(newShippingErrors)

        // Scroll to first error
        if (!valid) {
            const firstError = document.querySelector('[data-error="true"]')
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

        return valid
    }

    const handleOrder = async () => {
        if (!validate()) return

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
            discountCode: discountData ? discountData.code : '',
        }

        const res = await createOrder(orderPayload)

        if (res.success) {
            clearCart()
            // Redirect sang trang thành công kèm mã đơn hàng
            router.push(`/pay/success?orderId=${res.orderId}`)
        } else {
            // Show server error under the order button via a generic contact error
            setContactErrors((prev) => ({
                ...prev,
                name: `Lỗi hệ thống: ${res.error}`,
            }))
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
                        <div
                            data-error={
                                Object.keys(contactErrors).length > 0
                                    ? 'true'
                                    : 'false'
                            }
                        >
                            <ContactForm
                                value={contactInfo}
                                onChange={setContactInfo}
                                errors={contactErrors}
                                onClearError={(field) =>
                                    setContactErrors((prev) => {
                                        const next = { ...prev }
                                        delete next[field]
                                        return next
                                    })
                                }
                            />
                        </div>

                        {/* Shipping Address */}
                        <div
                            data-error={
                                Object.keys(shippingErrors).length > 0
                                    ? 'true'
                                    : 'false'
                            }
                        >
                            <ShippingForm
                                value={shippingInfo}
                                onChange={setShippingInfo}
                                errors={shippingErrors}
                                onClearError={(field) =>
                                    setShippingErrors((prev) => {
                                        const next = { ...prev }
                                        delete next[field]
                                        return next
                                    })
                                }
                            />
                        </div>

                        {/* Payment Method */}
                        <PaymentMethod
                            selectedMethod={paymentMethod}
                            onSelect={setPaymentMethod}
                            showLoveOption={showLovePayment}
                        />
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-4">
                        <OrderSummary
                            cart={cart}
                            subTotal={subTotal}
                            onApplyDiscount={setDiscountData}
                            onOrder={handleOrder}
                            onLoveUnlocked={handleLoveUnlocked}
                        />
                    </div>
                </div>
            </div>

            {/* Modal thông báo mở khóa phương thức thanh toán */}
            {showLoveModal && <LoveUnlockedModal onClose={handleModalClose} />}
        </div>
    )
}
