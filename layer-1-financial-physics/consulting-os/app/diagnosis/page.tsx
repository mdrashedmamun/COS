'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConstraintCard } from '@/components/ui/ConstraintCard'
import { diagnoseConstraint, DiagnosisInput, ConstraintType, getConstraintDetails } from '@/lib/utils/constraint-diagnosis'
import { getAnalytics } from '@/lib/utils/analytics'

type DiagnosisState = 'loading' | 'revealing' | 'complete'

const constraintColors: Record<ConstraintType, { bg: string; text: string; accent: string }> = {
  demand: { bg: 'demand-50', text: 'demand-900', accent: 'demand-600' },
  delivery: { bg: 'delivery-50', text: 'delivery-900', accent: 'delivery-600' },
  efficiency: { bg: 'efficiency-50', text: 'efficiency-900', accent: 'efficiency-600' },
  quality: { bg: 'quality-50', text: 'quality-900', accent: 'quality-600' },
  capital: { bg: 'capital-50', text: 'capital-900', accent: 'capital-600' },
  retention: { bg: 'retention-50', text: 'retention-900', accent: 'retention-600' },
  pricing: { bg: 'pricing-50', text: 'pricing-900', accent: 'pricing-600' },
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [state, setState] = useState<DiagnosisState>('loading')
  const [input, setInput] = useState<DiagnosisInput | null>(null)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const analyticsRef = useRef(getAnalytics())

  useEffect(() => {
    // Load from session storage
    const stored = sessionStorage.getItem('diagnosisInput')
    if (!stored) {
      setError('No input data found. Redirecting to calculator...')
      setTimeout(() => router.push('/calculator'), 2000)
      return
    }

    try {
      const parsedInput = JSON.parse(stored) as DiagnosisInput
      setInput(parsedInput)

      // Simulate analysis delay for dramatic effect
      setTimeout(() => {
        const result = diagnoseConstraint(parsedInput)
        setDiagnosis(result)
        setState('revealing')

        // Track diagnosis viewing
        analyticsRef.current.track('diagnosis_viewed', {
          constraint: result.primaryConstraint,
          confidence: result.confidence,
        })

        // Transition to complete state after reveal animation
        setTimeout(() => setState('complete'), 800)
      }, 1500)
    } catch (e) {
      setError('Error processing input. Please try again.')
      setTimeout(() => router.push('/calculator'), 2000)
    }
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100 flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <div className="p-8">
            <p className="text-warm-600 mb-4">{error}</p>
            <Link href="/calculator">
              <Button variant="primary">Start Over</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  if (state === 'loading' || !diagnosis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="animate-pulse-gentle">
            <h2 className="text-3xl font-serif font-semibold text-warm-900 mb-2">
              Analyzing your business...
            </h2>
            <p className="text-warm-600">This takes just a moment</p>
          </div>

          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-sage-400"
                style={{
                  animation: `pulse-gentle 1.5s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const colors = constraintColors[diagnosis.primaryConstraint]
  const details = getConstraintDetails(diagnosis.primaryConstraint)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
      {/* Animated Reveal Background */}
      <div
        className={`fixed inset-0 transition-opacity duration-700 ${
          state === 'revealing' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: `linear-gradient(135deg, var(--tw-${colors.bg}), transparent)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-semibold text-warm-900 mb-4">
            Here's what we discovered
          </h1>
          <p className="text-lg text-warm-600">
            Based on your metrics and challenge, here's your primary constraint:
          </p>
        </div>

        {/* Main Constraint Card - Animated Reveal */}
        <div
          className={`mb-12 transition-all duration-700 ${
            state === 'complete' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          <Card variant="elevated" className="overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <div className={`text-6xl mb-6 animate-pulse-gentle inline-block`}>
                {details.emoji}
              </div>

              <h2 className="text-4xl font-serif font-semibold text-warm-900 mb-2">
                {details.title} Constraint
              </h2>

              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-sage-400 to-transparent mx-auto mb-8" />

              <p className="text-xs font-medium text-sage-600 mb-6">
                CONFIDENCE: {diagnosis.confidence.toFixed(0)}%
              </p>
            </div>
          </Card>
        </div>

        {/* Explanation */}
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${
            state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Card className="p-8">
            <div className="prose prose-sm max-w-none">
              <div className="text-base text-warm-800 leading-relaxed">
                {diagnosis.explanation.split('\n\n').map((para: string, idx: number) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {para.split('**').map((text: string, i: number) =>
                      i % 2 === 0 ? text : <strong key={i}>{text}</strong>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Reasoning */}
        {diagnosis.reasoning.length > 0 && (
          <div
            className={`mb-12 transition-all duration-700 delay-300 ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-6">
              <h3 className="font-medium text-warm-900 mb-4">Why this constraint?</h3>
              <ul className="space-y-2">
                {diagnosis.reasoning.map((reason: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-warm-700">
                    <span className="text-sage-600 font-semibold mt-0.5">→</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`transition-all duration-700 delay-400 ${
            state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center space-y-4">
            <h3 className="text-xl font-serif font-semibold text-warm-900">
              Ready to fix this?
            </h3>
            <p className="text-warm-600 mb-6">
              See the specific playbook for your constraint with a 90-day roadmap.
            </p>

            <Link href={`/playbook/${diagnosis.primaryConstraint}`}>
              <Button variant="primary" size="lg" className="min-w-64">
                See Your Playbook →
              </Button>
            </Link>

            <div className="pt-4">
              <Link href="/calculator">
                <Button variant="secondary">Start Over</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Summary */}
        {state === 'complete' && (
          <div className="mt-12 pt-8 border-t border-warm-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg border border-warm-100">
                <p className="text-xs text-warm-600 mb-1">Revenue</p>
                <p className="font-semibold text-warm-900">
                  ${(diagnosis.metrics.revenue / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-warm-100">
                <p className="text-xs text-warm-600 mb-1">Margin</p>
                <p className="font-semibold text-warm-900">
                  {(diagnosis.metrics.margin * 100).toFixed(0)}%
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-warm-100">
                <p className="text-xs text-warm-600 mb-1">CAC</p>
                <p className="font-semibold text-warm-900">
                  ${diagnosis.metrics.cac.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-warm-100">
                <p className="text-xs text-warm-600 mb-1">LTV</p>
                <p className="font-semibold text-warm-900">
                  ${diagnosis.metrics.ltv.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
