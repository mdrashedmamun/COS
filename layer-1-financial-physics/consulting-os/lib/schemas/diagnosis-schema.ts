/**
 * Enhanced Diagnosis Schema
 *
 * Extends the basic constraint diagnosis with:
 * - Meta-analysis (root cause, cascading effects, impact)
 * - Confidence scoring with alternatives
 * - Success metrics and what it unlocks
 */

export type ConstraintType = 'demand' | 'delivery' | 'efficiency' | 'quality' | 'capital' | 'retention' | 'pricing'

export interface MetaAnalysis {
  rootCause: string
  whyThisMatters: string
  cascadingEffects: string[]
  whatItUnlocks: string[]
  successMetrics: {
    metric: string
    current: string
    target: string
    timeframe: string
  }[]
  potentialRevenueLift: string
}

export interface AlternativeConstraint {
  constraint: ConstraintType
  probability: number
  reasoning: string
}

export interface EnhancedConstraintDiagnosis {
  // Primary diagnosis
  primaryConstraint: ConstraintType
  confidence: number
  explanation: string

  // Reasoning and breakdown
  reasoning: string[]

  // Metrics that led to this diagnosis
  metrics: {
    revenue: number
    margin: number
    cac: number
    ltv: number
    painPoint: string
  }

  // Deep insights (new)
  metaAnalysis: MetaAnalysis

  // Alternative explanations
  alternativeConstraints: AlternativeConstraint[]

  // Next steps
  nextSteps: string[]

  // Positioning context (optional)
  positioningContext?: {
    customerType?: string
    customerTrigger?: string
    acquisitionChannel?: string
  }
}

export interface DiagnosisInput {
  revenue: number
  margin: number
  cac: number
  ltv: number
  painPoint: string
  vertical?: string
  // Positioning context (optional - 3 core questions)
  customerType?: 'b2b_smb' | 'b2b_enterprise' | 'b2c_mass' | 'b2c_affluent' | 'b2c_niche'
  customerTrigger?: 'life_event' | 'urgent_problem' | 'planned_purchase' | 'ongoing_pain' | 'aspiration'
  acquisitionChannel?: 'referrals' | 'paid_ads' | 'organic' | 'partnerships' | 'outbound' | 'local'
}

// Constraint metadata
export const constraintMetadata: Record<ConstraintType, {
  title: string
  emoji: string
  shortDescription: string
  severity: 'critical' | 'high' | 'medium'
}> = {
  demand: {
    title: 'Demand',
    emoji: '📈',
    shortDescription: 'Not enough customers coming through the door',
    severity: 'high',
  },
  delivery: {
    title: 'Delivery',
    emoji: '⚙️',
    shortDescription: 'Can\'t fulfill demand at scale',
    severity: 'high',
  },
  efficiency: {
    title: 'Efficiency',
    emoji: '📊',
    shortDescription: 'Margins too thin to invest in growth',
    severity: 'critical',
  },
  quality: {
    title: 'Quality',
    emoji: '⭐',
    shortDescription: 'Service/product quality limiting growth',
    severity: 'high',
  },
  capital: {
    title: 'Capital',
    emoji: '💰',
    shortDescription: 'Unit economics don\'t work - burning cash',
    severity: 'critical',
  },
  retention: {
    title: 'Retention',
    emoji: '🔄',
    shortDescription: 'Customers leaving too quickly',
    severity: 'high',
  },
  pricing: {
    title: 'Pricing',
    emoji: '💎',
    shortDescription: 'Undervalued relative to market',
    severity: 'medium',
  },
}

// Root cause templates by constraint
export const rootCauseTemplates: Record<ConstraintType, (input: DiagnosisInput) => string> = {
  demand: (input) => {
    if (input.cac > 500) {
      return `Your customer acquisition cost ($${input.cac.toLocaleString()}) is high, suggesting an expensive channel or inefficient marketing. Most leads either aren't qualified or require heavy nurturing.`
    }
    return `Your business can deliver profitably, but you're not getting enough customer requests. This is usually a marketing or channel problem—you're either not reaching the right people or not converting interest into sales.`
  },
  delivery: (input) => {
    if (input.revenue > 1000000) {
      return `You've achieved significant scale ($${(input.revenue / 1000000).toFixed(1)}M) but can't add more customers without breaking the system. This is a process, team, or infrastructure constraint—you need to systematize before you can scale further.`
    }
    return `You have demand and can close deals, but can't fulfill them profitably. This is usually team capacity, operational efficiency, or quality consistency—you're saying "yes" to business you can't deliver on.`
  },
  efficiency: (input) => {
    const costPercentage = ((1 - input.margin) * 100).toFixed(0)
    return `Your costs are eating ${costPercentage}% of every revenue dollar, leaving margins too thin for reinvestment. Even with perfect demand and delivery, low margins prevent growth investment and limit pricing power.`
  },
  quality: (input) => {
    return `Quality issues are creating negative word-of-mouth, limiting referrals, and preventing you from charging premium prices. You're either losing customers to competitors or can't raise prices because quality inconsistency reduces perceived value.`
  },
  capital: (input) => {
    const ratio = (input.ltv / input.cac).toFixed(1)
    return `Your LTV ($${input.ltv.toLocaleString()}) relative to CAC ($${input.cac.toLocaleString()}) creates a ${ratio}:1 ratio that makes growth unsustainable. You're burning more cash acquiring customers than they generate over their lifetime.`
  },
  retention: (input) => {
    const ratio = (input.ltv / input.cac).toFixed(1)
    return `Customers are churning too quickly, reducing LTV. Your LTV:CAC ratio of ${ratio}:1 is unsustainable because customer lifetime is too short to justify acquisition spending.`
  },
  pricing: (input) => {
    return `You're undervalued in the market. Strong demand and good margins suggest customers would pay more. You're either leaving revenue on the table or undercutting your positioning through low pricing.`
  },
}

