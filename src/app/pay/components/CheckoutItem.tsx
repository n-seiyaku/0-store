import { CartItem } from '@/src/type/cart-item.types'

interface CheckoutItemProps {
    item: CartItem
}

export function CheckoutItem({ item }: CheckoutItemProps) {
    return (
        <div className="flex gap-4 border-b border-gray-800 pb-4 last:border-0 last:pb-0">
            {item.imageUrl && (
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                />
            )}
            <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="line-clamp-1 font-medium text-white">
                        {item.name}
                    </h4>
                    <span className="text-sm text-gray-400">
                        {item.price.toLocaleString()} VND
                    </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                    Size {item.size === 'large' ? 'L' : 'M'} • {item.sugar}{' '}
                    đường • {item.ice}
                </p>
                {item.toppings.length > 0 && (
                    <div className="mt-1 space-y-1">
                        {item.toppings.map((t, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between text-xs text-gray-500"
                            >
                                <span>+ {t.name}</span>
                                <span>{t.price.toLocaleString()} VND</span>
                            </div>
                        ))}
                        <div className="mt-2 flex items-center justify-between text-sm text-blue-400">
                            <span>Tổng </span>
                            <span className="text-blue-400">
                                {item.total.toLocaleString()} VND
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
