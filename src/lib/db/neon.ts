import { neon } from '@neondatabase/serverless'

function getConnectionString() {
    const conn =
        process.env.DATABASE_URL ||
        process.env.POSTGRES_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        process.env.POSTGRES_URL_NON_POOLING ||
        null
    return conn
}

export function getClient() {
    const connectionString = getConnectionString()
    if (!connectionString) {
        throw new Error(
            'Check your .env file. DATABASE_URL or POSTGRES_URL is missing',
        )
    }
    return neon(connectionString)
}

export const sql = getClient()
