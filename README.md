# 0-Store

A modern, full-featured online drink ordering application built for **0 Store**, leveraging the power of **Next.js 16** and **AI integration**. This system streamlines the ordering process with a premium user interface and efficient backend management.

![Project Banner](placeholder-image-url)

## 📖 Introduction

**0-Store** is designed to provide users with a seamless experience when ordering their favorite drinks. Focus on aesthetics, performance, and usability, the application allows customers to browse the menu, customize their orders (toppings, sugar, ice levels), and place orders easily.

## ✨ Features

- **🛍️ Smart Menu System**: Interactive product listing with categories and detailed descriptions.
- **🎨 Drink Customization**: Full control over drink options including:
    - Sugar levels (0% - 100%)
    - Ice levels (0% - 100%)
    - Multiple topping selections
- **🛒 Dynamic Shopping Cart**:
    - Real-time price calculation.
    - Easy edits to existing items in the cart.
- **💳 Streamlined Checkout**:
    - Integrated delivery information form.
    - Support for multiple payment methods (COD, etc.).
    - Order summary and discount code application.
- **🤖 AI Powered**: Integrated with **Google Generative AI** for smart features.
- **📱 Responsive Design**: Fully responsive UI built with **Tailwind CSS v4**, ensuring a premium experience on mobile, tablet, and desktop.
- **⚡ High Performance**: Utilizing Next.js 16 App Router and Server Actions for optimal speed and SEO.

## 🛠️ Tech Stack

This project is built using the latest web technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **AI**: [Google Generative AI SDK](https://ai.google.dev/)
- **Icons**: Material Symbols

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/n-seiyaku/0-store.git
    cd 0-store
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Environment Setup:**

    Create a `.env.local` file in the root directory and add the necessary environment variables (Database URL, Google AI Key, etc.):

    ```bash
    cp .env.example .env.local
    ```

    _Make sure to fill in your `DATABASE_URL` and `GOOGLE_AI_API_KEY`._

4. **Database Setup:**

    Push the schema to your Neon database:

    ```bash
    pnpm db:push
    ```

5. **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📸 Screenshots

|           Home Page            |   Menu & Customization    |             Checkout              |
| :----------------------------: | :-----------------------: | :-------------------------------: |
| ![Home Page](placeholder-home) | ![Menu](placeholder-menu) | ![Checkout](placeholder-checkout) |

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ by [Nhan]
