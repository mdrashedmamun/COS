import { ConstraintType } from './constraint-diagnosis'

// Map constraints to playbook paths
// Note: In a real app, these would be loaded from the growth-physics-skill directory
const playbookMapping: Record<string, Record<ConstraintType, string>> = {
  styling: {
    demand: 'Personal Styling Services - Demand Generation Playbook',
    delivery: 'Personal Styling Services - Delivery Optimization',
    efficiency: 'Personal Styling Services - Efficiency Improvement',
    quality: 'Personal Styling Services - Quality Enhancement',
    capital: 'Personal Styling Services - Capital Optimization',
    retention: 'Personal Styling Services - Retention Focus',
    pricing: 'Personal Styling Services - Pricing Strategy',
  },
  restaurant: {
    demand: 'Restaurant Hospitality - Channel Mix Optimization',
    delivery: 'Restaurant Hospitality - Operational Excellence',
    efficiency: 'Restaurant Hospitality - Cost Reduction',
    quality: 'Restaurant Hospitality - Quality Management',
    capital: 'Restaurant Hospitality - Financial Optimization',
    retention: 'Restaurant Hospitality - Customer Loyalty',
    pricing: 'Restaurant Hospitality - Revenue Optimization',
  },
  beauty: {
    demand: 'Beauty Services - Lead Generation',
    delivery: 'Beauty Services - Technician Scaling',
    efficiency: 'Beauty Services - Process Optimization',
    quality: 'Beauty Services - Service Quality',
    capital: 'Beauty Services - Capital Efficiency',
    retention: 'Beauty Services - Client Retention',
    pricing: 'Beauty Services - Premium Pricing',
  },
  fitness: {
    demand: 'Health & Fitness - Member Acquisition',
    delivery: 'Health & Fitness - Service Scaling',
    efficiency: 'Health & Fitness - Operations Optimization',
    quality: 'Health & Fitness - Service Quality',
    capital: 'Health & Fitness - Financial Optimization',
    retention: 'Health & Fitness - Member Retention',
    pricing: 'Health & Fitness - Membership Pricing',
  },
  legal: {
    demand: 'Professional Services - Client Acquisition',
    delivery: 'Professional Services - Service Delivery',
    efficiency: 'Professional Services - Profit Optimization',
    quality: 'Professional Services - Quality Standards',
    capital: 'Professional Services - Financial Management',
    retention: 'Professional Services - Client Retention',
    pricing: 'Professional Services - Premium Pricing',
  },
  waste: {
    demand: 'Waste Management - Growth Strategy',
    delivery: 'Waste Management - Operational Efficiency',
    efficiency: 'Waste Management - Cost Optimization',
    quality: 'Waste Management - Service Quality',
    capital: 'Waste Management - Capital Efficiency',
    retention: 'Waste Management - Client Retention',
    pricing: 'Waste Management - Pricing Power',
  },
  retail: {
    demand: 'Hybrid Retail - Sales Growth',
    delivery: 'Hybrid Retail - Fulfillment Optimization',
    efficiency: 'Hybrid Retail - Margin Improvement',
    quality: 'Hybrid Retail - Product Quality',
    capital: 'Hybrid Retail - Working Capital',
    retention: 'Hybrid Retail - Customer Loyalty',
    pricing: 'Hybrid Retail - Pricing Strategy',
  },
  beverage: {
    demand: 'Beverage Consulting - Market Expansion',
    delivery: 'Beverage Consulting - Distribution Optimization',
    efficiency: 'Beverage Consulting - Cost Reduction',
    quality: 'Beverage Consulting - Quality Standards',
    capital: 'Beverage Consulting - Financial Optimization',
    retention: 'Beverage Consulting - Customer Loyalty',
    pricing: 'Beverage Consulting - Revenue Growth',
  },
}

