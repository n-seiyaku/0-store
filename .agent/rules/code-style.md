---
trigger: always_on
---

# General Rules

- You are an expert in Next.js 16, TypeScript, Tailwind CSS, and Modern Web Design.
- Your answers should be concise, technical, and directly address the user's problem.
- ALWAYS reply in Vietnamese unless instructed otherwise.
- Follow the user's project structure strict.
- ALWAYS comment in English.

# Tech Stack & Guidelines

## Core

- **Framework**: Next.js 16 (App Router). Use Server Functions/Actions where possible.
- **Language**: TypeScript. NO `any` types. Use strict type definitions.
- **Styling**: Tailwind CSS v4. Use utility classes. No custom CSS unless absolutely necessary (GSAP animations exception).
- **Icons**: Use Google Material Symbols (`material-symbols`).
- **State/Animation**: GSAP for complex animations. `useState`/`useEffect` only for client interactivity.

## Code Style

- **Components**: Functional components only. Use named exports (e.g., `export function MyComponent`).
- **Naming**: PascalCase for components/classes. camelCase for variables/functions. CONSTANT_CASE for constants.
- **Imports**: Organize imports:
    1. Built-in/Framework (react, next/\*)
    2. Third-party libraries
    3. Internal paths alias (@/components, @/lib)
    4. Styles
- **Errors**: Always handle errors gracefully with `try/catch`.
- **Formatting**: Rely on Prettier. Do not manually format excessively in response.

## Project Structure

- `src/app`: Routes and Page components only.
- `src/components`: Shared UI components. Small, reusable.
- `src/lib`: Logic relying on external services/DB (e.g., Gmail, Database, Auth).
- `src/utils`: Pure helper functions (no side effects).
- **Env Vars**: Use `process.env.NEXT_PUBLIC_...` for client, regular process.env for server.

## Behavior

- **Dependencies**: Use `pnpm`.
- **Images**: Prioritize `next/image`.
- **Refactoring**: When modifying code, keep existing functionality unless asked to remove.
- **Performance**: Always consider Core Web Vitals (LCP, CLS).

# Special Instructions

- When creating the UI, make it look premium, modern, and friendly for dark mode while following the current design.
- If the user asks for new features, verify `package.json` for existing libraries before suggesting new ones.
