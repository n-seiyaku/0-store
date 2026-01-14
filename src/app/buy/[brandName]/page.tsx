import { getAllToppingsByBrandId } from '@/src/lib/toppingStore'
import BuyClient from './components/BuyClient'
import {
    getCategoriesByBrandId,
    getDrinksByCategory,
} from '@/src/lib/drinkStore'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BuyPage(props: PageProps) {
    const searchParams = await props.searchParams
    const brandId = searchParams.brandId

    // Ensure brandId is a string, passing empty string if not present or array
    const validBrandId = typeof brandId === 'string' ? brandId : ''

    const categories = await getCategoriesByBrandId(validBrandId)
    const drinks =
        categories.length > 0 ? await getDrinksByCategory(categories[0].id) : []
    const toppings = await getAllToppingsByBrandId(validBrandId)

    return (
        <BuyClient
            categories={categories}
            initialDrinks={drinks}
            toppings={toppings}
        />
    )
}
