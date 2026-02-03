'use client'

import { Brand } from '@/src/lib/db/type'
import Link from 'next/link'
import { toSlug } from '@/src/utils/toSlug'
import Image from 'next/image'

interface HomePageProps {
    brands: Brand[]
}

export default function HomePage({ brands }: HomePageProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-gray-800">
                    <Image
                        src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                </div>
                <div className="relative flex h-full items-center justify-center px-4 text-center">
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
                            Thưởng thức hương vị
                            <br />
                            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Trà Sữa Đậm Đà
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                            Trải nghiệm menu đa dạng với nguyên liệu tươi ngon
                            nhất. Giao hàng nhanh chóng, đặt món dễ dàng ngay
                            tại nhà.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link
                                href="#menu"
                                className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                            >
                                Đặt Ngay
                            </Link>
                            <Link
                                href="/about"
                                className="rounded-full border border-gray-600 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                            >
                                Về Chúng Tôi
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                            Menu Của Chúng Tôi
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Chọn thương hiệu yêu thích của bạn
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {brands.map((brand: Brand) => (
                            <Link
                                href={`/buy/${toSlug(brand.name)}?brandId=${brand.id}`}
                                key={brand.id}
                                className="group relative overflow-hidden rounded-2xl bg-white p-1 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="relative flex h-full flex-col p-6">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl dark:bg-blue-900/30">
                                        🥤
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {brand.name}
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        Khám phá các loại đồ uống tuyệt vời từ{' '}
                                        {brand.name}
                                    </p>
                                    <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                        Xem Menu
                                        <span className="material-symbols-outlined ml-1 text-sm transition-transform group-hover:translate-x-1">
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t border-gray-200 bg-white py-20 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <span className="material-symbols-outlined text-3xl">
                                    eco
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">
                                Nguyên Liệu Tươi
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sử dụng 100% nguyên liệu tự nhiên, đảm bảo sức
                                khỏe.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <span className="material-symbols-outlined text-3xl">
                                    bolt
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">
                                Giao Hàng Nhanh
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Đội ngũ giao hàng chuyên nghiệp, cam kết đúng
                                giờ.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                <span className="material-symbols-outlined text-3xl">
                                    grade
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">
                                Chất Lượng Cao
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Công thức độc quyền mang lại hương vị khó quên.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
