'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { signInWithMagicLink } from '@/lib/supabase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await signInWithMagicLink(email)
    setLoading(false)

    if (authError) {
      setError(authError.message || 'Failed to send magic link')
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
        <Card className="max-w-md text-center p-8">
          <div className="mb-6">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-serif font-semibold text-warm-900">
              Check your email
            </h2>
          </div>
          <p className="text-warm-600 mb-6">
            We sent a magic link to <span className="font-medium">{email}</span>. Click the link to sign in.
          </p>
          <p className="text-sm text-warm-500 mb-6">
            The link will expire in 24 hours.
          </p>
          <Button variant="secondary" onClick={() => setSent(false)} className="w-full">
            Send another link
          </Button>
          <div className="mt-4">
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Back to home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
      <Card className="max-w-md w-full p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-semibold text-warm-900 mb-2">
            Sign in
          </h1>
          <p className="text-warm-600">
            Enter your email to receive a magic link. No password needed.
          </p>
        </div>

        <form onSubmit={handleMagicLink} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            error={error}
          />

          <Button
            variant="primary"
            type="submit"
            isLoading={loading}
            disabled={!email || loading}
            className="w-full"
          >
            Send Magic Link
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-warm-200 text-center text-sm text-warm-600">
          <p>Don't have an account? You'll create one automatically when you sign in.</p>
        </div>

        <div className="mt-4">
          <Link href="/">
            <Button variant="ghost" className="w-full">
              ← Back to home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
