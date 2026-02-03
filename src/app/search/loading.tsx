export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="mb-8 h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40"
                        >
                            {/* Image Skeleton */}
                            <div className="mb-4 aspect-square w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800/50" />

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                                </div>

                                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 md:hidden dark:bg-gray-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
