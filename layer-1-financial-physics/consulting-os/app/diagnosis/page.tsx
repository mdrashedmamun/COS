'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConstraintCard } from '@/components/ui/ConstraintCard'
import { DiagnosisCardSkeleton } from '@/components/ui/SkeletonLoader'
import { diagnoseConstraintWithAnalysis, DiagnosisInput, ConstraintType, EnhancedConstraintDiagnosis, getConstraintDetails } from '@/lib/utils/constraint-diagnosis'
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

const constraintDescriptions: Record<ConstraintType, { title: string; emoji: string }> = {
  demand: { title: 'Demand', emoji: '📈' },
  delivery: { title: 'Delivery', emoji: '⚙️' },
  efficiency: { title: 'Efficiency', emoji: '📊' },
  quality: { title: 'Quality', emoji: '⭐' },
  capital: { title: 'Capital', emoji: '💰' },
  retention: { title: 'Retention', emoji: '🔄' },
  pricing: { title: 'Pricing', emoji: '💎' },
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [state, setState] = useState<DiagnosisState>('loading')
  const [input, setInput] = useState<DiagnosisInput | null>(null)
  const [diagnosis, setDiagnosis] = useState<EnhancedConstraintDiagnosis | null>(null)
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
        const result = diagnoseConstraintWithAnalysis(parsedInput)
        setDiagnosis(result)
        setState('revealing')

        // Track diagnosis viewing
        analyticsRef.current.track('diagnosis_viewed', {
          constraint: result.primaryConstraint,
          confidence: result.confidence,
          metaAnalysis: true,
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
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-warm-900 mb-2">Oops!</h2>
            <p className="text-warm-600 mb-6 text-sm">{error}</p>
            <p className="text-xs text-warm-500 mb-6">
              {error.includes('No input data') ? 'Your session may have expired.' : 'Please try again or contact support if this persists.'}
            </p>
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
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-semibold text-warm-900 mb-2">
              Analyzing your business...
            </h1>
            <p className="text-warm-600 text-sm">This takes just a moment</p>
          </div>

          <div className="mb-8">
            <DiagnosisCardSkeleton />
          </div>

          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-sage-400"
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-warm-500">
            <p>✓ Analyzing your metrics</p>
            <p>✓ Identifying constraints</p>
            <p>✓ Building your roadmap</p>
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

        {/* Positioning Context (if provided) */}
        {diagnosis.positioningContext && (
          <div
            className={`mb-12 transition-all duration-700 delay-150 ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-6 border-l-4 border-sage-400">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-semibold text-warm-900">Your Positioning Context</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {diagnosis.positioningContext.customerType && (
                  <div>
                    <p className="text-warm-600 mb-1 font-medium">Target Customer</p>
                    <p className="text-warm-900">
                      {diagnosis.positioningContext.customerType === 'b2b_smb' && '🏢 Small Businesses'}
                      {diagnosis.positioningContext.customerType === 'b2b_enterprise' && '🏛️ Enterprise'}
                      {diagnosis.positioningContext.customerType === 'b2c_mass' && '👥 Mass Consumer'}
                      {diagnosis.positioningContext.customerType === 'b2c_affluent' && '💎 Affluent'}
                      {diagnosis.positioningContext.customerType === 'b2c_niche' && '🎯 Niche'}
                    </p>
                  </div>
                )}
                {diagnosis.positioningContext.customerTrigger && (
                  <div>
                    <p className="text-warm-600 mb-1 font-medium">Buying Trigger</p>
                    <p className="text-warm-900">
                      {diagnosis.positioningContext.customerTrigger === 'life_event' && '🎯 Life Event'}
                      {diagnosis.positioningContext.customerTrigger === 'urgent_problem' && '🚨 Urgent Problem'}
                      {diagnosis.positioningContext.customerTrigger === 'planned_purchase' && '📅 Planned'}
                      {diagnosis.positioningContext.customerTrigger === 'ongoing_pain' && '💢 Ongoing Pain'}
                      {diagnosis.positioningContext.customerTrigger === 'aspiration' && '✨ Aspiration'}
                    </p>
                  </div>
                )}
                {diagnosis.positioningContext.acquisitionChannel && (
                  <div>
                    <p className="text-warm-600 mb-1 font-medium">Main Channel</p>
                    <p className="text-warm-900">
                      {diagnosis.positioningContext.acquisitionChannel === 'referrals' && '🤝 Referrals'}
                      {diagnosis.positioningContext.acquisitionChannel === 'paid_ads' && '💰 Paid Ads'}
                      {diagnosis.positioningContext.acquisitionChannel === 'organic' && '🌱 Organic'}
                      {diagnosis.positioningContext.acquisitionChannel === 'partnerships' && '🔗 Partnerships'}
                      {diagnosis.positioningContext.acquisitionChannel === 'outbound' && '📞 Outbound'}
                      {diagnosis.positioningContext.acquisitionChannel === 'local' && '📍 Local'}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

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

        {/* Root Cause Analysis */}
        {diagnosis.metaAnalysis && (
          <div
            className={`mb-12 transition-all duration-700 delay-300 ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-8 border-l-4 border-warm-400">
              <h3 className="font-semibold text-warm-900 mb-3 text-lg">🎯 What's Really Happening</h3>
              <p className="text-warm-800 leading-relaxed">
                {diagnosis.metaAnalysis.rootCause}
              </p>
            </Card>
          </div>
        )}

        {/* Cascading Effects */}
        {diagnosis.metaAnalysis?.cascadingEffects && (
          <div
            className={`mb-12 transition-all duration-700 delay-[400ms] ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-8">
              <h3 className="font-semibold text-warm-900 mb-4 text-lg">🔗 How This Affects Everything</h3>
              <div className="space-y-3">
                {diagnosis.metaAnalysis.cascadingEffects.map((effect: string, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <div className="text-warm-400 font-bold mt-0.5 flex-shrink-0">✗</div>
                    <p className="text-warm-800">{effect}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Confidence & Alternatives */}
        {diagnosis.alternativeConstraints && diagnosis.alternativeConstraints.length > 0 && (
          <div
            className={`mb-12 transition-all duration-700 delay-[500ms] ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-8">
              <h3 className="font-semibold text-warm-900 mb-4 text-lg">📊 Diagnosis Confidence</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-warm-700">Confidence Level</p>
                  <p className="text-lg font-bold text-warm-900">{diagnosis.confidence.toFixed(0)}%</p>
                </div>
                <div className="w-full bg-warm-200 rounded-full h-2">
                  <div
                    className="bg-sage-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${diagnosis.confidence}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-warm-700 mb-3">Alternative possibilities:</p>
                {diagnosis.alternativeConstraints.map((alt, idx) => (
                  <div key={idx} className="text-sm p-3 bg-warm-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-warm-900">{idx + 1}. {constraintDescriptions[alt.constraint as ConstraintType]?.title || alt.constraint}</p>
                      <p className="text-warm-600">{alt.probability}%</p>
                    </div>
                    <p className="text-warm-700 text-xs">{alt.reasoning}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* What Success Looks Like */}
        {diagnosis.metaAnalysis?.successMetrics && (
          <div
            className={`mb-12 transition-all duration-700 delay-[600ms] ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card variant="subtle" className="p-8">
              <h3 className="font-semibold text-warm-900 mb-6 text-lg">🎯 If You Fix This</h3>
              <div className="space-y-4">
                {diagnosis.metaAnalysis.successMetrics.slice(0, 3).map((metric, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-warm-200 last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sm font-bold text-sage-600">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-warm-900 mb-1">{metric.metric}</p>
                      <div className="flex justify-between text-sm mb-2">
                        <p className="text-warm-600">Current: <span className="font-semibold text-warm-900">{metric.current}</span></p>
                        <p className="text-warm-600">Target: <span className="font-semibold text-sage-600">{metric.target}</span></p>
                      </div>
                      <p className="text-xs text-warm-500">Timeframe: {metric.timeframe}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-warm-700 mt-6 pt-6 border-t border-warm-200">
                <strong>Potential impact:</strong> {diagnosis.metaAnalysis.potentialRevenueLift}
              </p>
            </Card>
          </div>
        )}

        {/* Next Steps */}
        {diagnosis.nextSteps && (
          <div
            className={`mb-12 transition-all duration-700 delay-[700ms] ${
              state === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Card className="p-8 bg-sage-50">
              <h3 className="font-semibold text-warm-900 mb-6 text-lg">📋 Your 90-Day Roadmap</h3>
              <div className="space-y-3">
                {diagnosis.nextSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-600 flex items-center justify-center text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <p className="text-warm-800 leading-relaxed flex-1 mt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

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
