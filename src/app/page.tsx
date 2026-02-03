import HomePage from './HomePage'
import { getBrands } from '@/src/lib/drinkStore'

export default async function Home() {
    const brands = await getBrands()
    return <HomePage brands={brands} />
}
