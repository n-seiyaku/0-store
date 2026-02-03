'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function SearchInputContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState('')

    useEffect(() => {
        setQuery(searchParams.get('q') || '')
    }, [searchParams])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
                type="text"
                placeholder="Tìm món..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-900"
            />
            <button
                type="submit"
                className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:text-blue-500"
            >
                <span className="material-symbols-outlined text-lg">
                    search
                </span>
            </button>
        </form>
    )
}

export default function SearchInput() {
    return (
        <Suspense
            fallback={<div className="h-10 w-64 rounded-full bg-gray-100" />}
        >
            <SearchInputContent />
        </Suspense>
    )
}
