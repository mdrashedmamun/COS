import type {
  ConstraintType,
  DiagnosisInput,
  EnhancedConstraintDiagnosis,
  AlternativeConstraint,
  MetaAnalysis,
} from '@/lib/schemas/diagnosis-schema'
import {
  constraintMetadata,
  rootCauseTemplates,
  cascadingEffectsTemplates,
  whatUnlocksTemplates,
  successMetricsTemplates,
} from '@/lib/schemas/diagnosis-schema'

// Legacy interface for backwards compatibility
export interface ConstraintDiagnosis {
  primaryConstraint: ConstraintType
  confidence: number // 0-100
  explanation: string
  reasoning: string[]
  metrics: {
    revenue: number
    margin: number
    cac: number
    ltv: number
    painPoint: string
  }
}

export type { DiagnosisInput, EnhancedConstraintDiagnosis, ConstraintType }

const constraintDescriptions: Record<ConstraintType, { title: string; emoji: string }> = {
  demand: { title: 'Demand', emoji: '📈' },
  delivery: { title: 'Delivery', emoji: '⚙️' },
  efficiency: { title: 'Efficiency', emoji: '📊' },
  quality: { title: 'Quality', emoji: '⭐' },
  capital: { title: 'Capital', emoji: '💰' },
  retention: { title: 'Retention', emoji: '🔄' },
  pricing: { title: 'Pricing', emoji: '💎' },
}

/**
 * Primary diagnosis based on pain point
 * Users directly tell us their main concern
 */
function diagnosisFromPainPoint(painPoint: string): {
  constraint: ConstraintType
  confidence: number
} | null {
  const painPointMap: Record<string, { constraint: ConstraintType; confidence: number }> = {
    'cant_get_leads': { constraint: 'demand', confidence: 95 },
    'cant_fulfill': { constraint: 'delivery', confidence: 95 },
    'low_margins': { constraint: 'efficiency', confidence: 90 },
    'customer_churn': { constraint: 'retention', confidence: 90 },
    'cash_flow': { constraint: 'capital', confidence: 85 },
    'pricing_power': { constraint: 'pricing', confidence: 85 },
    'service_quality': { constraint: 'quality', confidence: 85 },
  }

  for (const [key, value] of Object.entries(painPointMap)) {
    if (painPoint.toLowerCase().includes(key) || painPoint.toLowerCase().includes(value.constraint)) {
      return value
    }
  }

  return null
}

/**
 * Get vertical-specific benchmarks
 */
function getVerticalBenchmarks(vertical?: string): Record<string, any> {
  if (!vertical) return {}

  // Import benchmarks - in a real app this would be imported at the top
  const benchmarks: Record<string, any> = {
    'waste-management': {
      healthyMargin: { min: 0.10, strong: 0.20 },
      typicalCAC: { low: 30, high: 150 },
      typicalLTV: { low: 800, high: 2000 },
    },
    'personal-styling': {
      healthyMargin: { min: 0.30, strong: 0.50 },
      typicalCAC: { low: 300, high: 800 },
      typicalLTV: { low: 5000, high: 15000 },
    },
    'health-fitness': {
      healthyMargin: { min: 0.15, strong: 0.30 },
      typicalCAC: { low: 400, high: 1000 },
      typicalLTV: { low: 2000, high: 5000 },
    },
    'hybrid-retail-service': {
      healthyMargin: { min: 0.08, strong: 0.15 },
      typicalCAC: { low: 50, high: 300 },
      typicalLTV: { low: 500, high: 3000 },
    },
    'hospitality-beverage': {
      healthyMargin: { min: 0.08, strong: 0.18 },
      typicalCAC: { low: 500, high: 2000 },
      typicalLTV: { low: 5000, high: 20000 },
    },
    'professional-services': {
      healthyMargin: { min: 0.15, strong: 0.40 },
      typicalCAC: { low: 1000, high: 5000 },
      typicalLTV: { low: 10000, high: 50000 },
    },
    'beauty-services': {
      healthyMargin: { min: 0.20, strong: 0.35 },
      typicalCAC: { low: 100, high: 400 },
      typicalLTV: { low: 2000, high: 8000 },
    },
    'food-service': {
      healthyMargin: { min: 0.08, strong: 0.20 },
      typicalCAC: { low: 25, high: 150 },
      typicalLTV: { low: 500, high: 3000 },
    },
  }

  return benchmarks[vertical] || {}
}

