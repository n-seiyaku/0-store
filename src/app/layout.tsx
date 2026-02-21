import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import 'material-symbols'
import { CartProvider } from '../context/CartContext'
import Cart from '../components/cart/Cart'

// Roboto sans-serif font
const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin', 'vietnamese'],
    weight: ['300', '400', '500', '700'],
    display: 'swap',
})

// Roboto Mono font
const robotoMono = Roboto_Mono({
    variable: '--font-roboto-mono',
    subsets: ['latin', 'vietnamese'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Trà Sữa 0 Ngàn — Đặt món online, giao hàng 15 phút',
    description:
        'Khám phá menu trà sữa đa dạng từ các thương hiệu yêu thích. Đặt hàng nhanh, giao tận nơi trong 15 phút với nguyên liệu tươi ngon 100%.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${roboto.variable} ${robotoMono.variable} antialiased`}
            >
                <CartProvider>
                    <Header />
                    {children}
                    <Cart />
                </CartProvider>
            </body>
        </html>
    )
}
