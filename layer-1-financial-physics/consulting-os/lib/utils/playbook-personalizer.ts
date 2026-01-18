/**
 * Playbook Personalization Engine
 *
 * Transforms generic playbook content into personalized recommendations
 * by inserting user-specific metrics, benchmarks, and insights.
 */

import { DiagnosisInput, ConstraintType } from '@/lib/schemas/diagnosis-schema'

export interface PersonalizedPlaybook {
  title: string
  businessContext: string
  currentState: string
  targetState: string
  roadmap: RoadmapPhase[]
  keyMetrics: KeyMetric[]
  criticalActions: string[]
  resources: Resource[]
}

export interface RoadmapPhase {
  phase: string
  timeframe: string
  objectives: string[]
  actions: string[]
  successCriteria: string[]
  risks: string[]
}

export interface KeyMetric {
  name: string
  current: string
  target: string
  measurement: string
  frequency: string
}

export interface Resource {
  title: string
  description: string
  type: 'framework' | 'tool' | 'template' | 'case-study'
}

/**
 * Generate personalized playbook for a constraint
 */
export function generatePersonalizedPlaybook(
  constraint: ConstraintType,
  input: DiagnosisInput
): PersonalizedPlaybook {
  const verticalName = getVerticalName(input.vertical)
  const businessContext = generateBusinessContext(constraint, input, verticalName)
  const currentState = generateCurrentState(constraint, input)
  const targetState = generateTargetState(constraint, input)
  const roadmap = generateRoadmap(constraint, input)
  const keyMetrics = generateKeyMetrics(constraint, input)
  const criticalActions = getCriticalActions(constraint)
  const resources = getResources(constraint, input.vertical)

  return {
    title: `${constraint.charAt(0).toUpperCase() + constraint.slice(1)} Constraint Playbook for ${verticalName}`,
    businessContext,
    currentState,
    targetState,
    roadmap,
    keyMetrics,
    criticalActions,
    resources,
  }
}

function getVerticalName(vertical?: string): string {
  const names: Record<string, string> = {
    'waste-management': 'Waste Management',
    'personal-styling': 'Personal Styling',
    'health-fitness': 'Health & Fitness',
    'hybrid-retail-service': 'Hybrid Retail & Service',
    'hospitality-beverage': 'Hospitality & Beverage',
    'professional-services': 'Professional Services',
    'beauty-services': 'Beauty Services',
    'food-service': 'Food Service',
  }
  return names[vertical || ''] || 'Your Business'
}

function generateBusinessContext(constraint: ConstraintType, input: DiagnosisInput, verticalName: string): string {
  const contextMap: Record<ConstraintType, (input: DiagnosisInput, vertical: string) => string> = {
    demand: () =>
      `You're operating a ${verticalName} business generating $${(input.revenue / 1000).toFixed(0)}K annually. ` +
      `With margins at ${(input.margin * 100).toFixed(0)}%, your profitability is healthy. The constraint isn't your ability to deliver—it's your ability to fill the pipeline. ` +
      `You need a systematic approach to generating more qualified leads.`,

    delivery: () =>
      `Your ${verticalName} business is generating $${(input.revenue / 1000).toFixed(0)}K in revenue, but you're hitting a ceiling. ` +
      `You've proven you can close deals and deliver profitably (${(input.margin * 100).toFixed(0)}% margins), but you can't scale fulfillment. ` +
      `The constraint is capacity—you need to systematize and scale your delivery operations.`,

    efficiency: () =>
      `Your ${verticalName} business is operating at ${(input.margin * 100).toFixed(0)}% net margins—below what's healthy for your category. ` +
      `At $${(input.revenue / 1000).toFixed(0)}K revenue, you have enough scale to optimize, but margins are too thin to invest in growth. ` +
      `You need to improve unit economics before scaling further.`,

    quality: () =>
      `Your ${verticalName} business has the demand and capacity, but quality inconsistency is limiting growth. ` +
      `This manifests as low retention, negative word-of-mouth, and difficulty commanding premium pricing. ` +
      `You need to systematize quality before growth becomes sustainable.`,

    capital: () =>
      `Your ${verticalName} business has fundamental unit economics problems. Your LTV:CAC ratio of ${(input.ltv / input.cac).toFixed(1)}:1 ` +
      `means you're spending more acquiring customers than they generate over their lifetime. ` +
      `This constraint is unsustainable—you're burning cash to grow.`,

    retention: () =>
      `Your ${verticalName} business has strong acquisition and delivery, but customers aren't staying long enough. ` +
      `This compresses LTV and makes your unit economics fragile. ` +
      `You need to improve retention before growth becomes profitable.`,

    pricing: () =>
      `Your ${verticalName} business is operating at ${(input.margin * 100).toFixed(0)}% margins with strong demand and good delivery. ` +
      `You may be undervalued in the market. Your constraint is pricing power—the ability to capture more value from each transaction.`,
  }

  return contextMap[constraint](input, verticalName)
}

