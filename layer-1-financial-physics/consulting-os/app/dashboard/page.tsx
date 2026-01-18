'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getUser, signOut } from '@/lib/supabase/auth'
import type { Diagnosis } from '@/lib/supabase/types'

export default function DashboardPage() {
  const router = useRouter()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const currentUser = await getUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      const response = await fetch('/api/diagnoses')
      const data = await response.json()
      setDiagnoses(data.diagnoses || [])
      setLoading(false)
    }
    loadData()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
        <div className="text-center">
          <div className="animate-spin inline-block">
            <div className="w-8 h-8 border-4 border-sage-200 border-t-sage-600 rounded-full"></div>
          </div>
          <p className="mt-4 text-warm-600">Loading your diagnoses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-warm-900 mb-2">
              Your Diagnoses
            </h1>
            <p className="text-warm-600">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/calculator">
              <Button variant="primary">
                New Diagnosis
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Diagnoses List */}
        {diagnoses.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-warm-600 text-lg mb-6">No diagnoses yet</p>
            <p className="text-warm-500 mb-6">
              Complete the calculator to get your first business diagnosis and start tracking your progress.
            </p>
            <Link href="/calculator">
              <Button variant="primary" size="lg">
                Create Your First Diagnosis
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {diagnoses.map((diagnosis) => (
              <Card
                key={diagnosis.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/diagnosis?id=${diagnosis.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-warm-900 mb-2 capitalize">
                      {diagnosis.primary_constraint} Constraint
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-warm-600 mb-1">Revenue</p>
                        <p className="font-semibold text-warm-900">
                          ${(diagnosis.revenue / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-warm-600 mb-1">Margin</p>
                        <p className="font-semibold text-warm-900">
                          {(diagnosis.margin * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-warm-600 mb-1">CAC</p>
                        <p className="font-semibold text-warm-900">
                          ${diagnosis.cac.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-warm-600 mb-1">LTV</p>
                        <p className="font-semibold text-warm-900">
                          ${diagnosis.ltv.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-warm-500">
                      {new Date(diagnosis.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="ml-4">
                    <Button variant="ghost" size="sm">
                      View Details →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-warm-200 text-center">
          <p className="text-warm-600 mb-4">Track your business progress over time</p>
          <Link href="/calculator">
            <Button variant="primary">
              Run Another Diagnosis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
