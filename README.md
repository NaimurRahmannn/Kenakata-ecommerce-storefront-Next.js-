# KenaKata.com — Modern E-commerce Storefront

KenaKata.com is a production-style e-commerce storefront built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and the **Platzi Fake Store API**. The project was created as a capstone assignment to demonstrate scalable frontend architecture, modern rendering decisions, reusable components, client-side state management, authentication, cart/wishlist behavior, and deployment readiness.

The application uses a luxury storefront visual direction with warm ivory backgrounds, muted gold accents, responsive layouts, light/dark theme support, and polished shopping flows from browsing products to checkout.

---

## Live / Repository

- **Repository:** `https://github.com/NaimurRahmannn/Kenakata-ecommerce-storefront-Next.js-`
- **Deployment:** Render
- **Live url:** `https://kenakata-ecommerce-storefront-next-js.onrender.com/`
- **Assignment:** `https://cheery-treacle-799105.netlify.app/assignment`

---

## Project Overview

The goal of KenaKata.com is to simulate a modern online storefront using real API data and production-minded frontend patterns. The application supports public shopping pages, product discovery, product details, cart management, wishlist management, authentication, checkout UI, dashboard entry, and global theme switching.

### Core Features

- Public storefront homepage
- Hero section, featured products, and category browsing
- Product listing / shop page
- Product search, category filtering, price filtering, sorting, and pagination
- Product details page with gallery, product information, tabs, and related products
- Add to cart with quantity control
- Cart page with item management and order summary
- Wishlist page and wishlist toggling from product cards/details
- Checkout page with shipping/payment selection UI
- Login and registration using Platzi Fake Store auth/users API
- Authenticated user dropdown in the header
- Guest/user-separated cart and wishlist persistence
- Light/dark theme toggle using `next-themes`
- Responsive layout across mobile, tablet, and desktop
- Loading, empty, not-found, and error states

---

## Tech Stack

### Framework and Language

- **Next.js 16**
- **React 19**
- **TypeScript**
- **App Router**

### Styling and UI

- **Tailwind CSS v4**
- **Lucide React** for icons
- **clsx** and **tailwind-merge** for class composition
- **next-themes** for light/dark theme switching
- **Sonner** for toast notifications

### State and Forms

- **Zustand** for cart, wishlist, and auth state
- **React Hook Form** for auth/checkout forms
- **Zod** for schema validation
- **@hookform/resolvers** for form validation integration

### Testing Tooling Installed

- **Vitest**
- **Testing Library**
- **jsdom**

---

## API Integration

The project uses the Platzi Fake Store API.

### Main API Areas

- `GET /products` — product listing data
- `GET /products/:id` — product details
- `GET /categories` — category data
- `POST /auth/login` — login authentication
- `GET /auth/profile` — authenticated user profile
- `POST /users` — user registration

The API base URL is centralized in:

```txt
src/constants/api.ts
```

Reusable API helpers are defined in:

```txt
src/lib/api.ts
src/lib/auth-api.ts
```

---

## Architecture Explanation

The project follows a feature-oriented architecture on top of the Next.js App Router. Route files stay inside `src/app`, while reusable domain-specific UI and logic live inside `src/features`.

```txt
src/
├── app/
│   ├── cart/
│   ├── checkout/
│   ├── dashboard/
│   ├── login/
│   ├── products/
│   │   └── [id]/
│   ├── register/
│   ├── wishlist/
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── layout/
│   ├── providers/
│   ├── shared/
│   └── ui/
├── constants/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── products/
│   └── wishlist/
├── hooks/
├── lib/
├── store/
└── types/
```

### App Layer

The `src/app` directory owns routing and page composition:

- `/` renders the storefront homepage
- `/products` renders the shop/collection page
- `/products/[id]` renders product details
- `/cart` renders the cart experience
- `/wishlist` renders wishlist items
- `/checkout` renders checkout UI
- `/login` and `/register` handle auth pages
- `/dashboard` is the authenticated user destination

### Components Layer

`src/components` stores shared application-level components:

- `layout` — header, footer, user menu, theme toggle
- `providers` — theme provider
- `auth` — auth synchronization component
- `shared` — container, section title, empty state
- `ui` — base UI primitives such as buttons and inputs

### Feature Layer

`src/features` groups UI and logic by domain:

- `home` — hero, featured products, category sections
- `products` — product grid, product card, filters, sort, gallery, details tabs, related products
- `cart` — cart item list, order summary, recommendations
- `checkout` — checkout content and order summary
- `auth` — login/register forms and validation schemas
- `wishlist` — wishlist UI

This makes the project easier to scale because product-specific UI does not get mixed with auth, cart, or checkout logic.

### Store Layer

`src/store` contains Zustand stores:

- `auth-store.ts` — user, access token, refresh token, authentication status
- `cart-store.ts` — cart items, quantity actions, subtotal calculation, owner-based persistence
- `wishlist-store.ts` — wishlist items and owner-based persistence

The cart and wishlist stores use separate owner keys:

```txt
guest
user:<userId>
```

This allows guest users and authenticated users to keep separate cart and wishlist states.

---

## Rendering Strategy Decisions

The project uses a hybrid rendering model.

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

## Tradeoffs Made

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

## Challenges Faced

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

## Setup Instructions

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

## Environment Variables

This project currently uses the public Platzi Fake Store API and does not require private environment variables.

If needed later, create `.env.local` and move the API base URL into:

```env
NEXT_PUBLIC_API_BASE_URL="https://api.escuelajs.co/api/v1" 
(Public API that's why provided)
```

---

## Render Deployment Notes

Recommended Render settings:

```txt
Environment: Node
Build Command: npm install && npm run build
Start Command: npm run start
```

Because this is a Next.js app, make sure Render uses a supported Node version and installs dependencies from `package-lock.json`.

---

## Test Credentials

For Platzi Fake Store API login testing:

```txt
Email: john@mail.com
Password: changeme
```

Registration can be tested with a new unique email address.

---

## Future Improvements

- Add real backend order creation and order history
- Sync cart and wishlist to a database for authenticated users
- Add guest cart merge prompt after login
- Add real payment gateway integration
- Add protected middleware for dashboard and checkout routes
- Add user profile editing
- Add real reviews and rating system
- Add product skeleton loading states across all product grids
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