function generateCurrentState(constraint: ConstraintType, input: DiagnosisInput): string {
  const stateMap: Record<ConstraintType, (input: DiagnosisInput) => string> = {
    demand: () =>
      `- Monthly lead flow: Inconsistent and unreliable\n` +
      `- Customer acquisition cost: $${input.cac.toLocaleString()} (may be above sustainable levels)\n` +
      `- Sales pipeline: Weak and unpredictable\n` +
      `- Revenue growth: Flat or declining due to insufficient leads`,

    delivery: () =>
      `- Team capacity: Fully utilized at ${input.revenue > 2000000 ? '90%+' : '70-80%'}\n` +
      `- Fulfillment time: Extended and inconsistent\n` +
      `- Service quality: Declining as you push capacity limits\n` +
      `- Revenue opportunity: Left on the table due to "no capacity" conversations`,

    efficiency: () =>
      `- Cost structure: ${(100 - input.margin * 100).toFixed(0)}% of revenue consumed by operations\n` +
      `- Net margin: ${(input.margin * 100).toFixed(0)}% (below healthy range)\n` +
      `- Reinvestment capacity: Limited; can't invest in growth\n` +
      `- Profit per customer: Minimal, limiting business resilience`,

    quality: () =>
      `- Customer satisfaction: Below expectations (3-4/5 typical)\n` +
      `- Retention rate: Declining; customers leave after short tenure\n` +
      `- Referral rate: Low; negative word-of-mouth apparent\n` +
      `- Scaling barriers: Quality inconsistency prevents premium positioning`,

    capital: () =>
      `- LTV:CAC ratio: ${(input.ltv / input.cac).toFixed(1)}:1 (unsustainable; healthy is 3:1+)\n` +
      `- Monthly burn: Negative unit economics\n` +
      `- Cash runway: Decreasing despite revenue growth\n` +
      `- Growth math: Acquisition spending exceeds customer lifetime value`,

    retention: () =>
      `- Monthly churn: Higher than industry average\n` +
      `- Customer lifetime: Shorter than your CAC payback period\n` +
      `- Repeat customer rate: Below 50%\n` +
      `- LTV impact: Low customer lifetime compresses lifetime value`,

    pricing: () =>
      `- Price positioning: Market rate or below\n` +
      `- Pricing power: Limited; unable to increase prices without customer loss\n` +
      `- Customer perception: Price-conscious, not value-conscious\n` +
      `- Revenue opportunity: Significant margin expansion possible`,
  }

  return stateMap[constraint](input)
}