// Cascading effects by constraint
export const cascadingEffectsTemplates: Record<ConstraintType, (input: DiagnosisInput) => string[]> = {
  demand: () => [
    "Low customer volume limits economies of scale",
    "Can't justify team hires or investment in systems",
    "Revenue stays flat even if margins improve",
    "Low volume means high CAC percentage of revenue",
  ],
  delivery: () => [
    "Service quality suffers when overstretched",
    "Staff burnout leads to turnover and quality issues",
    "Can't take on better customers due to capacity limits",
    "Margins compress as you cut corners to keep up",
  ],
  efficiency: () => [
    "Can't afford customer success (higher churn)",
    "Can't invest in marketing (low lead volume)",
    "No breathing room for mistakes or growth experiments",
    "Pressure to cut costs further (race to bottom)",
  ],
  quality: () => [
    "High churn as customers switch to alternatives",
    "Can't raise prices or defend positioning",
    "Word-of-mouth turns negative",
    "Reputation damage makes future growth harder",
  ],
  capital: () => [
    "Growth becomes mathematically impossible",
    "Cash flow crisis despite revenue growth",
    "Can't invest in team, technology, or marketing",
    "Forced to choose between growth and survival",
  ],
  retention: () => [
    "Revenue is entirely dependent on new customer acquisition",
    "Unit economics deteriorate as churn accelerates",
    "High CAC isn't justified by short customer lifetime",
    "Business becomes fragile and unprofitable",
  ],
  pricing: () => [
    "Opportunity cost: leaving revenue on the table",
    "Attracts price-sensitive customers (high churn)",
    "Can't compete on value, forced to compete on price",
    "Limits ability to build premium positioning",
  ],
}

// What unlocks by constraint
export const whatUnlocksTemplates: Record<ConstraintType, (input: DiagnosisInput) => string[]> = {
  demand: () => [
    "Higher revenue with same operational structure",
    "Ability to specialize (target better customers)",
    "Justified team expansion and process investment",
    "Faster path to profitability and scalability",
  ],
  delivery: () => [
    "Ability to take on more profitable customers",
    "Improved service quality and better retention",
    "Higher capacity = lower unit costs",
    "Opportunity to raise prices (less capacity constraint)",
  ],
  efficiency: () => [
    "Breathing room to invest in growth",
    "Higher take-home profit (better personal economics)",
    "Ability to survive downturns without panic",
    "Justified investment in team and systems",
  ],
  quality: () => [
    "Better retention and customer lifetime value",
    "Ability to raise prices based on value",
    "Positive word-of-mouth and referrals",
    "Sustainable, profitable growth trajectory",
  ],
  capital: () => [
    "Unit economics that allow sustainable growth",
    "Ability to invest in scaling without burning cash",
    "Improved cash flow and business stability",
    "Potential for outside capital if desired",
  ],
  retention: () => [
    "Predictable, recurring revenue stream",
    "Lower customer acquisition burden (LTV grows)",
    "Sustainable unit economics",
    "Capital efficiency improves dramatically",
  ],
  pricing: () => [
    "Significant revenue lift (10-30% depending on market)",
    "Attracts less price-sensitive, better customers",
    "Supports investment in quality and service",
    "Creates separation from low-cost competitors",
  ],
}

// Success metrics by constraint
export const successMetricsTemplates: Record<ConstraintType, () => Array<{
  metric: string
  timeframe: string
}>> = {
  demand: () => [
    { metric: 'Monthly lead volume', timeframe: '90 days' },
    { metric: 'CAC spend', timeframe: '90 days' },
    { metric: 'Revenue growth rate', timeframe: '6 months' },
    { metric: 'Pipeline value', timeframe: '30 days' },
  ],
  delivery: () => [
    { metric: 'Capacity utilization', timeframe: '90 days' },
    { metric: 'Service quality score', timeframe: '90 days' },
    { metric: 'Delivery cycle time', timeframe: '60 days' },
    { metric: 'Customer satisfaction', timeframe: '90 days' },
  ],
  efficiency: () => [
    { metric: 'Net margin percentage', timeframe: '6 months' },
    { metric: 'Cost per unit', timeframe: '90 days' },
    { metric: 'Operating expense ratio', timeframe: '6 months' },
    { metric: 'Cash runway', timeframe: 'ongoing' },
  ],
  quality: () => [
    { metric: 'Service quality rating', timeframe: '90 days' },
    { metric: 'Customer retention rate', timeframe: '6 months' },
    { metric: 'Referral rate', timeframe: '6 months' },
    { metric: 'Net Promoter Score', timeframe: '90 days' },
  ],
  capital: () => [
    { metric: 'LTV:CAC ratio', timeframe: '90 days' },
    { metric: 'Monthly burn rate', timeframe: '30 days' },
    { metric: 'Cash runway', timeframe: 'ongoing' },
    { metric: 'Unit economics breakeven', timeframe: '6 months' },
  ],
  retention: () => [
    { metric: 'Monthly churn rate', timeframe: '90 days' },
    { metric: 'Customer lifetime value', timeframe: '6 months' },
    { metric: 'Repeat customer rate', timeframe: '90 days' },
    { metric: 'Customer lifetime', timeframe: 'ongoing' },
  ],
  pricing: () => [
    { metric: 'Average price per customer', timeframe: '30 days' },
    { metric: 'Revenue lift', timeframe: '90 days' },
    { metric: 'Customer acquisition', timeframe: '90 days' },
    { metric: 'Margin improvement', timeframe: '6 months' },
  ],
}