/**
 * Secondary diagnosis based on financial metrics with vertical context
 * Used if pain point is ambiguous or to validate
 */
function diagnosisFromMetrics(input: DiagnosisInput): {
  constraint: ConstraintType
  confidence: number
  reasoning: string[]
} {
  const reasoning: string[] = []
  const scores: Partial<Record<ConstraintType, number>> = {
    demand: 0,
    delivery: 0,
    efficiency: 0,
    quality: 0,
    capital: 0,
    retention: 0,
    pricing: 0,
  }

  const { revenue, margin, cac, ltv } = input
  const benchmarks = getVerticalBenchmarks(input.vertical)

  // Margin analysis with vertical context
  if (margin < 0.05) {
    scores.efficiency = (scores.efficiency || 0) + 40
    reasoning.push('Negative or near-zero margins indicate efficiency or pricing issues')
  } else if (benchmarks.healthyMargin) {
    if (margin < benchmarks.healthyMargin.min) {
      scores.efficiency = (scores.efficiency || 0) + 35
      reasoning.push(
        `Margins (${(margin * 100).toFixed(0)}%) are below healthy range (${(benchmarks.healthyMargin.min * 100).toFixed(0)}%) for your vertical`
      )
    } else if (margin >= benchmarks.healthyMargin.strong) {
      scores.efficiency = (scores.efficiency || 0) - 25
      reasoning.push(`Strong margins (${(margin * 100).toFixed(0)}%) indicate efficiency is not your primary constraint`)
    }
  } else if (margin < 0.15) {
    scores.efficiency = (scores.efficiency || 0) + 30
    reasoning.push('Thin margins (< 15%) suggest efficiency constraints')
  } else if (margin > 0.35) {
    scores.efficiency = (scores.efficiency || 0) - 20
    reasoning.push('Healthy margins suggest efficiency is not primary constraint')
  }

  // CAC to LTV ratio analysis with vertical context
  if (cac > 0 && ltv > 0) {
    const ratio = ltv / cac

    if (benchmarks.typicalCAC && benchmarks.typicalLTV) {
      const avgCAC = (benchmarks.typicalCAC.low + benchmarks.typicalCAC.high) / 2
      const avgLTV = (benchmarks.typicalLTV.low + benchmarks.typicalLTV.high) / 2
      const benchmarkRatio = avgLTV / avgCAC

      if (ratio < benchmarkRatio * 0.5) {
        scores.capital = (scores.capital || 0) + 40
        scores.retention = (scores.retention || 0) + 25
        reasoning.push(
          `Your LTV:CAC ratio (${ratio.toFixed(1)}:1) is significantly below industry benchmark (${benchmarkRatio.toFixed(1)}:1) for ${input.vertical}`
        )
      } else if (ratio > benchmarkRatio * 1.5) {
        scores.capital = (scores.capital || 0) - 30
        reasoning.push(`Strong LTV:CAC ratio vs. benchmark suggests capital/retention is not constraining`)
      }
    } else {
      // Fallback to generic logic
      if (ratio < 1) {
        scores.retention = (scores.retention || 0) + 35
        scores.capital = (scores.capital || 0) + 25
        reasoning.push('LTV < CAC indicates retention issues or high churn')
      } else if (ratio > 5) {
        scores.capital = (scores.capital || 0) - 30
        reasoning.push('Strong LTV:CAC ratio suggests capital is not constraining')
      }
    }
  }

  // Revenue growth stage - context aware
  const revenueThresholdLow = benchmarks.revenueRange?.early || 200000
  const revenueThresholdHigh = benchmarks.revenueRange?.scale || 2000000

  if (revenue < revenueThresholdLow) {
    scores.demand = (scores.demand || 0) + 25
    reasoning.push(`At ${(revenue / 1000).toFixed(0)}K revenue, demand generation is typically the primary lever`)
  } else if (revenue > revenueThresholdHigh) {
    scores.delivery = (scores.delivery || 0) + 20
    reasoning.push(`At ${(revenue / 1000000).toFixed(1)}M revenue, delivery and scale constraints emerge`)
  }

  // CAC absolute level with vertical context
  if (cac > revenue * 0.1) {
    scores.demand = (scores.demand || 0) + 10
    scores.pricing = (scores.pricing || 0) + 10
    reasoning.push(`CAC ($${cac.toLocaleString()}) is ${((cac / revenue) * 100).toFixed(0)}% of annual revenue - high relative cost`)
  }

  // Default if no signals
  if (Object.values(scores).every(s => s === 0)) {
    scores.demand = 50
    reasoning.push('Without clear metric signals, demand generation is the most common early-stage constraint')
  }

  // Determine primary constraint from scores
  const entries = Object.entries(scores).filter(([_, v]) => v > 0)
  const maxScore = Math.max(...entries.map(([_, v]) => v))
  const primary = entries.find(([_, v]) => v === maxScore)?.[0] as ConstraintType || 'demand'
  const confidence = Math.min(Math.max((maxScore / 100) * 100, 40), 95)

  return { constraint: primary, confidence, reasoning }
}