function generateTargetState(constraint: ConstraintType, input: DiagnosisInput): string {
  const targetMap: Record<ConstraintType, (input: DiagnosisInput) => string> = {
    demand: () =>
      `- Monthly lead flow: 2-3x current (predictable, repeatable)\n` +
      `- CAC payback: 6-12 months or less\n` +
      `- Sales pipeline: 3-6 months of revenue visibility\n` +
      `- Growth rate: 20-40% monthly from marketing improvements`,

    delivery: () =>
      `- Team capacity: 90%+ utilization without quality degradation\n` +
      `- Fulfillment time: 50% faster than current\n` +
      `- Service quality: Consistent 4.5+/5 across all deliverables\n` +
      `- Scaling ready: Can add 50%+ volume with minimal additional costs`,

    efficiency: () =>
      `- Net margin: ${Math.min(input.margin + 0.15, 0.35) * 100 > 30 ? '30%' : (input.margin + 0.15) * 100}%+ (20-30% minimum lift)\n` +
      `- Cost structure: 60-65% of revenue spent on delivery\n` +
      `- Reinvestment capacity: $100K+ annually for growth initiatives\n` +
      `- Profit per customer: Sustainable for scaling`,

    quality: () =>
      `- Customer satisfaction: 4.5-5.0/5 consistently\n` +
      `- Retention rate: 80%+ annual retention\n` +
      `- Referral rate: 30-40% of new customers from word-of-mouth\n` +
      `- Pricing power: Can command 15-30% premium based on reputation`,

    capital: () =>
      `- LTV:CAC ratio: 3:1 or better (unit economics work)\n` +
      `- Monthly profitability: Positive at unit level\n` +
      `- Cash flow: Healthy and improving month-over-month\n` +
      `- Sustainable growth: Growth is profitable, not cash-draining`,

    retention: () =>
      `- Monthly churn: 2-5% (industry healthy range)\n` +
      `- Customer lifetime: 24+ months\n` +
      `- Repeat customer rate: 70%+\n` +
      `- LTV impact: Customer lifetime value increases significantly`,

    pricing: () =>
      `- Price positioning: 15-30% premium vs. market\n` +
      `- Pricing power: Can increase prices with <10% customer loss\n` +
      `- Customer perception: Value-conscious; willing to pay for quality\n` +
      `- Revenue lift: 20-35% margin improvement from pricing optimization`,
  }

  return targetMap[constraint](input)
}

