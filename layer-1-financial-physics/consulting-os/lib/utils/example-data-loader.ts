/**
 * Example Data Loader - Loads example metrics by vertical
 *
 * This utility loads case study data from service-businesses.json
 * and pre-populates calculator forms based on selected vertical.
 */

import serviceBusinesses from '../../data/service-businesses.json';
import type { CalculatorInput } from '../schemas/input-schema';

/**
 * Load case study data for a specific business
 */
export function getCaseStudyData(caseStudyId: number) {
  return serviceBusinesses.caseStudies.find(cs => cs.id === caseStudyId);
}

/**
 * Get all case studies for a vertical
 */
export function getCaseStudiesByVertical(verticalId: string) {
  const vertical = serviceBusinesses.verticals.find(v => v.id === verticalId);
  if (!vertical || !vertical.caseStudies) return [];

  return vertical.caseStudies
    .map(caseStudyId => getCaseStudyData(caseStudyId))
    .filter((cs): cs is typeof serviceBusinesses.caseStudies[0] => cs !== undefined);
}

/**
 * Convert case study data to calculator input format
 */
export function convertCaseStudyToCalculatorInput(
  caseStudy: typeof serviceBusinesses.caseStudies[0]
): CalculatorInput {
  return {
    businessName: caseStudy.name,
    businessDescription: caseStudy.description,
    vertical: {
      verticalId: caseStudy.vertical,
      verticalName: caseStudy.name,
      useExampleData: true,
      exampleName: caseStudy.name,
    },
    metrics: {
      annualRevenue: caseStudy.metrics.annualRevenue,
      netMargin: caseStudy.metrics.netMargin,
      netProfit: caseStudy.metrics.netProfit || 0,
      grossMargin: caseStudy.metrics.netMargin ? undefined : 0.50, // Estimate if not provided
    },
    unitEconomics: {
      customerAcquisitionCost: caseStudy.metrics.cac,
      customerLifetimeValue: caseStudy.metrics.ltv,
      ltvToCacRatio: caseStudy.metrics.ltv_cac_ratio
        ? parseFloat(caseStudy.metrics.ltv_cac_ratio.toString().split(':')[0])
        : undefined,
      closeRate: caseStudy.metrics.closeRate,
    },
    growth: {
      totalCustomers: (caseStudy.metrics as any).totalCustomers,
    },
    constraints: {
      primaryConstraint: 'efficiency' as const, // Default; should be determined by vertical
      constraints: caseStudy.primaryConstraints,
      constraintSeverity: 'high',
    },
  };
}

/**
 * Load example data for vertical with optional specific case study
 */
export function loadExampleForVertical(
  verticalId: string,
  caseStudyName?: string
): CalculatorInput | null {
  const caseStudies = getCaseStudiesByVertical(verticalId);
  if (caseStudies.length === 0) return null;

  // Find specific case study if requested
  let caseStudy = caseStudies[0];
  if (caseStudyName) {
    caseStudy =
      caseStudies.find(cs => cs.name === caseStudyName) || caseStudies[0];
  }

  return convertCaseStudyToCalculatorInput(caseStudy);
}

/**
 * Get all available case studies for UI display
 */
export function getAvailableCaseStudies() {
  return serviceBusinesses.caseStudies.map(cs => ({
    id: cs.id,
    name: cs.name,
    vertical: cs.vertical,
    revenue: cs.metrics.annualRevenue,
    margin: cs.metrics.netMargin,
  }));
}

/**
 * Get vertical characteristics
 */
export function getVerticalInfo(verticalId: string) {
  const vertical = serviceBusinesses.verticals.find(v => v.id === verticalId);
  if (!vertical) return null;

  const caseStudies = getCaseStudiesByVertical(verticalId);

  return {
    id: vertical.id,
    name: vertical.name,
    category: vertical.category,
    description: vertical.description,
    characteristics: vertical.characteristics,
    caseStudies: caseStudies.map(cs => ({
      name: cs.name,
      revenue: cs.metrics.annualRevenue,
      margin: cs.metrics.netMargin,
      constraints: cs.primaryConstraints,
    })),
  };
}

/**
 * Benchmark metrics for a vertical
 */
export function getBenchmarks(verticalId: string) {
  const caseStudies = getCaseStudiesByVertical(verticalId);
  if (caseStudies.length === 0) return null;

  const revenues = caseStudies.map(cs => cs.metrics.annualRevenue);
  const margins = caseStudies.map(cs => cs.metrics.netMargin);
  const cacs = caseStudies
    .map(cs => cs.metrics.cac)
    .filter((v): v is number => v !== undefined && v !== null);
  const ltvs = caseStudies
    .map(cs => cs.metrics.ltv)
    .filter((v): v is number => v !== undefined && v !== null);

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const max = (arr: number[]) => Math.max(...arr);
  const min = (arr: number[]) => Math.min(...arr);

  return {
    revenue: {
      min: min(revenues),
      max: max(revenues),
      avg: avg(revenues),
    },
    margin: {
      min: min(margins),
      max: max(margins),
      avg: avg(margins),
    },
    cac: cacs.length > 0 ? { min: min(cacs), max: max(cacs), avg: avg(cacs) } : null,
    ltv: ltvs.length > 0 ? { min: min(ltvs), max: max(ltvs), avg: avg(ltvs) } : null,
  };
}

/**
 * Find similar businesses by characteristics
 */
export function findSimilarBusinesses(verticalId: string, constraints?: string[]) {
  const vertical = serviceBusinesses.verticals.find(v => v.id === verticalId);
  if (!vertical) return [];

  const caseStudies = getCaseStudiesByVertical(verticalId);

  if (!constraints || constraints.length === 0) {
    return caseStudies;
  }

  // Find case studies with matching constraints
  return caseStudies.filter(cs =>
    constraints.some(constraint =>
      cs.primaryConstraints.some(
        c => c.toLowerCase().includes(constraint.toLowerCase())
      )
    )
  );
}

/**
 * Export case study data for external use (e.g., embedding in content)
 */
export function exportCaseStudyMarkdown(caseStudyId: number): string {
  const cs = getCaseStudyData(caseStudyId);
  if (!cs) return '';

  return `
# ${cs.name}

**Vertical:** ${cs.vertical}
**Revenue:** $${cs.metrics.annualRevenue.toLocaleString()}
**Net Margin:** ${(cs.metrics.netMargin * 100).toFixed(1)}%

## Metrics
- CAC: $${cs.metrics.cac || 'N/A'}
- LTV: $${cs.metrics.ltv || 'N/A'}
- LTV:CAC: ${cs.metrics.ltv_cac_ratio || 'N/A'}

## Primary Constraints
${cs.primaryConstraints.map(c => `- ${c}`).join('\n')}

## Growth Recommendations
${cs.growthRecommendations.map(r => `- ${r}`).join('\n')}
`;
}
