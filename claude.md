# FreshMart Project Change History & File Directory Map (`claude.md`)

This log tracks all changes, refactoring steps, and outlines the current structure and active files of the FreshMart codebase.

---

## 📂 Current Codebase File Directory Map

This section maps all active files in the project directories.

### 1. Project Root Configuration Files
*   [index.html](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/index.html) – Vite HTML client entry file.
*   [package.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/package.json) – Project dependencies and script runner registry.
*   [package-lock.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/package-lock.json) – NPM lockfile.
*   [vite.config.ts](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/vite.config.ts) – Vite bundler and development proxy configurations.
*   [tailwind.config.ts](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/tailwind.config.ts) – Tailwind CSS variables and theme configurations.
*   [postcss.config.js](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/postcss.config.js) – PostCSS parser settings.
*   [eslint.config.js](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/eslint.config.js) – Code styling rules.
*   [tsconfig.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/tsconfig.json) – Root TypeScript compiler configurations.
*   [tsconfig.app.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/tsconfig.app.json) – Frontend app TypeScript compiler rule sets.
*   [tsconfig.node.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/tsconfig.node.json) – Backend Node environment compiler settings.
*   [vercel.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/vercel.json) – Vercel rewrites and serverless backend hosting integrations.
*   [.gitignore](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/.gitignore) – Git file exclusions.
*   [README.md](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/README.md) – Project overview documentation.

### 2. Static Assets Folder (`public/`)
*   [public/robots.txt](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/public/robots.txt) – Search engine crawler rules.

### 3. Frontend Source Code Folder (`src/`)
*   [src/main.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/main.tsx) – Vite client entry script.
*   [src/App.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/App.tsx) – React router navigation path rules.
*   [src/App.css](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/App.css) – Client layout CSS guidelines.
*   [src/index.css](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/index.css) – Main Tailwind CSS styling rules, fonts, and theme tokens.
*   [src/vite-env.d.ts](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/vite-env.d.ts) – Vite TypeScript environment declarations.
*   **`src/components/` (Components Folder):**
    *   [src/components/Footer.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/components/Footer.tsx) – Standard footer panel.
    *   [src/components/SimpleNav.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/components/SimpleNav.tsx) – Main consumer navigation bar.
    *   [src/components/ScrollToTop.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/components/ScrollToTop.tsx) – Route change scroll-reset helper.
    *   [src/components/WhatsAppFloat.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/components/WhatsAppFloat.tsx) – Floating widget action trigger.
    *   `src/components/ui/` (Shadcn layout variables library) – Custom inputs, buttons, tables, dropdowns, and alert boxes.
*   **`src/hooks/` (Custom Hooks):**
    *   [src/hooks/useAuth.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/hooks/useAuth.tsx) – Local JWT session management and auth context.
    *   `src/hooks/use-mobile.tsx` – Mobile width detection script.
*   **`src/lib/` (Utilities):**
    *   `src/lib/utils.ts` – cn styling class utility merger.
*   **`src/pages/` (Page Layouts):**
    *   [src/pages/Index.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Index.tsx) – FreshMart homepage.
    *   [src/pages/About.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/About.tsx) – About details.
    *   [src/pages/Products.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Products.tsx) – Product listing catalog page.
    *   [src/pages/ProductDetailPage.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/ProductDetailPage.tsx) – Product details and enquiry trigger page.
    *   [src/pages/Contact.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Contact.tsx) – Contact us panel.
    *   [src/pages/Enquiry.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Enquiry.tsx) – Customer enquiry submission form.
    *   [src/pages/Auth.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Auth.tsx) – Access login and register forms.
    *   [src/pages/Admin.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/Admin.tsx) – Admin control center layout.
    *   [src/pages/NotFound.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/NotFound.tsx) – Custom 404 page.
    *   [src/pages/PrivacyPolicy.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/PrivacyPolicy.tsx) – FreshMart Privacy Policy guidelines.
    *   [src/pages/TermsOfService.tsx](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/pages/TermsOfService.tsx) – FreshMart Terms of Service rules.

