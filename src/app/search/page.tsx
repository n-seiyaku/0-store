import { searchDrinks } from '@/src/lib/drinkStore'
import { getAllToppings } from '@/src/lib/toppingStore'
import SearchClient from './components/SearchClient'

interface SearchPageProps {
    searchParams: Promise<{ q: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams
    const drinks = await searchDrinks(q)
    const toppings = await getAllToppings()

    return (
        <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                    Kết quả tìm kiếm cho: "{q}"
                </h1>

                {drinks.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
                        <span className="material-symbols-outlined mb-2 text-4xl opacity-20">
                            search_off
                        </span>
                        <p>Không tìm thấy món nào phù hợp với "{q}".</p>
                    </div>
                ) : (
                    <SearchClient drinks={drinks} toppings={toppings} />
                )}
            </div>
        </div>
    )
}
