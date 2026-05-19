<!--
	README goals:
	- Be reviewer-friendly (assignment criteria)
	- Be contributor-friendly (setup + architecture)
	- Stay accurate to what the repo actually does
-->

# KenaKata.com — Modern E‑commerce Storefront

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B0F19) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-State_Management-433E38) ![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)

Production-style e‑commerce storefront built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, powered by the **Platzi Fake Store API**. This capstone focuses on scalable frontend architecture, modern Next.js rendering decisions, polished shopping flows (browse → details → cart → checkout), and reliable client state (auth/cart/wishlist) without a custom backend.

![KenaKata hero](public/images/hero-img.png)

## Links

- Live: https://kenakata-ecommerce-storefront-next-js.onrender.com/
- Repo: https://github.com/NaimurRahmannn/Kenakata-ecommerce-storefront-Next.js-
- Assignment brief: https://cheery-treacle-799105.netlify.app/assignment
- API base: https://api.escuelajs.co/api/v1

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [API integration](#api-integration)
- [Rendering strategy](#rendering-strategy)
- [Tradeoffs](#tradeoffs)
- [Performance considerations](#performance-considerations)
- [Challenges](#challenges)
- [Setup (local)](#setup-local)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Deployment (Render)](#deployment-render)
- [Test credentials](#test-credentials)
- [Future improvements](#future-improvements)

---

## Features

### Public storefront

- Home page with hero, featured products, and categories
- Product listing with **search**, **category filter**, **price range**, **sorting**, and **pagination**
- Robust **loading / empty / error / not-found** states across routes

### Product details

- Image gallery
- Product info + details tabs
- Related products
- Add to cart with quantity controls
- Wishlist toggle from cards and details

### Cart & checkout

- Add/remove/update cart items
- Order summary
- Checkout UI with shipping/payment selection
- Mocked payment flow (UI-level)

### Authentication

- Login + register (Platzi Fake Store API)
- Header user menu + logout
- **Guest vs authenticated** cart/wishlist separation so switching accounts doesn’t overwrite guest state

### UX quality

- Fully responsive layout (mobile → desktop)
- Light/dark theme toggle via `next-themes`

---

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Zustand** for auth/cart/wishlist state + localStorage persistence
- **React Hook Form** + **Zod** for form handling and validation
- **Lucide React** icons, **Sonner** toasts, `clsx` + `tailwind-merge` for class composition

Testing tooling is installed (`vitest`, Testing Library, `jsdom`), even though this repo currently focuses on product features over test coverage.

---

## Project structure

Feature-oriented architecture on top of App Router: pages live in `src/app`, reusable UI in `src/components`, and domain logic/UI in `src/features`.

```txt
src/
	app/                 # Routing + page composition
	components/          # App-wide shared components (layout, providers, ui)
	constants/           # Centralized constants (API base, routes, payment methods)
	features/            # Domain modules (home/products/cart/checkout/auth/wishlist)
	hooks/               # Shared hooks
	lib/                 # API helpers + utilities
	store/               # Zustand stores
	types/               # Shared TypeScript types
```

### Why this architecture?

- Keeps route files small and compositional
- Avoids “big components” by grouping features by domain
- Makes it easy to scale pages without mixing concerns (auth vs products vs cart)

---

## API integration

The app consumes the Platzi Fake Store API.

Common endpoints used:

- `GET /products`
- `GET /products/:id`
- `GET /categories`
- `POST /auth/login`
- `GET /auth/profile`
- `POST /users`

Implementation locations:

- API base URL: `src/constants/api.ts`
- Reusable fetch helpers: `src/lib/api.ts`, `src/lib/auth-api.ts`

---

## Rendering strategy

This project uses a hybrid rendering model.

### Server Components by Default

Most page-level and data-fetching components are kept as Server Components. This improves first load performance, reduces client JavaScript, and keeps API fetching closer to the server-rendered route.

Examples:

- Homepage product/category sections
- Product listing page
- Product details page
- Related products section

### Client Components for Interactivity

Client Components are used only where browser APIs, local state, localStorage, persisted Zustand state, or user interaction is required.

Examples:

- Cart item actions
- Wishlist toggles
- Product quantity controls
- Login/register forms
- Theme toggle
- Header user menu
- Auth/cart/wishlist state synchronization

### Dynamic Rendering for Shop Filtering

The shop page uses URL search parameters for filtering, sorting, and pagination. This keeps the filter state shareable in the URL and avoids hiding important product discovery state only in client memory.

Examples of supported query params:

```txt
/products?q=bag
/products?category=clothes
/products?sort=price-asc
/products?min=20&max=100
/products?page=2
```

### Client Persistence for Cart, Wishlist, and Auth

Cart, wishlist, and auth state are stored in localStorage through Zustand. This gives a smooth prototype experience without requiring a backend database.

---

## Tradeoffs

### LocalStorage Instead of Backend Persistence

Cart, wishlist, and auth state are persisted in the browser. This is simple, fast, and suitable for the assignment, but it means data is device-specific and not synced across browsers.

### Fake API Instead of Real Commerce Backend

The Platzi Fake Store API provides products, categories, users, and auth endpoints, but it does not provide real orders, payments, inventory, ratings, or reviews. Some UI elements such as ratings, review counts, payment methods, and checkout success are simulated.

### Client-side Owner Separation Instead of Account Cart Sync

Guest and user cart/wishlist data are separated locally using owner-based storage keys. This solves the UX problem of losing cart data during login/logout, but it does not merge guest carts into account carts or persist them to a remote database.

### Manual UI Components Instead of a Full Component Library

Reusable buttons, inputs, cards, layout sections, and product components are custom-built. This keeps the design unique and lightweight, but it requires more manual work for accessibility and edge cases.

### Broad Product Fetch for Filtering

The shop page fetches a larger product set and applies search, price filtering, category filtering, sorting, and pagination in the application. This simplifies implementation with the fake API, but a production storefront would usually push more filtering to the backend/search service.

---

## Performance Considerations

- Server Components are used where possible to reduce unnecessary client-side JavaScript.
- API access is centralized through reusable fetch helpers.
- Product/category fetches use caching and revalidation where appropriate.
- Category data is treated as slower-changing and can be cached longer than product listing data.
- Product images use Next.js `Image` where possible for optimized rendering.
- Client components are isolated to interactive UI instead of converting entire pages to client components.
- URL-driven filtering improves shareability and avoids large global client state for product discovery.
- Hydration mismatch issues are handled with mounted-state patterns for persisted Zustand and theme-dependent UI.
- `safeImage()` fallbacks protect the UI from broken or invalid API image URLs.

---

## Challenges

### 1. Hydration Mismatches

Persisted Zustand state and `next-themes` both depend on browser-only information. The solution was to use mounted-state checks before rendering client-only values such as cart counts, wishlist counts, auth user menus, and theme icons.

### 2. API Data Quality

The fake API can return inconsistent product images or incomplete fields. The project uses defensive helpers such as `safeImage()` and graceful empty/error states to prevent the UI from breaking.

### 3. Guest vs Authenticated State

A single global cart would cause incorrect behavior when switching between guest and logged-in users. This was solved by introducing owner-based localStorage keys for guest and authenticated user state.

### 4. Keeping Server and Client Boundaries Clean

Product pages should benefit from server rendering, while cart actions and wishlist toggles require browser state. The project keeps pages server-rendered where possible and extracts interactive parts into small Client Components.

### 5. Dark Mode Across a Custom Design

The luxury light theme used many warm backgrounds and custom colors. Dark mode required careful `dark:` styling across layout, forms, cards, checkout, cart, and product pages while preserving the same brand feel.

### 6. Deployment Fixes

Deployment required resolving build-time issues such as suspense/hydration-related behavior and ensuring the app builds correctly in the Render environment.

### 7. `searchParams` Can Be a Promise (Pagination Falling Back to Page 1)

In the App Router, `searchParams` may be typed/provided as a **Promise** in server components depending on Next.js version and route configuration. Treating it like a plain object can cause subtle bugs where query-driven state (especially pagination) silently falls back to defaults (e.g., always returning to page 1).

Fix:

- Normalize `searchParams` by awaiting it before reading values.
- Parse the value defensively (`string | string[] | undefined`).

Example pattern:

```ts
// Server Component page
export default async function Page({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const page = Number(params.page ?? 1) || 1;

	// ...use `page` for pagination
}
```

### 8. Suspense / Async Boundaries During Deployment

Some production builds surfaced issues around async rendering and boundaries (for example, components relying on dynamic route/search state). The fix was to keep server/client boundaries clean and ensure async page composition is structured in a way that’s compatible with deployment behavior.

### 9. URL-Driven Filters Without UI Desync

Keeping filtering/sorting/pagination in the URL is great for shareable links, but it introduces edge cases:

- Changing one filter should reset pagination
- Multiple controls (search, slider, category, sort) must not fight each other
- Default values must be applied consistently when params are missing

The solution was to standardize query param parsing and ensure each interaction updates URL state in a predictable way.

### 10. Responsive Filters and Layout Consistency

Making the product discovery UI work well on mobile required a few iterations (filters layout, spacing, and how/where filters are displayed). Several UI tweaks focused on preventing layout jumps and ensuring the filtering UX remains usable on smaller screens.

---

## Branch and Commit Workflow

The repository uses multiple branches for separating feature work. Observed branches include:

```txt
main
dev
wishlist
features/buy
features/auth
features/checkout
```

The main branch contains a clear feature-by-feature commit history, including work for:

- Homepage/storefront sections
- Shop filters and responsiveness
- Product details/gallery/cart integration
- Cart page and order summary
- Checkout page functionality
- Login and registration
- Authenticated user menu
- Guest/user cart and wishlist separation
- Wishlist page and interactions
- Theme toggle and dark mode fixes
- Deployment fixes

---

## Setup (local)

### Prerequisites

- Node.js 18+ recommended (for Next.js 16)
- npm (or your preferred package manager)

### 1. Clone the repository

```bash
git clone https://github.com/NaimurRahmannn/Kenakata-ecommerce-storefront-Next.js-.git
cd Kenakata-ecommerce-storefront-Next.js-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

### 4. Run lint

```bash
npm run lint
```

### 5. Build for production

```bash
npm run build
```

### 6. Start production build

```bash
npm run start
```

---

## Scripts

- `npm run dev` — start Next.js in dev mode
- `npm run build` — production build
- `npm run start` — run the production server
- `npm run lint` — run ESLint

---

## Environment Variables

This project currently uses the public Platzi Fake Store API and does not require private environment variables.

If needed later, create `.env.local` and move the API base URL into:

```env
NEXT_PUBLIC_API_BASE_URL="https://api.escuelajs.co/api/v1"
```

---

## Deployment (Render)

Recommended Render settings:

```txt
Environment: Node
Build Command: npm install && npm run build
Start Command: npm run start
```

Because this is a Next.js app, make sure Render uses a supported Node version and installs dependencies from `package-lock.json`.

---

## Test credentials

For Platzi Fake Store API login testing:

```txt
example:
Email: Testusername@gmail.com
Password: 123456
```

Registration can be tested with a new unique email address.

---

## Future improvements

- Add real backend order creation and order history
- Sync cart and wishlist to a database for authenticated users
- Add guest cart merge prompt after login
- Add real payment gateway integration
- Add user profile editing
- Add real reviews and rating system
- Add unit tests for stores, schemas, and utility functions
- Add integration tests for cart, wishlist, auth, and checkout flows
- Add image CDN/domain validation for safer external images
- Add accessibility audit for menus, drawers, filters, and forms
- Add SEO metadata for product detail pages
- Add sitemap and robots configuration
- Add analytics and error monitoring

---

## Assignment Coverage

This project covers the major assignment requirements:

- Public storefront
- Product listing
- Search/filter/sort
- Product details
- Cart
- Checkout form
- Authentication
- Protected/dashboard-ready auth flow
- Loading/error/not-found states
- Clean folder architecture
- README and deployment preparation
- Theme change option
- Wishlist functionality
- Responsive layout

---

## Author

**Niamur Rahman Lam**
