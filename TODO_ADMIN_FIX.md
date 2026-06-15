# Daman-Admin Backend Connection Fix Plan

## Problem Summary
The admin panel frontend is pointing to 3 different/inconsistent backends:
1. **vite.config.ts proxy** → `localhost:4000` (nothing running there)
2. **settings.tsx & notices.tsx** → `matka-api-server.onrender.com` (external, not local)
3. **results.tsx** → direct fetch to `localhost:5000` (bypasses auth headers)

The real backend runs on **port 5000** (`backend/index.js`).

## Steps to Fix

### Step 1: Fix vite.config.ts proxy target ✅
- Change default from `http://localhost:4000` → `http://localhost:5000`

### Step 2: Fix settings.tsx API base URL ✅
- Change `import.meta.env.VITE_API_URL` → `import.meta.env.VITE_API_BASE_URL`
- Change fallback from `https://matka-api-server.onrender.com` → `http://localhost:5000`

### Step 3: Fix notices.tsx API base URL ✅
- Same as Step 2

### Step 4: Fix results.tsx edit handler ✅
- Replace direct `fetch()` with centralized `put()` from `@/lib/api`
- Ensure auth headers are sent properly
- Map frontend fields (`digit`, `bigSmall`, `color`) to backend fields (`betnumbers`, `bigsmall`, `color`)

### Step 5: Create .env file ✅
- Add `VITE_API_BASE_URL=http://localhost:5000` for single configuration source

## Follow-up
- Start real backend on port 5000: `cd backend && npm start`
- Start admin panel frontend: `cd daman-admin/artifacts/admin-panel && npm run dev`