### 4. Local Backend Folder (`server/`)
*   `server/index.js` – Express API base entry file.
*   `server/package.json` – Server dependencies and scripts.
*   `server/package-lock.json` – Server NPM lockfile.
*   **`server/config/` (Database Config):**
    *   `server/config/db.js` – MongoDB Atlas connection configuration helper.
*   **`server/middleware/` (Middleware):**
    *   [server/middleware/auth.js](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/server/middleware/auth.js) – Super Admin bearer token validator.
*   **`server/models/` (Data Schemas):**
    *   `server/models/User.js` – MongoDB user schema mapping.
    *   `server/models/Product.js` – MongoDB product schema mapping.
    *   `server/models/Enquiry.js` – MongoDB enquiry schema mapping.
*   **`server/routes/` (REST Routes):**
    *   `server/routes/auth.js` – User authentication routes.
    *   `server/routes/products.js` – Product read/write endpoints.
    *   `server/routes/users.js` – User admin promotion triggers.
    *   `server/routes/enquiries.js` – Enquiries read/write endpoints.

### 5. Serverless Hosting Function (`api/`)
*   [api/index.js](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/api/index.js) – Express application wrapped and optimized for Vercel Serverless Function hosting.
*   [api/package.json](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/api/package.json) – Serverless module configuration.

---

