'use client'

import { useEffect, useState } from 'react'
import { getBrands } from '../lib/drinkStore'
import { Brand } from '../type/brand.types'
import Link from 'next/link'
import { toSlug } from '../utils/toSlug'

export default function HomePage() {
    const [brands, setBrands] = useState<Brand[]>([])

    const fetchBrands = async () => {
        const brands = await getBrands()
        setBrands(brands)
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    return (
        <div>
            <div className="flex justify-center">
                {brands.map((brand: Brand) => (
                    <Link
                        href={`/buy/${toSlug(brand.name)}?brandId=${brand.id}`}
                        key={brand.id}
                        className="mx-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                        {brand.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
