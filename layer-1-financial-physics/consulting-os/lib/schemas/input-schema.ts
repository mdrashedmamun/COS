/**
 * Calculator Input Schema - Extended with Vertical Selection
 *
 * Defines the input structure for the Growth Physics Calculator,
 * including vertical selection and example data pre-population.
 */

import { z } from 'zod';

/**
 * Vertical Selector - Pre-selects vertical and example data
 */
export const VerticalSelectorSchema = z.object({
  verticalId: z.string().optional().describe('Selected service vertical ID'),
  verticalName: z.string().optional().describe('Selected vertical display name'),
  useExampleData: z.boolean().default(false).describe('Whether to use example metrics for this vertical'),
  exampleName: z.string().optional().describe('Which example to use from vertical'),
});

export type VerticalSelector = z.infer<typeof VerticalSelectorSchema>;

/**
 * Core Business Metrics - Financial and operational metrics
 */
export const BusinessMetricsSchema = z.object({
  annualRevenue: z.number().positive().describe('Annual revenue in dollars'),
  netMargin: z.number().min(-1).max(1).describe('Net profit margin (-1 to 1)'),
  netProfit: z.number().describe('Annual net profit in dollars'),

  // Optional: calculated from revenue and margin
  grossMargin: z.number().min(0).max(1).optional().describe('Gross profit margin'),
  operatingCost: z.number().nonnegative().optional().describe('Operating costs as % of revenue'),
});

export type BusinessMetrics = z.infer<typeof BusinessMetricsSchema>;

/**
 * Unit Economics - Customer acquisition and lifetime value
 */
export const UnitEconomicsSchema = z.object({
  customerAcquisitionCost: z.number().nonnegative().optional().describe('CAC in dollars'),
  customerLifetimeValue: z.number().nonnegative().optional().describe('LTV in dollars'),
  ltvToCacRatio: z.number().optional().describe('LTV:CAC ratio (e.g., 3:1)'),

  // Sales metrics
  closeRate: z.number().min(0).max(1).optional().describe('Sales close rate (0 to 1)'),
  averageOrderValue: z.number().nonnegative().optional().describe('Average order/deal value'),

  // Retention
  monthlyChurnRate: z.number().min(0).max(1).optional().describe('Monthly churn rate (0 to 1)'),
  annualRetention: z.number().min(0).max(1).optional().describe('Annual retention rate (0 to 1)'),
});

export type UnitEconomics = z.infer<typeof UnitEconomicsSchema>;

/**
 * Growth Metrics - Key performance indicators for growth
 */
export const GrowthMetricsSchema = z.object({
  monthlyRecurringRevenue: z.number().nonnegative().optional().describe('MRR in dollars'),
  monthlyGrowthRate: z.number().min(-1).max(1).optional().describe('Month-over-month growth (-1 to 1)'),

  // Lead funnel
  leadVolume: z.number().nonnegative().optional().describe('Monthly leads'),
  conversionRate: z.number().min(0).max(1).optional().describe('Lead to customer conversion (0 to 1)'),

  // Customer base
  totalCustomers: z.number().nonnegative().optional().describe('Total active customers'),
  activeSubscribers: z.number().nonnegative().optional().describe('Active recurring customers'),

  // Operational
  costPerLead: z.number().nonnegative().optional().describe('Marketing cost per lead'),
  operationalEfficiency: z.number().min(0).max(1).optional().describe('Efficiency ratio (0 to 1)'),
});

export type GrowthMetrics = z.infer<typeof GrowthMetricsSchema>;

/**
 * Constraints Assessment - Primary growth bottlenecks
 */
export const ConstraintsSchema = z.object({
  primaryConstraint: z.enum([
    'demand',
    'delivery',
    'efficiency',
    'quality',
    'capital',
    'retention',
    'pricing',
  ]).describe('Primary growth bottleneck'),

  constraints: z.array(z.string()).optional().describe('List of identified constraints'),
  constraintSeverity: z.enum(['low', 'medium', 'high']).describe('How severe the primary constraint is'),
});

export type Constraints = z.infer<typeof ConstraintsSchema>;

/**
 * Full Calculator Input Schema - Combines all input sections
 */
export const CalculatorInputSchema = z.object({
  // Identification
  businessName: z.string().optional().describe('Name of the business'),
  businessDescription: z.string().optional().describe('Brief description of the business'),

  // Vertical selection and examples
  vertical: VerticalSelectorSchema.optional(),

  // Core metrics
  metrics: BusinessMetricsSchema,

  // Unit economics (optional, can be derived or calculated)
  unitEconomics: UnitEconomicsSchema.optional(),

  // Growth indicators (optional)
  growth: GrowthMetricsSchema.optional(),

  // Constraints assessment (optional)
  constraints: ConstraintsSchema.optional(),

  // Metadata
  timestamp: z.date().default(() => new Date()).describe('When input was created'),
  userId: z.string().optional().describe('User ID if applicable'),
});

export type CalculatorInput = z.infer<typeof CalculatorInputSchema>;

/**
 * Example Inputs by Vertical - Pre-populated calculator values
 */
