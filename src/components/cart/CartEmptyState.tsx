export function CartEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="material-symbols-outlined mb-4 text-6xl opacity-20">
                shopping_cart_off
            </span>
            <p>Giỏ hàng của bạn trống.</p>
        </div>
    )
}
