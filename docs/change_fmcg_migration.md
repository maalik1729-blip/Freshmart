# Change Record: FreshMart FMCG Layout Migration

This document details the transition from the legacy jewelry e-commerce layout ("Linea") to the Fast-Moving Consumer Goods (FMCG) grocery store layout ("FreshMart").

## Key Features & Refactoring

### 1. Shift to Enquiry-Only Business Model
*   Removed all price-related elements from the main products catalog page and product detail pages.
*   Introduced an "Enquire about this product" form redirecting users to a custom enquiry page instead of standard checkout/payment procedures.

### 2. Category System Updates
*   Updated category definitions to reflect FMCG products:
    *   `Beverages`
    *   `Snacks`
    *   `Personal Care`
    *   `Dairy`
    *   `Household`
    *   `Frozen Foods`
*   Modified the Admin control panel forms to support listing items inside these new categories.

### 3. Legal and Contact Alignments
*   Rewrote `src/pages/TermsOfService.tsx` and `src/pages/PrivacyPolicy.tsx` to match the FreshMart branding.
*   Updated `src/pages/Contact.tsx` with the active email (`hello@freshmartstore.com`) and local phone details.

### 4. SEO & Tab Branding Updates
*   Updated `index.html` headers, title, descriptions, and OpenGraph tags to align with FreshMart's grocery store model instead of the legacy Linea jewelry brand.
*   Replaced the tab favicon with a grocery cart emoji (`🛒`) encoded directly in SVG data to avoid external file dependencies.
