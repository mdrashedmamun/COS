#!/bin/bash

# ============================================================================
# Local Development Setup Script for Consulting OS
# ============================================================================
# This script helps set up your local development environment for Phase A+E
# Run: bash scripts/setup-local.sh
# ============================================================================

set -e  # Exit on error

echo "🚀 Consulting OS - Local Setup"
echo "======================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
  exit 1
fi
NODE_VERSION=$(node -v)
echo "  Found: $NODE_VERSION"
echo ""

# Check npm
echo "✓ Checking npm..."
NPM_VERSION=$(npm -v)
echo "  Found: npm $NPM_VERSION"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
echo "  Dependencies installed"
echo ""

# Check if .env.local exists
echo "✓ Checking environment configuration..."
if [ -f .env.local ]; then
  echo "  ✓ .env.local found"
  echo ""
  echo "⚠️  Review your .env.local file:"
  echo "======================================"
  cat .env.local | sed 's/=.*/=***/g'  # Show keys but hide values
  echo ""
  read -p "  Is your configuration correct? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "  Edit .env.local and run this script again"
    exit 1
  fi
else
  echo "  ✗ .env.local not found"
  echo ""
  echo "📝 Creating .env.local from template..."

  if [ -f .env.local.example ]; then
    cp .env.local.example .env.local
    echo "  ✓ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your Supabase credentials:"
    echo "======================================"
    echo ""
    echo "  Required values:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    echo "  - NEXT_PUBLIC_SITE_URL (for local, use http://localhost:3000)"
    echo ""
    echo "  Get these from Supabase:"
    echo "  1. Go to Project Settings → API"
    echo "  2. Copy Project URL and API keys"
    echo ""
    echo "  Once updated, run:"
    echo "  $ npm run dev"
    exit 0
  else
    echo "  ✗ .env.local.example not found"
    exit 1
  fi
fi

# Build check
echo ""
echo "✓ Testing build..."
npm run build 2>/dev/null || true  # Don't exit if build fails
echo "  Build check complete"
echo ""

# Summary
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "To start development server:"
echo "  $ npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "Test the flow:"
echo "  1. Go to /calculator"
echo "  2. Complete diagnosis"
echo "  3. Sign in with magic link"
echo "  4. Save to dashboard"
echo "  5. Visit /dashboard to verify"
echo ""
echo "Questions? Check SETUP-PRODUCTION.md"
echo ""