// Default playbook content for demonstration
const defaultPlaybookContent = `# Growth Physics Playbook

## Understanding Your Constraint

[CONSTRAINT DESCRIPTION GOES HERE]

## The Challenge

Your business is hitting a ceiling because of this specific bottleneck. Many businesses face the same challenge, but the path forward is unique to your situation.

## The Solution: 3-Phase Approach

### Phase 1: Diagnosis & Planning (Week 1-2)

1. **Confirm Your Unit Economics**
   - Validate revenue, margin, and acquisition cost
   - Identify where money leaks in your operation
   - Build a financial baseline

2. **Define Your Constraint Strategy**
   - Research competitors who've solved this
   - Identify 3-5 proven tactics for your constraint type
   - Choose the top 2 to test

### Phase 2: Implementation (Week 3-8)

1. **Build the System**
   - Create processes to address the constraint
   - Test with small group first
   - Measure results weekly

2. **Measure & Refine**
   - Track key metrics daily
   - Adjust based on what works
   - Standardize what sticks

### Phase 3: Scale (Week 9-12)

1. **Systemize the Solution**
   - Document your process
   - Train team members
   - Build automation where possible

2. **Monitor & Optimize**
   - Watch for secondary constraints
   - Keep refining based on data
   - Plan next phase

## 90-Day Implementation Roadmap

### Weeks 1-2: Foundation
- [ ] Meet with team to discuss constraint
- [ ] Gather baseline metrics
- [ ] Research 3-5 solutions
- [ ] Pick top 2 tactics to test

### Weeks 3-4: Quick Wins
- [ ] Launch first experiment
- [ ] Measure daily results
- [ ] Iterate based on feedback
- [ ] Get early wins to build momentum

### Weeks 5-8: Build Systems
- [ ] Scale what's working
- [ ] Document processes
- [ ] Train team
- [ ] Measure weekly progress

### Weeks 9-12: Optimize & Plan
- [ ] Lock in gains
- [ ] Prepare for next constraint
- [ ] Plan next 90 days
- [ ] Celebrate progress

## Key Metrics to Track

**Daily:**
- [Metric relevant to your constraint]

**Weekly:**
- Progress toward goal
- Team feedback
- Blockers and wins

**Monthly:**
- Constraint status
- Financial impact
- Team morale

## Common Mistakes to Avoid

1. **Treating symptoms, not causes** - Focus on the root constraint, not surface problems
2. **Trying too many things at once** - Pick one approach, master it, then add another
3. **Ignoring team input** - Your team sees problems before data does
4. **Not measuring** - What gets measured gets managed
5. **Giving up too early** - Real change takes 90 days minimum

## When to Seek Help

Consider bringing in outside expertise if:
- You've tried for 4 weeks with no progress
- The constraint requires new skills or technology
- Team capacity is the limiting factor
- You need a fresh perspective

## What Happens After 90 Days?

Once you've addressed this constraint, the next bottleneck will emerge. This is normal and actually a sign of progress.

The best operators:
1. Fix current constraint
2. Measure improvement
3. Identify next constraint
4. Repeat the cycle

This is how good businesses become great ones.

---

**Your Next Step:** Pick one tactic from Phase 1 and implement it this week. Don't wait for perfect conditions—start now.
`

export async function getPlaybookContent(vertical: string, constraint: ConstraintType): Promise<string> {
  // In a production app, this would load from the actual playbook files
  // For now, return a template with constraint information
  const title = playbookMapping[vertical]?.[constraint] || `${vertical} - ${constraint} Playbook`

  return `# ${title}\n\n${defaultPlaybookContent}`
}

export async function getPlaybookTitle(vertical: string, constraint: ConstraintType): Promise<string> {
  return playbookMapping[vertical]?.[constraint] || `${vertical} Playbook`
}

export const VERTICALS_PLAYBOOKS = [
  'styling',
  'restaurant',
  'beauty',
  'fitness',
  'legal',
  'waste',
  'retail',
  'beverage',
]
