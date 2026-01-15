'use server'

import { db } from './db/drizzle'
import { Topping } from './db/type'
import { eq } from 'drizzle-orm'
import { toppings } from './db/schema'

export const getAllToppingsByBrandId = async (
    brandId: string,
): Promise<Topping[]> => {
    try {
        const res = await db
            .select()
            .from(toppings)
            .where(eq(toppings.brandId, brandId))
        return res as Topping[]
    } catch (error) {
        console.error('Error fetching toppings:', error)
        return []
    }
}
