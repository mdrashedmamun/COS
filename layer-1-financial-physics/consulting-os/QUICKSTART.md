# Quick Start: Get Running in 30 Minutes

For full details, see `SETUP-PRODUCTION.md`. This is the TL;DR version.

## Step 1: Create Supabase Project (5 min)

```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Wait for setup to complete
# 4. Go to Settings → API
# 5. Copy these three values:
#    - Project URL
#    - Anon Key
#    - Service Role Key
```

## Step 2: Create Database Schema (2 min)

```bash
# 1. In Supabase, go to SQL Editor
# 2. Create new query
# 3. Paste contents of: supabase-schema.sql
# 4. Click "Run"
# 5. Verify: SELECT * FROM pg_tables WHERE tablename='diagnoses';
```

## Step 3: Set Up Local Environment (5 min)

```bash
# Clone and enter project
cd layer-1-financial-physics/consulting-os

# Run setup script (creates .env.local)
bash scripts/setup-local.sh

# Edit .env.local with your Supabase credentials:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

## Step 4: Test Locally (5 min)

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Test flow:
# 1. Calculator → complete form
# 2. Diagnosis → sign in with email
# 3. Check email for magic link
# 4. Click link → redirects to app
# 5. Save to dashboard
# 6. Visit /dashboard → see saved diagnosis
```

## Step 5: Deploy to Vercel (10 min)

```bash
# Push to git
git add .
git commit -m "setup: add Supabase schema and production config"
git push

# Deploy (choose one):

# Option A: CLI
npm install -g vercel
vercel deploy --prod

# Option B: Web dashboard
# 1. Go to https://vercel.com
# 2. Import project
# 3. Click Deploy
```

## Step 6: Add Environment Variables to Vercel (5 min)

1. Go to Vercel dashboard → Settings → Environment Variables
2. Add all from `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app  ← Important!
   KV_REST_API_URL=...
   KV_REST_API_TOKEN=...
   ```
3. Redeploy: `vercel deploy --prod`

## Step 7: Update Supabase Magic Link URLs (2 min)

In Supabase:
1. Go to Authentication → URL Configuration
2. Add "Redirect URLs":
   ```
   https://your-domain.vercel.app/auth/callback
   https://your-domain.vercel.app
   ```
3. Save

## Done! 🎉

Visit your production domain and test:
- Sign up with email
- Complete diagnosis
- Save to dashboard
- Everything should work!

## Troubleshooting

**Magic link not received:**
- Check spam folder
- Verify email in Supabase Auth

**"Invalid API key" error:**
- Double-check credentials in .env.local
- Make sure anon key (not service role key) in NEXT_PUBLIC_SUPABASE_ANON_KEY

**Diagnosis not saving:**
- Check browser console (F12 → Console)
- Verify you're logged in
- Check Supabase RLS policies are enabled

**Still stuck?**
See full guide: `SETUP-PRODUCTION.md`
