# Change Record: Codebase Restructuring & Supabase Cleanups

This document details the cleanups and direct REST API integrations performed to finalize the FreshMart architecture.

## Legacy Cleanups

### 1. Deleted Unused Pages & Components
*   Deleted orphaned pages from the jewelry template:
    *   `src/pages/Category.tsx`
    *   `src/pages/Checkout.tsx`
    *   `src/pages/ProductDetail.tsx`
    *   `src/pages/about/` (Sustainability, StoreLocator, SizeGuide, CustomerCare, OurStory)
*   Deleted unused nested component folders (`about`, `category`, `content`, `header`, `product`).
*   Deleted the unused `src/context/CurrencyContext.tsx` context file.

### 2. Flattened Component Layout
*   Moved the `Footer.tsx` component out of `src/components/footer` to `src/components/Footer.tsx`.
*   Removed the empty `footer` folder and updated all active imports.

### 3. Removed Hardcoded Placeholder Data
*   Deleted `src/lib/loremProducts.ts`, which generated fake items.
*   Updated Products listing and details pages to display only real products.

---

## Supabase Client Removal

### 1. Folder & Dependency Removal
*   Permanently deleted the `src/integrations/supabase/` directory (including the mock client wrapper `client.ts`).
*   Uninstalled the `@supabase/supabase-js` package dependency from `package.json`.

### 2. Native REST API Integration
*   Refactored `src/hooks/useAuth.tsx` to handle authentication, registration, session checks, and state updates using native `fetch()` calls to `/api/auth/*` endpoints.
*   Refactored `src/pages/Products.tsx` and `src/pages/ProductDetailPage.tsx` to load items directly from `/api/products` and `/api/products/:id` using native `fetch()`.
*   Refactored signin/signup flows in `Auth.tsx` and `Admin.tsx` to consume the native context auth triggers.