/**
 * Generate human-friendly explanation for diagnosis
 */
function generateExplanation(
  constraint: ConstraintType,
  input: DiagnosisInput,
  reasoning: string[]
): string {
  const { revenue, margin, cac, ltv } = input
  const descriptions = constraintDescriptions[constraint]

  const explanations: Record<ConstraintType, (input: DiagnosisInput) => string> = {
    demand: () => `You have a **${descriptions.title} constraint**.

Your business can deliver well (margins at ${(margin * 100).toFixed(0)}%) and your cost per customer ($${cac.toLocaleString()}) is reasonable, but you're not getting enough customers through the door. The fix is focused: get more leads. This is actually great news—it means growth is about lead generation and marketing, not restructuring your entire operation.`,

    delivery: () => `You have a **${descriptions.title} constraint**.

You're successfully generating demand (margins at ${(margin * 100).toFixed(0)}%, LTV:CAC ratio of ${(ltv / cac).toFixed(1)}x), but you're hitting a ceiling on how many customers you can serve. The bottleneck is fulfillment—delivery, staffing, or systems. Fixing this usually means process automation, hiring, or systematizing your delivery.`,

    efficiency: () => `You have an **${descriptions.title} constraint**.

Your margins are tight (${(margin * 100).toFixed(0)}%), which means every operation dollar matters. Even with good demand, thin margins prevent investment in growth. The fix is operational excellence: eliminate waste, improve unit economics, and create breathing room to invest in scaling.`,

    capital: () => `You have a **${descriptions.title} constraint**.

The math doesn't work: your customer acquisition cost ($${cac.toLocaleString()}) is too high relative to what customers are worth ($${ltv.toLocaleString()} LTV). You're burning cash acquiring customers who don't stay long enough. The fix is improving retention, reducing churn, or rethinking your acquisition strategy.`,

    retention: () => `You have a **${descriptions.title} constraint**.

Customers are leaving too quickly. Your LTV ($${ltv.toLocaleString()}) relative to CAC ($${cac.toLocaleString()}) suggests churn is the bottleneck. Even with good margins and demand, high churn makes growth impossible. Focus on customer experience and sticky products.`,

    pricing: () => `You have a **${descriptions.title} constraint**.

Your customers may be undervalued. You're operating at ${(margin * 100).toFixed(0)}% margins with good demand and delivery, but you're not capturing enough value from each transaction. The fix is testing higher prices, premium tiers, or value-based pricing models.`,

    quality: () => `You have a **${descriptions.title} constraint**.

Quality issues are limiting growth. Customers aren't returning, referrals aren't happening, or your reputation is preventing expansion. Focus on improving your service or product quality first—growth will follow once you nail execution.`,
  }

  return explanations[constraint](input)
}

