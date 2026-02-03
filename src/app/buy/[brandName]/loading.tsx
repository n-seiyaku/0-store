export default function Loading() {
    return (
        <div className="min-h-screen px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    {/* Sidebar Skeleton */}
                    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
                        <div className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-1 backdrop-blur-xl lg:p-6">
                            <div className="mb-4 hidden h-4 w-20 animate-pulse rounded bg-gray-800 lg:block" />
                            <div className="scrollbar-hide flex gap-2 overflow-x-auto p-2 lg:flex-col lg:p-0">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-24 shrink-0 animate-pulse rounded-xl bg-gray-800/50 lg:w-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Skeleton */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4"
                                >
                                    {/* Image Skeleton */}
                                    <div className="mb-4 aspect-square w-full animate-pulse rounded-xl bg-gray-800/50" />

                                    {/* Content Skeleton */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
                                            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-800" />
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-800" />
                                        </div>

                                        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-800 md:hidden" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
