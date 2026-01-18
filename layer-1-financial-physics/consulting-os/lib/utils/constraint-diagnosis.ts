export type ConstraintType = 'demand' | 'delivery' | 'efficiency' | 'quality' | 'capital' | 'retention' | 'pricing'

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

export interface DiagnosisInput {
  revenue: number
  margin: number
  cac: number
  ltv: number
  painPoint: string
  vertical?: string
}

const constraintDescriptions: Record<ConstraintType, { title: string; emoji: string }> = {
  demand: { title: 'Demand', emoji: '💸' },
  delivery: { title: 'Delivery', emoji: '⚙️' },
  efficiency: { title: 'Efficiency', emoji: '📊' },
  quality: { title: 'Quality', emoji: '⭐' },
  capital: { title: 'Capital', emoji: '💰' },
  retention: { title: 'Retention', emoji: '🪝' },
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
 * Secondary diagnosis based on financial metrics
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

  // Margin analysis
  if (margin < 0.05) {
    scores.efficiency = (scores.efficiency || 0) + 40
    reasoning.push('Negative or near-zero margins indicate efficiency or pricing issues')
  } else if (margin < 0.15) {
    scores.efficiency = (scores.efficiency || 0) + 30
    reasoning.push('Thin margins (< 15%) suggest efficiency constraints')
  } else if (margin > 0.35) {
    scores.efficiency = (scores.efficiency || 0) - 20
    reasoning.push('Healthy margins suggest efficiency is not primary constraint')
  }

  // CAC to LTV ratio analysis
  if (cac > 0 && ltv > 0) {
    const ratio = ltv / cac
    if (ratio < 1) {
      scores.retention = (scores.retention || 0) + 35
      scores.capital = (scores.capital || 0) + 25
      reasoning.push('LTV < CAC indicates retention issues or high churn')
    } else if (ratio > 5) {
      scores.capital = (scores.capital || 0) - 30
      reasoning.push('Strong LTV:CAC ratio suggests capital is not constraining')
    }
  }

  // Revenue growth stage
  if (revenue < 200000) {
    scores.demand = (scores.demand || 0) + 25
    reasoning.push('Lower revenue typically indicates demand generation challenges')
  } else if (revenue > 2000000) {
    scores.delivery = (scores.delivery || 0) + 20
    reasoning.push('Higher revenue often requires delivery/fulfillment scaling')
  }

  // CAC absolute level (if they can afford to acquire customers)
  if (cac > revenue * 0.1) {
    scores.demand = (scores.demand || 0) + 15
    scores.pricing = (scores.pricing || 0) + 15
    reasoning.push('Customers are expensive relative to revenue, suggesting limited pricing power or high CAC')
  }

  // Default if no signals
  if (Object.values(scores).every(s => s === 0)) {
    scores.demand = 50
    reasoning.push('Generic business profile - demand generation is common early constraint')
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

    pricing: () => `You have a **${descriptions.pricing} constraint**.

Your customers may be undervalued. You're operating at ${(margin * 100).toFixed(0)}% margins with good demand and delivery, but you're not capturing enough value from each transaction. The fix is testing higher prices, premium tiers, or value-based pricing models.`,

    quality: () => `You have a **${descriptions.title} constraint**.

Quality issues are limiting growth. Customers aren't returning, referrals aren't happening, or your reputation is preventing expansion. Focus on improving your service or product quality first—growth will follow once you nail execution.`,
  }

  return explanations[constraint](input)
}

/**
 * Main diagnosis function
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