/**
 * Generate meta-analysis for a constraint
 */
function generateMetaAnalysis(
  constraint: ConstraintType,
  input: DiagnosisInput
): MetaAnalysis {
  const rootCause = rootCauseTemplates[constraint](input)
  const cascadingEffects = cascadingEffectsTemplates[constraint](input)
  const whatUnlocks = whatUnlocksTemplates[constraint](input)
  const successMetricsData = successMetricsTemplates[constraint]()

  // Estimate potential revenue lift based on constraint
  const revenueLiftMap: Record<ConstraintType, number> = {
    demand: 40, // 30-50% growth from demand generation
    delivery: 25, // 15-35% from capacity optimization
    efficiency: 35, // 25-45% from margin improvement
    quality: 20, // 15-30% from retention improvement
    capital: 50, // Variable, depends on how broken unit economics are
    retention: 30, // 20-40% from churn reduction
    pricing: 25, // 15-35% from price increases
  }

  return {
    rootCause,
    whyThisMatters: `This constraint is preventing you from reaching your business potential. It's not just limiting growth—it's creating a cascade of problems that compound over time.`,
    cascadingEffects,
    whatItUnlocks: whatUnlocks,
    successMetrics: successMetricsData.map((metric, idx) => {
      const metricValues: Record<ConstraintType, Record<number, { current: string; target: string }>> = {
        demand: {
          0: { current: 'Low lead flow', target: '2-3x monthly leads' },
          1: { current: '$500+ CAC', target: '$200-300 CAC' },
          2: { current: 'Flat/declining', target: '+30-50% growth' },
          3: { current: 'Weak pipeline', target: '3-6 months sales pipeline' },
        },
        delivery: {
          0: { current: '60-80% utilization', target: '90%+ utilization' },
          1: { current: '3.2/5 rating', target: '4.5+/5 rating' },
          2: { current: '30+ day cycle', target: '14 day cycle' },
          3: { current: '3.0/5 satisfaction', target: '4.5+/5 satisfaction' },
        },
        efficiency: {
          0: { current: `${(input.margin * 100).toFixed(0)}% margin`, target: '+10-15% improvement' },
          1: { current: 'High waste', target: 'Optimized per-unit cost' },
          2: { current: 'Negative/thin', target: '20%+ operating margin' },
          3: { current: '6-12 months', target: '18-24 months' },
        },
        quality: {
          0: { current: 'Below 4/5', target: '4.8+/5 rating' },
          1: { current: 'High churn', target: '5-10% monthly churn' },
          2: { current: '<20% referral', target: '40%+ word-of-mouth' },
          3: { current: '<3.0 NPS', target: '50+ NPS' },
        },
        capital: {
          0: { current: `${((input.ltv / input.cac) || 0).toFixed(1)}:1`, target: '3:1 or better' },
          1: { current: 'High burn', target: 'Cash positive' },
          2: { current: 'Declining', target: '12+ months' },
          3: { current: 'Unsustainable', target: 'Unit profitable' },
        },
        retention: {
          0: { current: `${((1 - input.ltv / (input.cac * 3)) * 100 || 10).toFixed(0)}% churn`, target: '2-5% churn' },
          1: { current: `Low ($${input.ltv})`, target: 'High lifetime value' },
          2: { current: '<30% repeat', target: '70%+ repeat rate' },
          3: { current: 'Declining', target: '24+ month lifetime' },
        },
        pricing: {
          0: { current: 'Market rate', target: '+15-30% pricing' },
          1: { current: 'Price sensitive', target: 'Value-based buyers' },
          2: { current: `${(input.margin * 100).toFixed(0)}%`, target: '+10-20% margin' },
          3: { current: 'Low willingness', target: '60%+ retention at higher price' },
        },
      }

      const values = metricValues[constraint]?.[idx] || {
        current: 'Current state',
        target: 'Target state',
      }

      return {
        metric: metric.metric,
        current: values.current,
        target: values.target,
        timeframe: metric.timeframe,
      }
    }),
    potentialRevenueLift: `Fixing this constraint could unlock ${revenueLiftMap[constraint]}%+ revenue growth over 6-12 months.`,
  }
}

