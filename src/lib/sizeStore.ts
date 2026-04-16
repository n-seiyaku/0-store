'use server'

import { db } from './db/drizzle'
import { sizes } from './db/schema'
import { eq } from 'drizzle-orm'
import { Size } from './db/type'

// Fetch sizes based on category ID
export async function getSizesByCategory(categoryId: string): Promise<Size[]> {
    return db
        .select()
        .from(sizes)
        .where(eq(sizes.categoryId, categoryId))
        .orderBy(sizes.id)
}
