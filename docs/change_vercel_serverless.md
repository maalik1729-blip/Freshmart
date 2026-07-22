# Change Record: Vercel Serverless Hosting Configuration

This document records the configurations added to deploy the React SPA and the Node/Express backend on Vercel.

## Vercel Serverless Integration

### 1. Client Routing (SPA Support)
*   Created `vercel.json` and added rewrites formatting to route all incoming client request paths back to `index.html` to support client-side React Router routing.

### 2. Serverless API Routing
*   Created a unified handler inside `api/index.js` to run the Express API router rules in a serverless environment.
*   Updated `vercel.json` to map all `/api/*` endpoint requests directly to this serverless handler.
*   Optimized database connection reuse in the serverless handler by caching the Mongoose connection state across warm calls.

### 3. Environment Security
*   Ensured Vercel injects environment variables directly, eliminating the need to load local `.env` files in production.
*   Removed `.env` files from Git history and updated `.gitignore` rules to prevent tracking local credentials.
