import { Drink } from '@/src/lib/db/type'

interface ProductGridProps {
    drinks: Drink[]
    selectedCategory: string
    isLoading?: boolean
    onSelectProduct: (drink: Drink) => void
}

export default function ProductGrid({
    drinks,
    selectedCategory,
    isLoading,
    onSelectProduct,
}: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="flex-1">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4"
                        >
                            {/* Image Skeleton */}
                            <div className="mb-4 aspect-square w-full animate-pulse rounded-xl bg-gray-800/50" />

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-800" />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-6 w-1/3 animate-pulse rounded bg-gray-800" />
                                </div>

                                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-800 md:hidden" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {drinks.map((drink) => (
                    <div
                        key={drink.id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
                    >
                        {/* Image Container */}
                        <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-800/50 pt-[100%]">
                            <img
                                src={drink.imageUrl}
                                alt={drink.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay generic add button on hover */}
                            <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-linear-to-t from-gray-900/90 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onSelectProduct(drink)
                                    }}
                                    className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <h2 className="line-clamp-2 text-lg leading-tight font-bold text-gray-100 group-hover:text-blue-400">
                                    {drink.name}
                                </h2>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold text-blue-400">
                                    {Number(drink.price).toLocaleString(
                                        'vi-VN',
                                    )}
                                    <span className="ml-1 text-xs font-medium text-gray-500">
                                        VND
                                    </span>
                                </p>
                            </div>

                            {/* Mobile only add button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectProduct(drink)
                                }}
                                className="block w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95 md:hidden"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {drinks.length === 0 && selectedCategory && (
                <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
                    <span className="material-symbols-outlined mb-2 text-4xl opacity-20">
                        inbox
                    </span>
                    <p>Không có sản phẩm nào trong danh mục này.</p>
                </div>
            )}
        </div>
    )
}