## 📋 Change History Master Log
1. [Phase 1: FMCG Layout Migration & Enquiry Model](#1-fmcg-layout-migration--enquiry-model)
2. [Phase 2: Product Catalog & Visual Styling](#2-product-catalog--visual-styling)
3. [Phase 3: MongoDB and Cloudinary Backend Integration](#3-mongodb-and-cloudinary-backend-integration)
4. [Phase 4: Navigation Bar and Header Refactoring](#4-navigation-bar-and-header-refactoring)
5. [Phase 5: Admin Panel Enquiries Grid & Status Indicators](#5-admin-panel-enquiries-grid--status-indicators)
6. [Phase 6: Vercel Serverless Hosting Configuration](#6-vercel-serverless-hosting-configuration)
7. [Phase 7: Enquiry Form Validations and Patterns](#7-enquiry-form-validations-and-patterns)
8. [Phase 8: Security Measures, Lucide Icon Migration & Cleanup](#8-security-measures-lucide-icon-migration--cleanup)
9. [Phase 9: Legacy Files Restructuring & Supabase Complete Removal](#9-legacy-files-restructuring--supabase-complete-removal)
10. [Phase 10: Admin Navigation Header Hiding](#10-admin-navigation-header-hiding)
11. [Phase 11: Removal of Remaining Legacy Branding](#11-removal-of-remaining-legacy-branding)

---

## 1. FMCG Layout Migration & Enquiry Model
*   **Transition from E-Commerce to FMCG Catalog:** Converted the original minimalist jewelry store layout ("Linea") into a Fast-Moving Consumer Goods (FMCG) grocery store template ("FreshMart").
*   **Enquiry-Only Business Model:** Removed all prices and cart payment elements. Replaced standard checkout with an "Enquire about this product" form that redirects customers to the custom Enquiry page.
*   **Category System:** Configured categories suitable for groceries/FMCG (`Beverages`, `Snacks`, `Personal Care`, `Dairy`, `Household`, `Frozen Foods`) and updated admin control panel options.
*   **Legal & Contact details:** Aligned `src/pages/TermsOfService.tsx`, `src/pages/PrivacyPolicy.tsx`, and `src/pages/Contact.tsx` with FreshMart details and branding (email: `hello@freshmartstore.com`).

## 2. Product Catalog & Visual Styling
*   **Visual Indicators:** Evaluated visual options, starting with category-specific emojis, then transitioning to product catalog imagery.
*   **Minimalist Presentation:** Settled on a clean, grey card placeholder box for items without uploaded photos, preserving a clean aesthetic.
*   **Category Tags:** Resolved bugs where mock category placeholders mismatched active page listing routes.

## 3. MongoDB and Cloudinary Backend Integration
*   **Express API Server:** Created a local Node.js Express server (`server/` directory) utilizing Mongoose to read and write database collections (`User`, `Product`, `Enquiry`).
*   **Cloudinary Storage:** Configured Cloudinary to host product images. Developed multipart file upload backend routes (via multer).
*   **Auth Controls:** Implemented Super Admin credentials (`admin` / `admin` login) and locked unauthorized roles, deprecating generic guest-member roles.
*   **Enquiry Persistence:** Wired the front-end Enquiry Form to save user requests directly to MongoDB.

## 4. Navigation Bar and Header Refactoring
*   **Simplified Navbar:** Removed login/logout links from the main site navbar (`src/components/SimpleNav.tsx`) to present a clean, consumer-focused catalog header.
*   **Toggled Headers:** Configured standard navigation headers to hide themselves automatically when a Super Admin is logged in to maximize admin dashboard space.

## 5. Admin Panel Enquiries Grid & Status Indicators
*   **Interactions:** Added dynamic Status dropdown columns (`New`, `Interested`, `Not Interested`) directly to the Enquiries grid, triggering updates instantly in MongoDB.
*   **Grid Simplification:** Cleaned up spacing by replacing delete buttons with clear check/cross tags, and eventually removing the Actions column.
*   **Metric Summary Widgets:** Implemented rounded counter widgets above the grid displaying counts of Pending, Interested, and Not Interested enquiries with vector icons.

## 6. Vercel Serverless Hosting Configuration
*   **Rewrites Configuration:** Added client-side rewrites inside `vercel.json` to properly map all SPA route paths back to `index.html`.
*   **API Handlers:** Grouped all backend routing logic inside `api/index.js` to run the Express API router as a Vercel Serverless Function, optimizing Mongoose connection caching.
*   **Secrets Isolation:** Removed `.env` files from Git tracking and added them to `.gitignore` to secure database tokens in production.

## 7. Enquiry Form Validations and Patterns
*   **Phone Inputs:** Restricted phone inputs to digits only and enforced a strict validation pattern requiring exactly 10 digits.
*   **Pattern Attributes:** Bound custom regex checks to form inputs (name, email, quantity) to block non-pattern characters on keydown.

## 8. Security Measures, Lucide Icon Migration & Cleanup
*   **Brute-force Limiting:** Implemented a client-side login rate limit (5 attempts max, followed by a 10-minute lockout saved in `localStorage`).
*   **SHA-256 Hashing:** Added client-side SHA-256 hashing to secure password transfers before backend routing.
*   **Icon Migration:** Cleaned up legacy files by converting inline SVGs to Lucide React icons.

## 9. Legacy Files Restructuring & Supabase Complete Removal
*   **Orphaned Code Cleanups:** Deleted unused folders from the original template (`components/about`, `category`, `content`, `header`, `product`) and legacy pages (`Category.tsx`, `Checkout.tsx`, `ProductDetail.tsx`, and the `pages/about` directory).
*   **Footer Flattening:** Flattened the components tree by moving `Footer.tsx` to `src/components/Footer.tsx` and updating all active page imports.
*   **Removing Mock Placeholders:** Deleted `src/lib/loremProducts.ts` and updated listing/detail loops to load exclusively from the database.
*   **Supabase Removal:** Completely deleted the mock Supabase folder (`src/integrations/supabase/`), uninstalled the `@supabase/supabase-js` package dependency, and refactored the auth context (`useAuth.tsx`) and data loaders (`Products.tsx`, `ProductDetailPage.tsx`, `Auth.tsx`, `Admin.tsx`) to make direct REST API requests via native `fetch()`.

## 10. Admin Navigation Header Hiding
*   **Hiding Header on Login/Dashboard:** Completely removed the `SimpleNav` navigation header from the `Admin.tsx` page so it remains hidden on both the Admin login screen and the control dashboard layout.

## 11. Removal of Remaining Legacy Branding
*   **SEO Title & Meta Tags:** Updated [index.html](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/index.html) header title, author, OpenGraph tags, and descriptions to match FreshMart branding instead of the legacy Linea jewelry brand.
*   **Favicon Replacement:** Set the client tab favicon icon dynamically via an SVG of a shopping cart emoji (`🛒`).
*   **Config Comments:** Removed occurrences of the word "Linea" inside code comments across [tailwind.config.ts](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/tailwind.config.ts) and [src/index.css](file:///d:/ziya/Projects/remix-of-ecommerce-store-website-template-main/remix-of-ecommerce-store-website-template-main/src/index.css).
