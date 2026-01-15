'use server'

import { db } from './db/drizzle'
import { LoveSentence } from './db/type'
import { eq } from 'drizzle-orm'
import { loveSentences } from './db/schema'

export const getAllSentences = async (
    sentence: string,
): Promise<LoveSentence[]> => {
    try {
        const res = await db
            .select()
            .from(loveSentences)
            .where(eq(loveSentences.sentence, sentence))

        return res as LoveSentence[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export const storeLoveSentence = async (
    sentence: string,
    isLovingCaring: boolean,
    reason: string,
) => {
    try {
        const res = await db.insert(loveSentences).values({
            sentence: sentence.trim(),
            isLovingCaring: isLovingCaring,
            reason: reason,
        })

        return res
    } catch (error) {
        console.error(error)
    }
}
