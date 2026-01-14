'use server'

import { db } from './db/drizzle'
import { brands, categories, drinks } from './db/schema'
import { Brand, Category, Drink } from './db/type'
import { eq } from 'drizzle-orm'

export const getBrands = async (): Promise<Brand[]> => {
    try {
        const res = await db.select().from(brands)
        return res
    } catch (error) {
        console.error('Error fetching brands:', error)
        return []
    }
}

export const getDrinksByCategory = async (
    categoryId: string,
): Promise<Drink[]> => {
    try {
        const res = await db
            .select()
            .from(drinks)
            .where(eq(drinks.categoryId, categoryId))
        return res
    } catch (error) {
        console.error('Error fetching drinks:', error)
        return []
    }
}

export const getCategoriesByBrandId = async (
    brandId: string,
): Promise<Category[]> => {
    try {
        const res = await db
            .select()
            .from(categories)
            .where(eq(categories.brandId, brandId))
        return res
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

export const getDrinkById = async (id: string): Promise<Drink | undefined> => {
    try {
        const res = await db.select().from(drinks).where(eq(drinks.id, id))
        return res[0]
    } catch (error) {
        console.error('Error fetching drink:', error)
        return undefined
    }
}

export const getCategoryById = async (
    id: string,
): Promise<Category | undefined> => {
    try {
        const res = await db
            .select()
            .from(categories)
            .where(eq(categories.id, id))
        return res[0]
    } catch (error) {
        console.error('Error fetching category:', error)
        return undefined
    }
}
