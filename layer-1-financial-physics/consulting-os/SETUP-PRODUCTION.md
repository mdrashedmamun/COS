# Production Setup Guide: Phase A+E

Complete guide to set up Consulting OS with authentication and persistent diagnosis storage.

## Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for hosting)
- Supabase account (free tier)

---

## Part 1: Supabase Setup (5 minutes)

### Step 1.1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New project"
4. Configure:
   - **Organization**: Create new or select existing
   - **Project name**: `consulting-os` (or your preference)
   - **Database password**: Generate strong password and save it
   - **Region**: Choose closest to your users (us-east-1 recommended)
5. Click "Create new project" and wait 2-3 minutes for setup

### Step 1.2: Get Credentials

Once project is ready:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://[project-id].supabase.co`
   - **Anon Key**: (the public key)
   - **Service Role Key**: (the secret key - keep safe!)

Save these - you'll need them in Step 2.

### Step 1.3: Create Database Schema

1. In Supabase, go to **SQL Editor**
2. Click "New query"
3. Copy entire contents of `supabase-schema.sql` from this repo
4. Paste into SQL editor
5. Click "Run"
6. Verify success - check for "Query executed" message

**What this does:**
- Creates `diagnoses` table with all fields
- Sets up Row-Level Security (users can only see their own data)
- Creates indexes for fast queries
- Adds automatic `updated_at` timestamp

### Step 1.4: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Find "Email"
3. Ensure it's enabled (toggle ON)
4. Configure email settings:
   - **Email confirmations**: Leave default
   - **Email templates**: Can customize later if needed

### Step 1.5: Enable Third-Party Auth (Optional)

For better UX, enable Google/GitHub login:

1. Go to **Authentication** → **Providers**
2. Click on "Google" or "GitHub"
3. Follow setup instructions (requires OAuth app creation)
4. Can be skipped for now - magic link works great

---

## Part 2: Local Development Setup (10 minutes)

### Step 2.1: Install Dependencies

```bash
cd layer-1-financial-physics/consulting-os

# Install packages (includes Supabase)
npm install
```

### Step 2.2: Configure Environment Variables

1. Create `.env.local` file in project root:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and fill in your values:

```bash
# Supabase (from Step 1.2)
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...

# Site URL (used for magic link redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel KV (from Phase B+C setup - optional, leave if not set up)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

**⚠️ Security**: Never commit `.env.local` to git. It's in `.gitignore` by default.

### Step 2.3: Test Local Development

```bash
# Start development server
npm run dev
```

Visit http://localhost:3000

Test the flow:
1. Go to `/calculator`
2. Fill out form and complete diagnosis
3. On diagnosis page, click "Sign In to Save"
4. Enter your test email
5. Check email for magic link
6. Click link - should redirect to app and sign you in
7. Click "💾 Save to Dashboard"
8. Go to `/dashboard` - should see your diagnosis!

If everything works → Ready for production! ✅

---

## Part 3: Vercel Deployment (10 minutes)

### Step 3.1: Push to Git

```bash
git add .
git commit -m "chore: add production setup files and Supabase schema"
git push origin main
```

### Step 3.2: Deploy to Vercel

**Option A: Via Vercel CLI (Recommended)**

```bash
npm install -g vercel

# Deploy
vercel deploy --prod

# Or use built-in deploy
npm run build
vercel deploy --prod
```

**Option B: Via Vercel Web Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "Add new" → "Project"
3. Import your GitHub repo
4. Click "Deploy"

### Step 3.3: Add Environment Variables to Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add all variables from `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app  (← Change to your actual domain)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

**Important**: For `NEXT_PUBLIC_SITE_URL`, use your actual Vercel domain (e.g., `https://consulting-os.vercel.app`)

### Step 3.4: Redeploy with Environment Variables

```bash
# Option 1: Redeploy via CLI
vercel deploy --prod

# Option 2: Go to Vercel dashboard → Deployments → Redeploy latest
```

### Step 3.5: Update Supabase Magic Link Redirect URL

