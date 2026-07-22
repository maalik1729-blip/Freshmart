# Change Record: NavBar and Navigation Header Styling

This document records the user interface modifications applied to the navigation headers.

## UI Cleanups

### 1. Simple Navbar Updates
*   Removed login and logout buttons from the main site navigation bar (`src/components/SimpleNav.tsx`) to give a clean, consumer-focused shopping experience.
*   Retained only core customer pages (About, Products, Contact Us, Enquiry) in the navbar.

### 2. Admin Header Handling
*   Configured the standard header to hide itself when a Super Admin is logged in to maximize workspace space on the `src/pages/Admin.tsx` control dashboard.
