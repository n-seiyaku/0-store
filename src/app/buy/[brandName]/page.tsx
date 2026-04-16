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
    const categoryId = searchParams.categoryId

    // Ensure brandId is a string, passing empty string if not present or array
    const validBrandId = typeof brandId === 'string' ? brandId : ''

    const categories = await getCategoriesByBrandId(validBrandId)

    // Use categoryId from URL if valid, otherwise fall back to first category
    const validCategoryId =
        typeof categoryId === 'string' &&
        categories.some((c) => c.id === categoryId)
            ? categoryId
            : categories[0]?.id ?? ''

    const drinks = validCategoryId
        ? await getDrinksByCategory(validCategoryId)
        : []
    const toppings = await getAllToppingsByBrandId(validBrandId)

    return (
        <BuyClient
            categories={categories}
            initialDrinks={drinks}
            initialCategoryId={validCategoryId}
            toppings={toppings}
        />
    )
}
