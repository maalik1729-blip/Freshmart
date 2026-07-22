# Change Record: Security, Lucide Icon Migration & UI Cleanups

This document covers security enhancements, icon refactoring, and structural cleanups.

## Security Improvements

### 1. Admin Login Safeguards
*   Added SHA-256 password hashing on the client side before credentials are sent to the login endpoint.
*   Introduced a strict rate limiter (maximum 5 attempts per 10 minutes) with persistent lockout state stored in `localStorage`.
*   Disabled browser auto-fill on sensitive fields by setting `autocomplete="off"`.

### 2. General Cleanups
*   Deleted leftover Supabase migration files and sql schema directories to clean up the repository.
*   Cleaned up the Admin access panel styling and removed public notices describing details like hashing algorithms to improve security obscurity.

---

## Code Refactoring and UI Polish

### 1. Lucide React Icon Migration
*   Replaced heavy inline SVGs across all components with lightweight [lucide-react](https://lucide.dev) components to decrease file sizes and improve readability.

### 2. Mobile Layout Tweaks
*   Removed orphaned imports (such as `Badge`, `Minus`, `Plus`) in navigation headers to fix a bug where a phantom dot appeared on the mobile layout overlay.