export const ExampleInputsByVertical: Record<string, CalculatorInput> = {
  'waste-management': {
    businessName: 'Garvey Disposal',
    businessDescription: 'Garbage collection and waste management service',
    vertical: {
      verticalId: 'waste-management',
      verticalName: 'Waste Management',
      useExampleData: true,
      exampleName: 'Garvey Disposal',
    },
    metrics: {
      annualRevenue: 642000,
      netMargin: -0.23,
      netProfit: -151000,
      grossMargin: 0.45,
    },
    unitEconomics: {
      customerAcquisitionCost: 67,
      customerLifetimeValue: 1300,
      ltvToCacRatio: 19.4,
      closeRate: 0.33,
    },
    growth: {
      totalCustomers: 300,
      monthlyChurnRate: 0.02,
    },
    constraints: {
      primaryConstraint: 'efficiency',
      constraints: ['Negative net margin', 'Route inefficiency', 'Asset utilization'],
      constraintSeverity: 'high',
    },
  },

  'personal-styling': {
    businessName: 'AC Styles',
    businessDescription: 'Personal styling and fashion consulting services',
    vertical: {
      verticalId: 'personal-styling',
      verticalName: 'Personal Styling',
      useExampleData: true,
      exampleName: 'AC Styles',
    },
    metrics: {
      annualRevenue: 309000,
      netMargin: 0.42,
      netProfit: 130000,
      grossMargin: 0.85,
    },
    unitEconomics: {
      customerAcquisitionCost: 600,
      customerLifetimeValue: 10000,
      ltvToCacRatio: 16.7,
      closeRate: 0.50,
      monthlyChurnRate: 0.0021,
      annualRetention: 0.975,
    },
    growth: {
      monthlyRecurringRevenue: 8500,
      totalCustomers: 40,
      leadVolume: 12,
      conversionRate: 0.33,
    },
    constraints: {
      primaryConstraint: 'demand',
      constraints: ['Lead volume limited', 'Lead magnet ineffective', 'Conversion optimization needed'],
      constraintSeverity: 'medium',
    },
  },

  'health-fitness': {
    businessName: 'Kyo Chiropractic Chain',
    businessDescription: 'Multi-location chiropractic services',
    vertical: {
      verticalId: 'health-fitness',
      verticalName: 'Health & Fitness Services',
      useExampleData: true,
      exampleName: 'Kyo Chiropractic',
    },
    metrics: {
      annualRevenue: 5200000,
      netMargin: 0.23,
      netProfit: 1196000,
      grossMargin: 0.58,
    },
    unitEconomics: {
      customerAcquisitionCost: 700,
      customerLifetimeValue: 3400,
      ltvToCacRatio: 4.9,
      closeRate: 0.71,
    },
    growth: {
      leadVolume: 35,
      monthlyGrowthRate: 0.12,
      totalCustomers: 1500,
    },
    constraints: {
      primaryConstraint: 'demand',
      constraints: ['Lead flow insufficient', 'High close rate signals pricing opportunity'],
      constraintSeverity: 'medium',
    },
  },

  'beauty-services': {
    businessName: 'Amy Lash and Beauty',
    businessDescription: 'Eyelash extensions and beauty services chain',
    vertical: {
      verticalId: 'beauty-services',
      verticalName: 'Beauty & Personal Care',
      useExampleData: true,
      exampleName: 'Amy Lash',
    },
    metrics: {
      annualRevenue: 2300000,
      netMargin: 0.28,
      netProfit: 644000,
      grossMargin: 0.68,
    },
    growth: {
      monthlyRecurringRevenue: 191667,
      totalCustomers: 800,
      activeSubscribers: 600,
    },
    constraints: {
      primaryConstraint: 'delivery',
      constraints: ['Technician capacity limited', 'Quality consistency across locations', 'Staff retention'],
      constraintSeverity: 'high',
    },
  },

  'food-service': {
    businessName: 'Basil & Co Thai Restaurant',
    businessDescription: 'Full-service Thai restaurant with multi-channel revenue',
    vertical: {
      verticalId: 'food-service',
      verticalName: 'Food Service & Restaurants',
      useExampleData: true,
      exampleName: 'Basil & Co',
    },
    metrics: {
      annualRevenue: 3500000,
      netMargin: 0.19,
      netProfit: 665000,
      grossMargin: 0.60,
    },
    growth: {
      monthlyRecurringRevenue: 291667,
      operationalEfficiency: 0.75,
    },
    constraints: {
      primaryConstraint: 'efficiency',
      constraints: ['Thin margins typical', 'Channel mix optimization needed', 'Labor cost pressure'],
      constraintSeverity: 'medium',
    },
  },
};

/**
 * Helper function - Load example data for a vertical
 */
export function getExampleInputForVertical(verticalId: string): CalculatorInput | null {
  return ExampleInputsByVertical[verticalId] || null;
}

/**
 * Helper function - Get available examples
 */
export function getAvailableExamples(): Array<{
  verticalId: string;
  businessName: string;
}> {
  return Object.entries(ExampleInputsByVertical).map(([verticalId, input]) => ({
    verticalId,
    businessName: input.businessName || verticalId,
  }));
}
