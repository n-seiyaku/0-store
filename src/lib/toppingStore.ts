'use server'

import { db } from './db/drizzle'
import { toppings } from './db/schema'
import { Topping } from './db/type'
import { eq } from 'drizzle-orm'

export const getAllToppingsByBrandId = async (
    brandId: string,
): Promise<Topping[]> => {
    try {
        const res = await db
            .select()
            .from(toppings)
            .where(eq(toppings.brandId, brandId))
        return res
    } catch (error) {
        console.error('Error fetching toppings:', error)
        return []
    }
}