/**
 * Enhance diagnosis with positioning context
 * Uses customer type, trigger, and acquisition channel to refine constraint diagnosis
 * Based on Alex Hormozi's framework from actual playbook analysis
 */
function enhanceDiagnosisWithPositioning(
  diagnosis: EnhancedConstraintDiagnosis,
  input: DiagnosisInput
): string[] {
  const reasoning: string[] = []
  const { customerType, customerTrigger, acquisitionChannel } = input
  const { primaryConstraint, metrics } = diagnosis
  const { revenue, margin, cac, ltv } = metrics

  // B2B Enterprise high CAC context
  if (customerType === 'b2b_enterprise' && cac > 1000) {
    reasoning.push(`✓ High CAC ($${cac}) is typical for enterprise B2B sales`)
    reasoning.push(`→ Focus on LTV expansion and longer payback periods, not CAC reduction`)
  }

  // Paid ads + urgent trigger + thin margins = conversion leak
  if (acquisitionChannel === 'paid_ads' && customerTrigger === 'urgent_problem' && primaryConstraint === 'demand') {
    reasoning.push(`⚠️ Paid ads + urgent customers = likely conversion friction in sales funnel`)
    reasoning.push(`→ Add lead magnet or risk-free assessment to capture intent before commitment`)
  }

  // Referrals + good margins = scale opportunity
  if (acquisitionChannel === 'referrals' && margin > 0.3 && primaryConstraint === 'demand') {
    reasoning.push(`✓ Strong margins + referrals = healthy product-market fit`)
    reasoning.push(`→ Test paid ads or partnerships to complement referral growth`)
  }

  // Local walk-ins + planned purchase = geographic constraint
  if (acquisitionChannel === 'local' && customerTrigger === 'planned_purchase') {
    reasoning.push(`⚠️ Local + planned purchase = limited reach by geography`)
    reasoning.push(`→ Either expand locations OR digitize service to extend beyond local market`)
  }

  // Affluent B2C + aspiration trigger + organic = strong positioning
  if (customerType === 'b2c_affluent' && customerTrigger === 'aspiration' && acquisitionChannel === 'organic') {
    reasoning.push(`✓ Affluent + aspiration + organic = strong brand/content positioning`)
    reasoning.push(`→ Test paid ads to lookalike audiences to accelerate growth`)
  }

  // Mass market + thin margins = price-based competition
  if (customerType === 'b2c_mass' && margin < 0.1) {
    reasoning.push(`⚠️ Mass market + thin margins = competing on price in saturated market`)
    reasoning.push(`→ Either reposition around experience/quality OR achieve scale efficiency`)
  }

  // SMB customer + low CAC = good unit economics
  if (customerType === 'b2b_smb' && cac < 500 && ltv / cac > 3) {
    reasoning.push(`✓ SMB customer + low CAC + healthy LTV = strong unit economics`)
    reasoning.push(`→ Constraint is likely demand volume, not unit economics`)
  }

  // Life event trigger + good LTV:CAC = retention focus
  if (customerTrigger === 'life_event' && ltv / cac > 5) {
    reasoning.push(`✓ Life event triggers create natural customer loyalty`)
    reasoning.push(`→ Focus on deepening relationships and repeat purchase opportunities`)
  }

  // Niche + partnerships = leverage opportunity
  if (customerType === 'b2c_niche' && acquisitionChannel === 'partnerships') {
    reasoning.push(`✓ Niche + partnerships = high leverage opportunity`)
    reasoning.push(`→ Expand partnership network systematically, not through paid ads`)
  }

  // Ongoing pain + high retention challenge
  if (customerTrigger === 'ongoing_pain' && primaryConstraint === 'retention') {
    reasoning.push(`→ Ongoing pain positions you for strong retention if service delivery is excellent`)
  }

  return reasoning.length > 0 ? reasoning : []
}

/**
 * Generate alternative constraint explanations
 */
