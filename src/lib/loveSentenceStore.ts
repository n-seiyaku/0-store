'use server'

import { sql } from './db/neon'

export const getAllSentences = async (sentence: string) => {
    try {
        const res =
            await sql`SELECT * FROM love_sentences WHERE sentence ILIKE ${sentence.trim()}`

        return res
    } catch (error) {
        console.log(error)
    }
}

export const storeLoveSentence = async (
    sentence: string,
    is_loving_caring: boolean,
    reason: string,
) => {
    try {
        const res =
            await sql`INSERT INTO love_sentences (sentence, is_loving_caring, reason)
            VALUES (${sentence.trim()}, ${is_loving_caring}, ${reason})`

        return res
    } catch (error) {
        console.log(error)
    }
}
