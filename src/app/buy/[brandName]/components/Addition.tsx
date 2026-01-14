'use client'

import { Drink, Topping } from '@/src/lib/db/type'
import { useState } from 'react'
import { useCart } from '@/src/context/CartContext'
import { CartItem } from '@/src/type/cart-item.types'

interface AdditionProps {
    toppings: Topping[]
    drink: Drink
    onClose: () => void
    initialItem?: CartItem
}

export default function Addition({
    toppings,
    drink,
    onClose,
    initialItem,
}: AdditionProps) {
    const [size, setSize] = useState(initialItem?.size || 'medium')
    const [ice, setIce] = useState(initialItem?.ice || 'Đá bình thường')
    const [sugar, setSugar] = useState(initialItem?.sugar || '100%')
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>(
        initialItem?.toppings || [],
    )
    const [note, setNote] = useState(initialItem?.note || '')
    const { addToCart, updateItem } = useCart()

    const SIZE_LARGE_PRICE = 3000
    const sizes = ['medium', 'large']
    const iceOptions = ['Nhiều đá', 'Đá bình thường', 'Ít đá', 'Không đá']
    const sugarOptions = ['100%', '70%', '50%', '30%', '0%']

    const calculateTotal = () => {
        let total = Number(drink.price)
        if (size === 'large') total += SIZE_LARGE_PRICE

        // Add toppings price
        const toppingsPrice = toppings
            .filter((t) => selectedToppings.some((s) => s.id === t.id))
            .reduce((sum, t) => sum + Number(t.price), 0)
        return total + toppingsPrice
    }

    const toggleTopping = (topping: Topping) => {
        setSelectedToppings((prev) =>
            prev.some((t) => t.id === topping.id)
                ? prev.filter((t) => t.id !== topping.id)
                : [...prev, topping],
        )
    }

    const handleSubmit = () => {
        const order: CartItem = {
            ...drink,
            itemId: initialItem?.itemId || crypto.randomUUID(),
            size,
            ice,
            sugar,
            toppings: selectedToppings,
            note,
            total: calculateTotal(),
            quantity: initialItem?.quantity || 1,
        }

        if (initialItem) {
            updateItem(order)
        } else {
            addToCart(order)
        }
        onClose()
    }

    return (
        <div className="mx-auto flex h-[calc(100vh-100px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-900/95 shadow-2xl backdrop-blur-xl transition-all">
            <div className="no-scrollbar flex-1 overflow-y-auto p-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            {drink.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                            {drink.price.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                    >
                        <span className="material-symbols-rounded block text-xl">
                            close
                        </span>
                    </button>
                </div>

                {/* Size Section */}
                <div className="mb-6">
                    <span className="mb-3 block text-sm font-medium text-gray-400">
                        Size
                    </span>
                    <div className="flex gap-3">
                        {sizes.map((value) => (
                            <button
                                key={value}
                                onClick={() => setSize(value)}
                                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold capitalize transition-all ${
                                    size === value
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ice Section */}
                <div className="mb-6">
                    <span className="mb-3 block text-sm font-medium text-gray-400">
                        Đá
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                        {iceOptions.map((value) => (
                            <button
                                key={value}
                                onClick={() => setIce(value)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                    ice === value
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'border border-gray-800/50 bg-gray-800/30 text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sugar Section */}
                <div className="mb-6">
                    <span className="mb-3 block text-sm font-medium text-gray-400">
                        Độ ngọt (% đường)
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {sugarOptions.map((value) => (
                            <button
                                key={value}
                                onClick={() => setSugar(value)}
                                className={`min-w-14 flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                    sugar === value
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'border border-gray-800/50 bg-gray-800/30 text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toppings Section */}
                <div className="mb-6">
                    <span className="mb-3 block text-sm font-medium text-gray-400">
                        Topping
                    </span>
                    <div className="flex flex-col gap-2">
                        {toppings.map((topping) => (
                            <div
                                key={topping.id}
                                onClick={() => toggleTopping(topping)}
                                className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-all ${
                                    selectedToppings.some(
                                        (selected) =>
                                            selected.id === topping.id,
                                    )
                                        ? 'border-blue-500 bg-blue-600/10'
                                        : 'border-gray-800/50 bg-gray-800/30 hover:border-gray-700 hover:bg-gray-800/50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                                            selectedToppings.some(
                                                (selected) =>
                                                    selected.id === topping.id,
                                            )
                                                ? 'border-blue-600 bg-blue-600 text-white'
                                                : 'border-gray-600'
                                        }`}
                                    >
                                        {selectedToppings.some(
                                            (selected) =>
                                                selected.id === topping.id,
                                        ) && (
                                            <span className="material-symbols-rounded text-sm font-bold">
                                                check
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-200">
                                        {topping.name}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-400">
                                    +
                                    {Number(topping.price).toLocaleString(
                                        'vi-VN',
                                    )}
                                    đ
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Note Section */}
                <div>
                    <span className="mb-3 block text-sm font-medium text-gray-400">
                        Ghi chú
                    </span>
                    <div className="relative">
                        <textarea
                            name="note"
                            id="note"
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="no-scrollbar w-full rounded-xl border border-gray-800 bg-gray-800/50 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Ví dụ: Ít đá, nhiều sữa..."
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="border-t border-gray-800/50 bg-gray-900/95 p-6 backdrop-blur-xl">
                <button
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/30 transition-transform hover:bg-blue-500 active:scale-[0.98]"
                >
                    {initialItem ? 'Cập nhật' : 'Thêm vào giỏ'} -{' '}
                    {calculateTotal().toLocaleString('vi-VN')}đ
                </button>
            </div>
        </div>
    )
}