function generateAlternatives(
  primary: ConstraintType,
  scores: Record<ConstraintType, number>,
  input: DiagnosisInput
): AlternativeConstraint[] {
  const alternatives: AlternativeConstraint[] = []

  // Get all constraints sorted by score
  const sorted = Object.entries(scores)
    .filter(([constraint]) => constraint !== primary)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2) // Top 2 alternatives

  sorted.forEach(([constraint, score]) => {
    const total = Math.max(...Object.values(scores))
    const probability = Math.round((score / total) * 100)

    if (probability < 10) return // Too low to matter

    const reasoningMap: Record<ConstraintType, string> = {
      demand: `Your revenue is lower than we'd expect if demand wasn't an issue.`,
      delivery: `Your margins and CAC suggest you could be hitting delivery constraints at higher scale.`,
      efficiency: `Your margins are tighter than they need to be given your unit economics.`,
      quality: `Quality issues could be the root cause of your retention or demand problems.`,
      capital: `Your LTV:CAC ratio suggests unit economics might be the underlying issue.`,
      retention: `Your churn rate appears to be affecting unit economics more than metrics suggest.`,
      pricing: `You may be underpriced relative to the value you deliver.`,
    }

    alternatives.push({
      constraint: constraint as ConstraintType,
      probability,
      reasoning: reasoningMap[constraint as ConstraintType],
    })
  })

  return alternatives
}

/**
 * Main diagnosis function with enhanced meta-analysis
 * Combines pain point (highest priority) with metrics for validation
 */
export function diagnoseConstraint(input: DiagnosisInput): ConstraintDiagnosis {
  // First, try pain point diagnosis
  const painPointDiagnosis = diagnosisFromPainPoint(input.painPoint)
  if (painPointDiagnosis && painPointDiagnosis.confidence > 80) {
    const reasoning = [`Primary pain point: "${input.painPoint}"`]
    const explanation = generateExplanation(painPointDiagnosis.constraint, input, reasoning)
    return {
      primaryConstraint: painPointDiagnosis.constraint,
      confidence: painPointDiagnosis.confidence,
      explanation,
      reasoning,
      metrics: {
        revenue: input.revenue,
        margin: input.margin,
        cac: input.cac,
        ltv: input.ltv,
        painPoint: input.painPoint,
      },
    }
  }

  // Fall back to metrics-based diagnosis
  const metricsDiagnosis = diagnosisFromMetrics(input)
  const explanation = generateExplanation(metricsDiagnosis.constraint, input, metricsDiagnosis.reasoning)

  return {
    primaryConstraint: metricsDiagnosis.constraint,
    confidence: metricsDiagnosis.confidence,
    explanation,
    reasoning: metricsDiagnosis.reasoning,
    metrics: {
      revenue: input.revenue,
      margin: input.margin,
      cac: input.cac,
      ltv: input.ltv,
      painPoint: input.painPoint,
    },
  }
}

/**
 * Enhanced diagnosis with full meta-analysis
 * This is the premium version with all insights
 */