function generateRoadmap(constraint: ConstraintType, input: DiagnosisInput): RoadmapPhase[] {
  const roadmapMap: Record<ConstraintType, RoadmapPhase[]> = {
    demand: [
      {
        phase: 'Phase 1: Channel Audit (Days 1-30)',
        timeframe: '30 days',
        objectives: [
          'Understand current customer acquisition sources',
          'Calculate ROI for each channel',
          'Identify high-potential channels',
        ],
        actions: [
          'Track all customer sources for 30 days',
          'Calculate CAC for each channel',
          'Interview 10+ customers about discovery process',
          'Identify your top 3 channels',
        ],
        successCriteria: ['Complete data on CAC by channel', 'Clear understanding of what works and what doesn\'t'],
        risks: ['Data collection incomplete', 'Attribution challenges for multi-touch sales'],
      },
      {
        phase: 'Phase 2: Quick Wins (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Double down on best channels', 'Test 1-2 new channels', 'Build repeatable process'],
        actions: [
          '2x budget to your best-performing channel',
          'A/B test messaging/positioning',
          'Test one new channel (referral program, content, paid ads)',
          'Hire or allocate time to manage acquisition',
        ],
        successCriteria: ['Lead flow increases 50%+', 'New channel shows promise'],
        risks: ['Channel saturation', 'Quality degradation with scale'],
      },
      {
        phase: 'Phase 3: Systematize (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Build predictable lead generation machine', 'Establish monthly targets', 'Plan for scaling'],
        actions: [
          'Document lead generation process',
          'Create monthly lead targets',
          'Build sales funnel analytics',
          'Plan team expansion for Q2',
        ],
        successCriteria: ['Monthly lead volume increases 100%+', 'Predictable pipeline'],
        risks: ['Inability to scale channel', 'Team capacity limits'],
      },
    ],
    delivery: [
      {
        phase: 'Phase 1: Process Audit (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Map current delivery process', 'Identify bottlenecks', 'Find quick wins'],
        actions: [
          'Document end-to-end delivery process',
          'Time each step',
          'Identify the 3 biggest bottlenecks',
          'Get team input on pain points',
        ],
        successCriteria: ['Clear process map', 'Bottlenecks identified'],
        risks: ['Process documentation resistance from team'],
      },
      {
        phase: 'Phase 2: Systematize (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Eliminate bottlenecks', 'Build systems', 'Improve speed'],
        actions: [
          'Automate or eliminate manual bottleneck steps',
          'Create templates and checklists',
          'Train team on new process',
          'Measure improvement metrics',
        ],
        successCriteria: ['Speed increased 30%+', 'Quality maintained or improved'],
        risks: ['Team resistance to change', 'Process not accounting for edge cases'],
      },
      {
        phase: 'Phase 3: Scale (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Increase capacity 50%', 'Maintain quality', 'Build team'],
        actions: [
          'Hire additional capacity',
          'Scale systems for new team members',
          'Implement quality controls',
          'Plan for multi-team structure',
        ],
        successCriteria: ['Revenue capacity increased 50%+', 'Quality scores at 4.5+'],
        risks: ['Training overhead slows delivery', 'Quality drops with scale'],
      },
    ],
    efficiency: [
      {
        phase: 'Phase 1: Cost Audit (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Understand cost structure', 'Identify waste', 'Find quick wins'],
        actions: [
          'Create detailed cost breakdown',
          'Identify fixed vs. variable costs',
          'Find the 3 biggest cost drains',
          'Calculate cost per customer',
        ],
        successCriteria: ['Complete cost understanding', 'Quick wins identified'],
        risks: ['Incomplete data', 'Difficult to attribute costs'],
      },
      {
        phase: 'Phase 2: Quick Wins (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Improve margins 10-15%', 'Find operational efficiencies'],
        actions: [
          'Implement one quick win (renegotiate supplier, reduce waste, etc.)',
          'Optimize labor allocation',
          'Eliminate low-margin customer segments',
          'Test pricing increase on new customers',
        ],
        successCriteria: ['Margins improve 10%+', 'Cost per customer decreases'],
        risks: ['Changes impact quality', 'Customer pushback on price'],
      },
      {
        phase: 'Phase 3: Systemize (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Build sustainable margins', 'Scale profitably'],
        actions: [
          'Build cost management dashboard',
          'Train team on cost consciousness',
          'Implement monthly cost review process',
          'Plan for margin expansion at scale',
        ],
        successCriteria: ['Margins stable at 20%+', 'Cost trend improving'],
        risks: ['Team cost-cutting impacts quality', 'Difficult to maintain discipline'],
      },
    ],
    quality: [
      {
        phase: 'Phase 1: Measure (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Establish quality baseline', 'Get customer feedback', 'Find problem areas'],
        actions: [
          'Create quality scorecard',
          'Survey 20+ customers about satisfaction',
          'Do exit interviews with churned customers',
          'Identify top complaints',
        ],
        successCriteria: ['Baseline quality score established', 'Root causes identified'],
        risks: ['Uncomfortable feedback', 'Small sample size'],
      },
      {
        phase: 'Phase 2: Fix Critical Issues (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Address top quality complaints', 'Improve consistency'],
        actions: [
          'Fix the #1 quality complaint',
          'Create quality standards/checklist',
          'Train team on quality expectations',
          'Implement quality control process',
        ],
        successCriteria: ['Quality score improves 20%+', 'Top complaint resolved'],
        risks: ['Quick fix causes new problems', 'Team execution inconsistent'],
      },
      {
        phase: 'Phase 3: Systematize (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Consistent quality across team', 'Build quality culture'],
        actions: [
          'Build ongoing quality measurement',
          'Create incentives for quality',
          'Train new team members on quality',
          'Establish quality as competitive advantage',
        ],
        successCriteria: ['Quality score reaches 4.5+', 'Consistency across team'],
        risks: ['Quality culture doesn\'t stick', 'Hard to maintain as team grows'],
      },
    ],
    capital: [
      {
        phase: 'Phase 1: Diagnose (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Understand broken unit economics', 'Find root cause'],
        actions: [
          'Calculate detailed customer cohort economics',
          'Understand customer payback timeline',
          'Identify where the losses are (CAC too high, LTV too low, or both)',
          'Analyze by customer segment',
        ],
        successCriteria: ['Clear understanding of unit economics problem', 'Root cause identified'],
        risks: ['Incomplete data', 'Blended numbers hide real problem'],
      },
      {
        phase: 'Phase 2: Quick Wins (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Improve unit economics', 'Reduce burn'],
        actions: [
          'If CAC problem: cut inefficient channels, reduce customer acquisition',
          'If LTV problem: improve retention, reduce churn',
          'If both: optimize both simultaneously',
          'Monitor breakeven point daily',
        ],
        successCriteria: ['Unit economics improve 20%+', 'Path to breakeven visible'],
        risks: ['Cutting growth too aggressively', 'Root cause misdiagnosis'],
      },
      {
        phase: 'Phase 3: Sustainable Growth (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Reach breakeven', 'Plan for profitable growth'],
        actions: [
          'Hit monthly profitability targets',
          'Build financial modeling',
          'Plan growth at profitable unit economics',
          'Consider outside capital once profitable',
        ],
        successCriteria: ['Unit economics reach breakeven', 'Monthly profitability achieved'],
        risks: ['Unexpected market changes', 'Execution challenges'],
      },
    ],
    retention: [
      {
        phase: 'Phase 1: Understand Churn (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Measure churn', 'Understand why customers leave', 'Find patterns'],
        actions: [
          'Calculate monthly churn rate',
          'Do exit interviews with last 10 churned customers',
          'Analyze churn by customer cohort',
          'Identify the "churn cliff" (when customers leave)',
        ],
        successCriteria: ['Churn rate measured', 'Reasons for churn understood'],
        risks: ['Incomplete churn data', 'Difficult to reach churned customers'],
      },
      {
        phase: 'Phase 2: Quick Win (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Reduce churn 20-30%', 'Test retention tactic'],
        actions: [
          'Improve onboarding (most impactful retention lever)',
          'Implement monthly check-in with customers',
          'Proactively reach out before churn cliff',
          'Test retention offer for at-risk customers',
        ],
        successCriteria: ['Churn decreases 20%+', 'Customer feedback improves'],
        risks: ['Tactic only works for some customers', 'Team execution inconsistent'],
      },
      {
        phase: 'Phase 3: Systemize (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Sustained churn reduction', 'Build retention culture'],
        actions: [
          'Implement ongoing customer success program',
          'Track retention metrics weekly',
          'Build team accountability for retention',
          'Develop proactive retention playbook',
        ],
        successCriteria: ['Churn stable at 2-5%', 'LTV increases significantly'],
        risks: ['Hard to sustain focus on retention', 'New problems emerge'],
      },
    ],
    pricing: [
      {
        phase: 'Phase 1: Research (Days 1-30)',
        timeframe: '30 days',
        objectives: ['Understand pricing tolerance', 'Test willingness to pay'],
        actions: [
          'Survey 30+ customers: would you pay 20-30% more?',
          'Research competitor pricing',
          'Understand value perception',
          'Plan premium tier structure',
        ],
        successCriteria: ['Pricing research complete', 'Customer willingness confirmed'],
        risks: ['Customers won\'t pay more', 'Competitive pressure'],
      },
      {
        phase: 'Phase 2: Test (Days 31-90)',
        timeframe: '60 days',
        objectives: ['Test new pricing', 'Measure impact'],
        actions: [
          'Raise prices 10-15% on new customers only',
          'Create premium tier for early-adopters',
          'Measure conversion rate impact',
          'Collect customer feedback',
        ],
        successCriteria: ['Prices implemented on new customers', 'Minimal churn from test'],
        risks: ['Customer backlash', 'Sales decline'],
      },
      {
        phase: 'Phase 3: Optimize (Days 91-180)',
        timeframe: '90 days',
        objectives: ['Maximize pricing power', 'Establish premium positioning'],
        actions: [
          'Raise prices on existing customers (2-3% gradual or on renewal)',
          'Establish tiered pricing (good/better/best)',
          'Market premium positioning',
          'Build brand around value, not price',
        ],
        successCriteria: ['Prices increased 15-30%', 'Margin expansion significant'],
        risks: ['Customer retention challenges', 'Competitive response'],
      },
    ],
  }

  return roadmapMap[constraint] || []
}

