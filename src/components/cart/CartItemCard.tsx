import { CartItem } from '@/src/type/cart-item.types'

interface CartItemCardProps {
    item: CartItem
    isLoading: boolean
    onEdit: (item: CartItem) => void
    onRemove: (itemId: string) => void
    onQuantityChange: (
        itemId: string,
        currentQuantity: number,
        change: number,
    ) => void
}

export function CartItemCard({
    item,
    isLoading,
    onEdit,
    onRemove,
    onQuantityChange,
}: CartItemCardProps) {
    return (
        <div className="group relative flex items-start gap-4 rounded-xl border border-gray-800/50 bg-gray-900/50 p-4 transition-colors hover:border-gray-700/50">
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                />
            )}
            <div className="flex flex-1 flex-col justify-between self-stretch">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm font-medium text-blue-400">
                            {(item.price || 0).toLocaleString()} VND
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {item.toppings.map((topping) => (
                            <div
                                key={topping.id}
                                className="mt-1 flex items-center justify-between"
                            >
                                <span className="text-sm font-medium text-blue-400">
                                    + {topping.name}
                                </span>
                                <span className="text-sm font-medium text-blue-400">
                                    {topping.price.toLocaleString()} VND
                                </span>
                            </div>
                        ))}
                        <p className="text-md mt-1 flex items-center justify-between font-medium">
                            <span className="text-gray-400">Tổng:</span>
                            <span>
                                {(item.total || 0).toLocaleString()} VND
                            </span>
                        </p>
                        {item.note && (
                            <p className="text-sm text-gray-400">
                                Ghi chú: {item.note}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg bg-gray-950 p-1 ring-1 ring-gray-800">
                        <button
                            onClick={() =>
                                onQuantityChange(item.itemId, item.quantity, -1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                remove
                            </span>
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() =>
                                onQuantityChange(item.itemId, item.quantity, 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onEdit(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500"
                            title="Edit item"
                            disabled={isLoading}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                edit
                            </span>
                        </button>
                        <button
                            onClick={() => onRemove(item.itemId)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
                            title="Remove item"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                delete
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