export function diagnoseConstraintWithAnalysis(input: DiagnosisInput): EnhancedConstraintDiagnosis {
  // Get basic diagnosis
  const basicDiagnosis = diagnoseConstraint(input)

  // Get scoring data for alternatives
  const metricsDiagnosis = diagnosisFromMetrics(input)

  // Get meta-analysis
  const metaAnalysis = generateMetaAnalysis(basicDiagnosis.primaryConstraint, input)

  // Get alternatives
  const scoreBase: Record<ConstraintType, number> = {
    demand: 0,
    delivery: 0,
    efficiency: 0,
    quality: 0,
    capital: 0,
    retention: 0,
    pricing: 0,
  }
  const scores = metricsDiagnosis.reasoning.reduce((acc, reason) => {
    // Score based on reasoning
    if (reason.includes('demand')) acc.demand += 20
    if (reason.includes('delivery')) acc.delivery += 20
    if (reason.includes('efficiency')) acc.efficiency += 20
    if (reason.includes('retention')) acc.retention += 20
    if (reason.includes('capital')) acc.capital += 20
    if (reason.includes('pricing')) acc.pricing += 20
    if (reason.includes('quality')) acc.quality += 20
    return acc
  }, scoreBase)

  const alternativeConstraints = generateAlternatives(
    basicDiagnosis.primaryConstraint,
    scores,
    input
  )

  // Next steps by constraint
  const nextStepsMap: Record<ConstraintType, string[]> = {
    demand: [
      'Audit your top 3 customer acquisition channels for ROI',
      'Test 2-3 new lead generation tactics in the next 30 days',
      'Set monthly lead volume target and track weekly progress',
      'Calculate break-even CAC for your business model',
      'Build a predictable, repeatable sales process',
    ],
    delivery: [
      'Document your current delivery process end-to-end',
      'Identify the 3 biggest bottlenecks in fulfillment',
      'Calculate capacity math: how many customers = max capacity',
      'Systematize your delivery (templates, checklists, training)',
      'Hire or train to 90%+ utilization without quality loss',
    ],
    efficiency: [
      'Conduct a line-by-line cost audit of your operations',
      'Break down costs by customer to identify profit pools',
      'Identify the 3 biggest cost drains and attack them',
      'Implement one quick win that improves margin by 5%',
      'Build a unit economics dashboard tracked weekly',
    ],
    quality: [
      'Measure quality: survey customers, track satisfaction scores',
      'Document your quality standards and create checklists',
      'Identify the 3 biggest quality issues holding you back',
      'Fix one critical quality issue in the next 30 days',
      'Build quality consistency across your team/operations',
    ],
    capital: [
      'Model customer lifetime value: when do customers pay for themselves?',
      'Reduce CAC: audit your acquisition and cut inefficient channels',
      'Increase LTV: improve retention and extend customer lifetime',
      'Calculate breakeven point: at what metrics does this work?',
      'Plan path to cash-positive unit economics within 6 months',
    ],
    retention: [
      'Measure churn: what % of customers leave monthly?',
      'Exit interview: understand why customers leave',
      'Identify your "churn cliff": when do most customers leave?',
      'Implement one retention tactic: better onboarding or success',
      'Target 20-30% churn reduction within 90 days',
    ],
    pricing: [
      'Survey customers: would they pay 20-30% more?',
      'Test premium tier or tiered pricing model',
      'Calculate price elasticity: how many customers would you lose?',
      'Raise prices on new customers first (A/B test)',
      'Communicate value better to justify premium pricing',
    ],
  }

  // Enrich with positioning context if provided (Phase 2: Tier 3)
  const result: EnhancedConstraintDiagnosis = {
    primaryConstraint: basicDiagnosis.primaryConstraint,
    confidence: basicDiagnosis.confidence,
    explanation: basicDiagnosis.explanation,
    reasoning: basicDiagnosis.reasoning,
    metrics: basicDiagnosis.metrics,
    metaAnalysis,
    alternativeConstraints,
    nextSteps: nextStepsMap[basicDiagnosis.primaryConstraint],
  }

  // Add positioning context if available
  if (input.customerType || input.customerTrigger || input.acquisitionChannel) {
    result.positioningContext = {
      customerType: input.customerType,
      customerTrigger: input.customerTrigger,
      acquisitionChannel: input.acquisitionChannel,
    }

    // Enhance diagnosis with positioning insights
    const enhancedReasoning = enhanceDiagnosisWithPositioning(result, input)
    if (enhancedReasoning) {
      result.reasoning = [...result.reasoning, ...enhancedReasoning]
      result.confidence = Math.min(result.confidence + 5, 99) // Small confidence boost from positioning context
    }
  }

  return result
}

/**
 * Get constraint details for UI rendering
 */
export function getConstraintDetails(constraint: ConstraintType) {
  return constraintDescriptions[constraint]
}

/**
 * All constraint types for iteration
 */
export const ALL_CONSTRAINTS: ConstraintType[] = [
  'demand',
  'delivery',
  'efficiency',
  'quality',
  'capital',
  'retention',
  'pricing',
]