function generateKeyMetrics(constraint: ConstraintType, input: DiagnosisInput): KeyMetric[] {
  const metricsMap: Record<ConstraintType, KeyMetric[]> = {
    demand: [
      {
        name: 'Monthly Lead Volume',
        current: input.revenue < 300000 ? '5-10' : input.revenue < 1000000 ? '15-25' : '50+',
        target: input.revenue < 300000 ? '15-20' : input.revenue < 1000000 ? '40-60' : '150+',
        measurement: 'Count of qualified leads per month',
        frequency: 'Weekly',
      },
      {
        name: 'Customer Acquisition Cost (CAC)',
        current: `$${input.cac.toLocaleString()}`,
        target: `$${(input.cac * 0.6).toLocaleString()}`,
        measurement: 'Total acquisition spend / new customers',
        frequency: 'Monthly',
      },
      {
        name: 'Sales Conversion Rate',
        current: '20-30%',
        target: '40-50%',
        measurement: 'Leads closed / total leads',
        frequency: 'Monthly',
      },
    ],
    delivery: [
      {
        name: 'Fulfillment Time',
        current: '30+ days',
        target: '14-21 days',
        measurement: 'Days from sale to delivery',
        frequency: 'Weekly',
      },
      {
        name: 'Team Utilization',
        current: '70-80%',
        target: '90%+',
        measurement: 'Billable hours / available hours',
        frequency: 'Weekly',
      },
      {
        name: 'Quality Score',
        current: '3.5/5',
        target: '4.5+/5',
        measurement: 'Customer satisfaction survey',
        frequency: 'Monthly',
      },
    ],
    efficiency: [
      {
        name: 'Net Profit Margin',
        current: `${(input.margin * 100).toFixed(0)}%`,
        target: `${Math.min(input.margin * 100 + 15, 35).toFixed(0)}%`,
        measurement: '(Revenue - Costs) / Revenue',
        frequency: 'Monthly',
      },
      {
        name: 'Cost Per Unit',
        current: `$${(input.revenue * (1 - input.margin) / (input.revenue / 50000)).toLocaleString()}`,
        target: '30% lower',
        measurement: 'Total costs / units delivered',
        frequency: 'Monthly',
      },
      {
        name: 'Operating Expense Ratio',
        current: `${((1 - input.margin) * 100).toFixed(0)}%`,
        target: '60-65%',
        measurement: 'Operating expenses / revenue',
        frequency: 'Monthly',
      },
    ],
    quality: [
      {
        name: 'Customer Satisfaction',
        current: '3.0-3.5/5',
        target: '4.5+/5',
        measurement: 'NPS or satisfaction survey',
        frequency: 'Monthly',
      },
      {
        name: 'Customer Retention',
        current: '50-70%',
        target: '80-90%',
        measurement: '% of customers retained annually',
        frequency: 'Monthly',
      },
      {
        name: 'Referral Rate',
        current: '5-15%',
        target: '30-40%',
        measurement: '% of new customers from referrals',
        frequency: 'Quarterly',
      },
    ],
    capital: [
      {
        name: 'LTV:CAC Ratio',
        current: `${(input.ltv / input.cac).toFixed(1)}:1`,
        target: '3:1 or better',
        measurement: 'Customer lifetime value / acquisition cost',
        frequency: 'Monthly',
      },
      {
        name: 'Unit Profitability',
        current: 'Negative',
        target: 'Positive',
        measurement: 'Profit per customer after all costs',
        frequency: 'Monthly',
      },
      {
        name: 'Monthly Burn Rate',
        current: 'Increasing',
        target: 'Breakeven',
        measurement: 'Monthly cash spend vs. revenue',
        frequency: 'Weekly',
      },
    ],
    retention: [
      {
        name: 'Monthly Churn Rate',
        current: '10-15%',
        target: '2-5%',
        measurement: '% of customers lost per month',
        frequency: 'Monthly',
      },
      {
        name: 'Customer Lifetime',
        current: '6-12 months',
        target: '24+ months',
        measurement: 'Average duration of customer relationship',
        frequency: 'Monthly',
      },
      {
        name: 'Repeat Customer Rate',
        current: '30-50%',
        target: '70%+',
        measurement: '% of customers who repurchase',
        frequency: 'Monthly',
      },
    ],
    pricing: [
      {
        name: 'Average Price',
        current: 'Current market rate',
        target: '+15-30%',
        measurement: 'Average revenue per customer',
        frequency: 'Monthly',
      },
      {
        name: 'Price Elasticity',
        current: 'Unknown',
        target: '<10% churn from 20% increase',
        measurement: 'Churn % caused by price increase',
        frequency: 'Test',
      },
      {
        name: 'Margin Impact',
        current: `${(input.margin * 100).toFixed(0)}%`,
        target: `${((input.margin + 0.1) * 100).toFixed(0)}%+`,
        measurement: 'Net margin impact from pricing',
        frequency: 'Monthly',
      },
    ],
  }

  return metricsMap[constraint] || []
}

