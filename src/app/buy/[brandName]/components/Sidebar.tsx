import { Category } from '@/src/lib/db/type'

export default function Sidebar({
    categories,
    selectedCategory,
    handleChangeCategory,
}: {
    categories: Category[]
    selectedCategory: string
    handleChangeCategory: (category: string) => void
}) {
    return (
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
            <div className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-1 backdrop-blur-xl lg:p-6">
                <h3 className="mb-4 hidden text-xs font-bold tracking-widest text-gray-500 uppercase lg:block">
                    Danh mục
                </h3>
                <div className="scrollbar-hide flex gap-2 overflow-x-auto p-2 lg:flex-col lg:p-0">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleChangeCategory(category.id)}
                            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 lg:w-full lg:text-left lg:text-base ${
                                selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white lg:bg-transparent lg:hover:bg-gray-800/50'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
