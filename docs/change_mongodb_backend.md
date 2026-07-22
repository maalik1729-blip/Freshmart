# Change Record: MongoDB and Cloudinary Backend Migration

This document records the migration of the database and storage stack from Supabase to MongoDB and Cloudinary, as well as the implementation of the Admin privileges.

## Database & Storage Integration

### 1. MongoDB Database
*   Created a local Node.js Express server inside the `server/` directory connecting to MongoDB using Mongoose.
*   Defined Mongoose schemas for `User`, `Product`, and `Enquiry` objects.
*   Configured database triggers, such as auto-promoting the first registered user to admin, which was later refined.

### 2. Cloudinary Media Storage
*   Configured Cloudinary as the host for product images.
*   Built server routes to handle multipart form uploads (via multer) to send files directly to Cloudinary.

---

## Admin Controls and Panels

### 1. Super Admin Authentication
*   Introduced Super Admin privileges with hardcoded credentials (`admin` / `admin`).
*   Restricted general admin panel routes and restricted unauthorized role modification operations.
*   Eventually deprecated legacy guest-member roles, consolidating all features into a single Admin dashboard.

### 2. User Enquiries Panel
*   Updated the `src/pages/Enquiry.tsx` form to save all entries directly in MongoDB.
*   Created a read/write data grid in the Admin panel to pull, display, and update user enquiries in real-time.