function getCriticalActions(constraint: ConstraintType): string[] {
  const actionsMap: Record<ConstraintType, string[]> = {
    demand: [
      'Identify your top 3 customer acquisition channels NOW',
      'Stop spending on anything that doesn\'t track to a customer',
      'Pick one channel and 2x the budget this month',
      'Hire or dedicate someone to demand generation full-time',
    ],
    delivery: [
      'Document your current delivery process today',
      'Identify the #1 bottleneck in fulfillment',
      'Set team capacity targets for the next 90 days',
      'Plan how you\'ll 50% faster with the same team',
    ],
    efficiency: [
      'Create a detailed cost breakdown this week',
      'Identify your top 3 cost drains',
      'Find ONE quick win that improves margins 5%',
      'Set monthly targets for cost reduction',
    ],
    quality: [
      'Survey 20+ customers this week about satisfaction',
      'Do exit interviews with your last 5 churned customers',
      'List the top 3 quality complaints',
      'Fix the #1 complaint in the next 30 days',
    ],
    capital: [
      'Calculate customer profitability by cohort TODAY',
      'Determine if CAC or LTV is the bigger problem',
      'Cut the most inefficient 20% of your customer acquisition',
      'Set 90-day targets to reach unit profitability',
    ],
    retention: [
      'Measure your monthly churn rate today',
      'Identify the "churn cliff"—when customers typically leave',
      'Do exit interviews with 10 churned customers',
      'Implement better onboarding starting this month',
    ],
    pricing: [
      'Survey 30 customers: would you pay 20% more?',
      'Research your top 3 competitors\' pricing',
      'Create a premium tier starting immediately',
      'Raise prices 10-15% on new customers starting next month',
    ],
  }

  return actionsMap[constraint] || []
}

function getResources(constraint: ConstraintType, vertical?: string): Resource[] {
  // Generic resources that apply to all constraints
  const resources: Resource[] = [
    {
      title: 'Growth Physics Framework',
      description: 'The constraint methodology applied to your business model',
      type: 'framework',
    },
    {
      title: 'Unit Economics Calculator',
      description: 'Build a model of your customer profitability',
      type: 'tool',
    },
    {
      title: 'Customer Interview Template',
      description: 'Standard questions for understanding customer needs and churn',
      type: 'template',
    },
    {
      title: '90-Day Implementation Tracker',
      description: 'Weekly checklist for staying on track',
      type: 'template',
    },
  ]

  return resources
}