Back in Supabase:

1. Go to **Authentication** → **URL Configuration**
2. Find "Redirect URLs"
3. Add your production domain:
   ```
   https://your-domain.vercel.app/auth/callback
   https://your-domain.vercel.app
   ```
4. Click "Save"

---

## Part 4: Production Testing (5 minutes)

Visit your production URL (e.g., `https://consulting-os.vercel.app`)

### Test Checklist:

- [ ] Calculator page loads
- [ ] Can fill out calculator form
- [ ] Metric calculators work (margin, CAC, LTV)
- [ ] Diagnosis generates successfully
- [ ] Click "Sign In to Save"
- [ ] Receive magic link email
- [ ] Click link and get redirected to app
- [ ] Can save diagnosis
- [ ] Dashboard shows saved diagnosis
- [ ] Sign out works
- [ ] Sign back in - diagnosis still there
- [ ] Analytics tracking works (check Vercel Analytics)

If all pass → You're live! 🚀

---

## Part 5: Monitoring & Maintenance

### Daily Checks

- Vercel deployment status: https://vercel.com/dashboard
- Supabase database: Check for errors in logs

### Weekly Backups

Supabase auto-backups, but you can:

1. Go to Supabase → **Settings** → **Backups**
2. Download backup manually if needed

### Scaling

Free tier limits:
- **Auth**: 50,000 monthly active users
- **Database**: 500MB storage, unlimited API calls
- **Bandwidth**: Depends on Vercel

When you hit limits:
1. Supabase auto-upgrades with pay-as-you-go
2. Vercel charges based on usage

---

## Troubleshooting

### Issue: Magic link email not received

**Solution:**
- Check spam folder
- Verify email in Supabase Settings → Email templates
- Check Supabase logs: Authentication → Logs

### Issue: "Invalid API key" error

**Solution:**
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is the right one (anon, not service role)
- Make sure .env.local loaded (restart `npm run dev`)

### Issue: Diagnosis not saving

**Solution:**
- Check browser console for errors (F12)
- Verify user is logged in (check `/dashboard`)
- Check Supabase → SQL Editor → `SELECT * FROM diagnoses;`
- Check RLS policies: Authentication → Policies

### Issue: "Database connection failed"

**Solution:**
- Verify Supabase project is running
- Check NEXT_PUBLIC_SUPABASE_URL is correct
- Verify internet connection
- Check Supabase status page: https://status.supabase.com

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore` and never committed
- [ ] Vercel environment variables set (not in code)
- [ ] Row-Level Security enabled in Supabase
- [ ] Service Role Key kept secure (never expose in frontend)
- [ ] HTTPS enforced (Vercel/Supabase default)
- [ ] Database backups enabled (Supabase default)
- [ ] Magic link expiration set (24 hours default)

---

## Cost Analysis

| Service | Free Tier | Monthly Cost at Scale |
|---------|-----------|---------------------|
| Supabase Auth | 50k MAU | $0.01/additional user |
| Supabase DB | 500MB | $5/100GB over limit |
| Vercel Hosting | 100GB bandwidth | $0.15/GB over limit |
| Domain | - | ~$10-15/year |
| **Total** | **$0** | Scales with usage |

With 1,000 users: ~$5-10/month
With 10,000 users: ~$20-50/month

---

## Next Steps

1. **Set up custom domain** (optional):
   - Buy domain from GoDaddy, Namecheap, etc.
   - Update DNS to point to Vercel
   - Update `NEXT_PUBLIC_SITE_URL` in Vercel

2. **Customize email templates** (optional):
   - Supabase → Authentication → Email templates
   - Add company branding to magic link emails

3. **Add analytics tracking** (already done via Phase B+C):
   - View events in Vercel Analytics
   - Track calculator usage, diagnosis saves, etc.

4. **Set up monitoring** (optional):
   - Email alerts on errors
   - Dashboard for key metrics

---

## Support

- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Vercel docs: https://vercel.com/docs

Happy deploying! 🎉
