'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { SelectCard } from '@/components/ui/SelectCard'
import { MetricCalculator } from '@/components/ui/MetricCalculator'
import { DiagnosisInput } from '@/lib/utils/constraint-diagnosis'
import { getAnalytics } from '@/lib/utils/analytics'

type Step = 'vertical' | 'positioning' | 'revenue' | 'margin' | 'cac' | 'painpoint'

const STEPS: { id: Step; label: string; optional?: boolean }[] = [
  { id: 'vertical', label: 'Your Business' },
  { id: 'positioning', label: 'Your Customers', optional: true },
  { id: 'revenue', label: 'Revenue' },
  { id: 'margin', label: 'Margins' },
  { id: 'cac', label: 'CAC' },
  { id: 'painpoint', label: 'Your Challenge' },
]

const VERTICALS = [
  { id: 'styling', name: 'Personal Styling', emoji: '👗' },
  { id: 'restaurant', name: 'Restaurant & Hospitality', emoji: '🍽️' },
  { id: 'beauty', name: 'Beauty Services', emoji: '💅' },
  { id: 'fitness', name: 'Health & Fitness', emoji: '💪' },
  { id: 'legal', name: 'Professional Services', emoji: '⚖️' },
  { id: 'waste', name: 'Waste Management', emoji: '♻️' },
  { id: 'retail', name: 'Hybrid Retail', emoji: '🏪' },
  { id: 'beverage', name: 'Beverage', emoji: '🍷' },
]

const PAIN_POINTS = [
  { id: 'cant_get_leads', emoji: '💸', title: "Can't get enough customers" },
  { id: 'cant_fulfill', emoji: '⚙️', title: "Can't keep up with demand" },
  { id: 'low_margins', emoji: '📉', title: 'Margins are too thin' },
  { id: 'customer_churn', emoji: '🚪', title: "Customers don't stick around" },
  { id: 'cash_flow', emoji: '💰', title: 'Cash flow is tight' },
  { id: 'service_quality', emoji: '⭐', title: 'Quality is inconsistent' },
]

// Positioning context questions - 3 core questions based on Alex Hormozi's framework
const CUSTOMER_TYPES = [
  {
    id: 'b2b_smb',
    emoji: '🏢',
    title: 'Small Businesses',
    description: 'Local businesses, startups, < 50 employees'
  },
  {
    id: 'b2b_enterprise',
    emoji: '🏛️',
    title: 'Enterprise/Corporate',
    description: 'Large companies, complex sales, > 500 employees'
  },
  {
    id: 'b2c_mass',
    emoji: '👥',
    title: 'Mass Consumer',
    description: 'General public, broad appeal, high volume'
  },
  {
    id: 'b2c_affluent',
    emoji: '💎',
    title: 'Affluent Consumers',
    description: 'High-income individuals, premium pricing'
  },
  {
    id: 'b2c_niche',
    emoji: '🎯',
    title: 'Niche Community',
    description: 'Specific demographic, shared interest/identity'
  },
]

const CUSTOMER_TRIGGERS = [
  {
    id: 'life_event',
    emoji: '🎯',
    title: 'Major life event',
    description: 'New job, move, baby, marriage, divorce - significant change'
  },
  {
    id: 'urgent_problem',
    emoji: '🚨',
    title: 'Urgent problem / Emergency',
    description: 'Something broke, deadline approaching, immediate need'
  },
  {
    id: 'planned_purchase',
    emoji: '📅',
    title: 'Planned / Seasonal purchase',
    description: 'Anticipated need, scheduled event, recurring cycle'
  },
  {
    id: 'ongoing_pain',
    emoji: '💢',
    title: 'Ongoing pain finally unbearable',
    description: 'Problem existed for a while, finally hit breaking point'
  },
  {
    id: 'aspiration',
    emoji: '✨',
    title: 'Aspiration / Status / Transformation',
    description: 'Want to improve image, achieve goal, transform identity'
  },
]

const ACQUISITION_CHANNELS = [
  {
    id: 'referrals',
    emoji: '🤝',
    title: 'Referrals / Word of mouth',
    description: 'Existing customers send you new business'
  },
  {
    id: 'paid_ads',
    emoji: '💰',
    title: 'Paid advertising',
    description: 'Google Ads, Facebook, Instagram, etc.'
  },
  {
    id: 'organic',
    emoji: '🌱',
    title: 'Organic / SEO / Content',
    description: 'Google search, blog, social media posts'
  },
  {
    id: 'partnerships',
    emoji: '🔗',
    title: 'Partnerships / Affiliates',
    description: 'Other businesses refer you for commission/fee'
  },
  {
    id: 'outbound',
    emoji: '📞',
    title: 'Outbound sales / Cold outreach',
    description: 'You reach out to prospects directly'
  },
  {
    id: 'local',
    emoji: '📍',
    title: 'Walk-ins / Local presence',
    description: 'Physical location, foot traffic, local reputation'
  },
]

export default function CalculatorPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('vertical')
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const analyticsRef = useRef(getAnalytics())

  // Track form start
  useEffect(() => {
    analyticsRef.current.track('form_started')
  }, [])

  const [formData, setFormData] = useState<Partial<DiagnosisInput>>({
    revenue: 500000,
    margin: 0.2,
    cac: 150,
    ltv: 1500,
    painPoint: '',
    vertical: '',
    // Positioning fields
    customerType: undefined,
    customerTrigger: undefined,
    acquisitionChannel: undefined,
  })

  // Smooth transitions between steps
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [currentStep])

  const handleNext = () => {
    const stepIndex = STEPS.findIndex(s => s.id === currentStep)
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1].id as Step)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    const stepIndex = STEPS.findIndex(s => s.id === currentStep)
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1].id as Step)
    }
  }

  const handleSubmit = () => {
    // Save form data to session storage for diagnosis page
    if (formData.painPoint) {
      sessionStorage.setItem('diagnosisInput', JSON.stringify(formData))
      sessionStorage.setItem('selectedVertical', formData.vertical || 'styling')

      // Track form completion
      analyticsRef.current.track('form_completed', {
        revenue: formData.revenue,
        margin: formData.margin,
        cac: formData.cac,
        ltv: formData.ltv,
        painPoint: formData.painPoint,
        vertical: formData.vertical,
        // Track positioning context
        hasPositioningContext: !!(formData.customerType && formData.customerTrigger && formData.acquisitionChannel),
        customerType: formData.customerType,
        customerTrigger: formData.customerTrigger,
        acquisitionChannel: formData.acquisitionChannel,
      })

      router.push('/diagnosis')
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'vertical':
        return !!formData.vertical
      case 'positioning':
        // Positioning is optional - can always proceed
        return true
      case 'revenue':
        return formData.revenue && formData.revenue > 0
      case 'margin':
        return formData.margin !== undefined && formData.margin >= -1 && formData.margin <= 1
      case 'cac':
        return formData.cac && formData.cac > 0
      case 'painpoint':
        return !!formData.painPoint
      default:
        return false
    }
  }

  const isCompleted = (step: Step) => STEPS.findIndex(s => s.id === step) < STEPS.findIndex(s => s.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
      {/* Header */}
      <div className="bg-white border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-semibold text-warm-900 mb-2">
              Let's figure out what's holding your business back
            </h1>
            <p className="text-warm-600">
              This takes 2 minutes. No wrong answers—just honest estimates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <StepIndicator
          steps={STEPS.map(s => ({
            id: s.id,
            label: s.label,
            completed: isCompleted(s.id),
          }))}
          currentStep={currentStep}
        />

        {/* Step Content */}
        <Card variant="default" className="mb-8">
          <div className="p-8">
            <div
              ref={contentRef}
              className={`transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            >
              {/* Step 1: Vertical Selection */}
              {currentStep === 'vertical' && (
                <div>
                  <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                    What type of business are you?
                  </h2>
                  <p className="text-warm-600 mb-6">
                    Select the one that best matches your business model
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {VERTICALS.map(vertical => (
                      <SelectCard
                        key={vertical.id}
                        emoji={vertical.emoji}
                        title={vertical.name}
                        selected={formData.vertical === vertical.id}
                        onClick={() => setFormData({ ...formData, vertical: vertical.id })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1.5: Positioning (Optional) */}
              {currentStep === 'positioning' && (
                <div>
                  <div className="mb-6 p-4 bg-gradient-to-r from-sage-50 to-warm-50 border-l-4 border-warm-400 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <h3 className="font-semibold text-warm-900 mb-1">
                          Want a more accurate diagnosis?
                        </h3>
                        <p className="text-sm text-warm-700 mb-3">
                          Answer 3 quick questions about your customer. Makes results 3x more specific to you.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-warm-600">
                          <span>⏱️ Takes 90 seconds</span>
                          <span>🎯 Much more personalized insights</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question 1: Customer Type */}
                  <div className="mb-8">
                    <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                      Who is your ideal customer?
                    </h2>
                    <p className="text-warm-600 mb-4 text-sm">
                      Who gets the most value from your service?
                    </p>
                    <div className="space-y-2">
                      {CUSTOMER_TYPES.map(type => (
                        <SelectCard
                          key={type.id}
                          emoji={type.emoji}
                          title={type.title}
                          description={type.description}
                          selected={formData.customerType === type.id}
                          onClick={() => setFormData({ ...formData, customerType: type.id as DiagnosisInput['customerType'] })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question 2: Trigger - When do they buy? */}
                  <div className="mb-8">
                    <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                      When do they decide to buy from you?
                    </h2>
                    <p className="text-warm-600 mb-4 text-sm">
                      What moment or situation causes them to seek you out?
                    </p>
                    <div className="space-y-2">
                      {CUSTOMER_TRIGGERS.map(trigger => (
                        <SelectCard
                          key={trigger.id}
                          emoji={trigger.emoji}
                          title={trigger.title}
                          description={trigger.description}
                          selected={formData.customerTrigger === trigger.id}
                          onClick={() => setFormData({ ...formData, customerTrigger: trigger.id as DiagnosisInput['customerTrigger'] })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question 3: Channel - Where do customers come from? */}
                  <div className="mb-8">
                    <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                      Where do most of your customers come from?
                    </h2>
                    <p className="text-warm-600 mb-4 text-sm">
                      What's your primary customer acquisition channel?
                    </p>
                    <div className="space-y-2">
                      {ACQUISITION_CHANNELS.map(channel => (
                        <SelectCard
                          key={channel.id}
                          emoji={channel.emoji}
                          title={channel.title}
                          description={channel.description}
                          selected={formData.acquisitionChannel === channel.id}
                          onClick={() => setFormData({ ...formData, acquisitionChannel: channel.id as DiagnosisInput['acquisitionChannel'] })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Skip Option */}
                  <div className="mt-8 p-4 bg-warm-50 border border-warm-200 rounded-lg text-center">
                    <p className="text-sm text-warm-700 mb-3">
                      Don't have time right now?
                    </p>
                    <p className="text-xs text-warm-600">
                      (You can still proceed to the basic diagnosis—skip positioning if you want to move faster)
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Revenue */}
              {currentStep === 'revenue' && (
                <div>
                  <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                    What's your annual revenue?
                  </h2>
                  <p className="text-warm-600 mb-6">
                    Rough estimate is fine—we're looking for patterns, not precision
                  </p>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      label="Annual Revenue"
                      value={formData.revenue || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          revenue: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="e.g., 500000"
                      helper="$"
                    />
                    <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 text-sm text-warm-700">
                      <p className="font-medium mb-2">What to include:</p>
                      <ul className="space-y-1 text-xs">
                        <li>✓ Total income from services/products sold</li>
                        <li>✓ Don't subtract costs yet</li>
                        <li>✓ Include repeat customer revenue</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Margin */}
              {currentStep === 'margin' && (
                <div>
                  <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                    What's your net profit margin?
                  </h2>
                  <p className="text-warm-600 mb-6">
                    After all costs (labor, materials, overhead), what % stays with you?
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-end gap-4 mb-4">
                        <div className="flex-1">
                          <Input
                            type="number"
                            label="Net Profit Margin"
                            value={formData.margin ? (formData.margin * 100).toFixed(1) : ''}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                margin: (parseInt(e.target.value) || 0) / 100,
                              })
                            }
                            placeholder="e.g., 20"
                            helper="Enter as %"
                          />
                        </div>
                        <div className="text-2xl font-serif text-sage-600">
                          {formData.margin ? `${(formData.margin * 100).toFixed(0)}%` : '—'}
                        </div>
                      </div>

                      <MetricCalculator
                        metricType="margin"
                        revenue={formData.revenue}
                        onCalculate={(value) => setFormData({ ...formData, margin: value })}
                        onTrack={(event, data) => analyticsRef.current.track(event, data)}
                      />
                    </div>

                    <div className="bg-warm-50 border border-warm-200 rounded-lg p-4">
                      <p className="text-xs font-medium text-warm-700 mb-3">Industry benchmarks:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="p-2 bg-white rounded border border-warm-100">
                          <p className="text-warm-600">Thin</p>
                          <p className="font-medium text-warm-900">0-10%</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-warm-100">
                          <p className="text-warm-600">Healthy</p>
                          <p className="font-medium text-warm-900">15-30%</p>
                        </div>
                        <div className="p-2 bg-white rounded border border-warm-100">
                          <p className="text-warm-600">Strong</p>
                          <p className="font-medium text-warm-900">30%+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: CAC */}
              {currentStep === 'cac' && (
                <div>
                  <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                    What does it cost to get one customer?
                  </h2>
                  <p className="text-warm-600 mb-6">
                    This is your customer acquisition cost (CAC)
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="number"
                        label="Customer Acquisition Cost (CAC)"
                        value={formData.cac || ''}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            cac: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="e.g., 150"
                        helper="Include marketing, sales time, and onboarding"
                      />

                      <MetricCalculator
                        metricType="cac"
                        onCalculate={(value) => setFormData({ ...formData, cac: value })}
                        onTrack={(event, data) => analyticsRef.current.track(event, data)}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Customer Lifetime Value (LTV)"
                        value={formData.ltv || ''}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            ltv: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="e.g., 1500"
                        helper="Total profit from one customer over their lifetime"
                      />

                      <MetricCalculator
                        metricType="ltv"
                        revenue={formData.revenue}
                        margin={formData.margin}
                        onCalculate={(value) => setFormData({ ...formData, ltv: value })}
                        onTrack={(event, data) => analyticsRef.current.track(event, data)}
                      />
                    </div>
                    <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 text-sm text-warm-700">
                      <p className="font-medium mb-2">Quick math:</p>
                      <div className="text-xs space-y-1">
                        <p>
                          If you spend ${formData.cac?.toLocaleString()} to acquire,{' '}
                          {formData.ltv && formData.cac
                            ? `you make ${(formData.ltv / formData.cac).toFixed(1)}x that value`
                            : 'fill in CAC and LTV to see ratio'}
                        </p>
                        <p className="mt-2 text-sage-700 font-medium">Healthy ratio: 3x or higher</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Pain Point */}
              {currentStep === 'painpoint' && (
                <div>
                  <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                    What keeps you up at night?
                  </h2>
                  <p className="text-warm-600 mb-6">
                    What's the biggest constraint holding your business back?
                  </p>
                  <div className="space-y-3">
                    {PAIN_POINTS.map(pain => (
                      <SelectCard
                        key={pain.id}
                        emoji={pain.emoji}
                        title={pain.title}
                        selected={formData.painPoint === pain.id}
                        onClick={() => setFormData({ ...formData, painPoint: pain.id })}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentStep === 'vertical'}
          >
            ← Back
          </Button>
          <div className="flex gap-3">
            <span className="text-sm text-warm-600 py-2">
              Step {STEPS.findIndex(s => s.id === currentStep) + 1} of {STEPS.length}
            </span>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 'painpoint' ? 'Analyze My Business' : 'Next →'}
            </Button>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-8 text-center text-xs text-warm-600">
          <p>All estimates are private and not stored. Ready to move forward? Click "Next" to continue.</p>
        </div>
      </div>
    </div>
  )
}
