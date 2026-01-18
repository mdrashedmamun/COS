/**
 * Verticals Schema - Service Business Vertical Definitions
 *
 * Defines the structure and enums for service business verticals,
 * supporting featured vs. waitlist categorization and metadata.
 */

/**
 * Vertical Status - determines visibility and feature availability
 */
export enum VerticalStatus {
  FEATURED = 'featured',        // Fully supported with playbook and examples
  COMING_SOON = 'coming_soon',  // Planned, can accept waitlist signups
  WAITLIST = 'waitlist',        // Not yet available
  ARCHIVED = 'archived',        // Previously supported, no longer active
}

/**
 * Service Business Model - categorizes how service is delivered and monetized
 */
export enum ServiceBusinessModel {
  RECURRING_SUBSCRIPTION = 'recurring_subscription',    // Monthly/annual recurring
  APPOINTMENT_BASED = 'appointment_based',              // Individual appointments, recurring
  PROJECT_BASED = 'project_based',                      // Discrete projects with start/end
  HYBRID = 'hybrid',                                    // Mix of recurring and projects
  MULTI_CHANNEL = 'multi_channel',                      // Multiple revenue streams (food service)
  RETAINER = 'retainer',                                // Monthly recurring advisory/support
}

/**
 * Scaling Constraint - primary bottleneck for growth in this vertical
 */
export enum ScalingConstraint {
  DEMAND = 'demand',                // Lead volume, awareness, customer acquisition
  DELIVERY = 'delivery',            // Technician capacity, service provider availability
  EFFICIENCY = 'efficiency',        // Margin recovery through operations
  QUALITY = 'quality',              // Consistency and quality preservation
  CAPITAL = 'capital',              // Requires significant upfront investment
  RETENTION = 'retention',          // Churn and repeat/loyalty
  PRICING = 'pricing',              // Commoditization pressure, pricing power
}

/**
 * Growth Stage - identifies the typical growth phase where this vertical operates
 */
export enum GrowthStage {
  FOUNDER_LED = 'founder_led',        // Single person, 1-5 clients
  TEAM_BUILDING = 'team_building',    // 5-50 clients, small team
  SYSTEMIZED = 'systemized',          // 50+ clients, documented processes
  MULTI_UNIT = 'multi_unit',          // Multiple locations/units
  FRANCHISE_READY = 'franchise_ready', // Ready to replicate model
}

/**
 * Margin Profile - expected profitability range for this vertical
 */
export enum MarginProfile {
  THIN = 'thin',           // 15-25% net margin
  HEALTHY = 'healthy',     // 25-40% net margin
  STRONG = 'strong',       // 40-60% net margin
  PREMIUM = 'premium',     // 60%+ net margin
}

/**
 * Featured Vertical IDs - supported verticals with playbooks
 */
export enum FeaturedVerticalId {
  WASTE_MANAGEMENT = 'waste-management',
  PERSONAL_STYLING = 'personal-styling',
  HEALTH_FITNESS = 'health-fitness',
  HYBRID_RETAIL_SERVICE = 'hybrid-retail-service',
  HOSPITALITY_BEVERAGE = 'hospitality-beverage',
  PROFESSIONAL_SERVICES = 'professional-services',
  BEAUTY_SERVICES = 'beauty-services',
  FOOD_SERVICE = 'food-service',
}

/**
 * Waitlist Vertical IDs - planned future verticals
 */
export enum WaitlistVerticalId {
  SOFTWARE_SAAS = 'software-saas',
  INSURANCE_FINANCIAL = 'insurance-financial',
  MEMBERSHIP_BASED = 'membership-based',
  SUBSCRIPTION_SERVICES = 'subscription-services',
  AGENCY_CREATIVE = 'agency-creative',
  TECHNOLOGY_IT = 'technology-it',
  REAL_ESTATE = 'real-estate',
  HR_RECRUITMENT = 'hr-recruitment',
  EDUCATIONAL = 'educational',
  MANUFACTURING = 'manufacturing',
  LOGISTICS = 'logistics',
  ENGINEERING = 'engineering',
  ENERGY_UTILITIES = 'energy-utilities',
}

/**
 * Vertical Metadata - comprehensive information about a service vertical
 */
export interface VerticalMetadata {
  id: string;
  name: string;
  status: VerticalStatus;
  serviceModel: ServiceBusinessModel;
  scalingConstraint: ScalingConstraint;
  growthStage: GrowthStage;
  marginProfile: MarginProfile;

  // Display and documentation
  description: string;
  icon?: string; // Icon name for UI
  color?: string; // Color for UI representation
  emoji?: string; // Emoji shorthand

  // Case study reference
  caseStudyId?: number; // Reference to case study in service-businesses.json
  caseStudyName?: string;

  // Examples and benchmarks
  exampleRevenue?: number; // Example annual revenue (in dollars)
  exampleMargin?: number; // Example net margin (0.25 = 25%)
  ltv?: number; // Typical customer LTV
  cac?: number; // Typical customer acquisition cost

  // Availability
  dateAdded?: string; // ISO date when vertical was added
  comingSoonDate?: string; // ISO date when planned to launch (if coming_soon)
  playbookUrl?: string; // URL to detailed playbook

  // Characteristics and keywords
  characteristics: string[];
  keywords: string[];

  // Related verticals (similar models or constraints)
  relatedVerticals?: string[];

  // Scaling information
  typicalScalePattern?: 'single_location' | 'multi_location' | 'distributed_network';
  capitalIntensity?: 'low' | 'medium' | 'high';
  laborIntensity?: 'low' | 'medium' | 'high';
}

/**
 * Vertical Configuration - all verticals organized by status
 */
export interface VerticalConfiguration {
  featured: VerticalMetadata[];
  comingSoon: VerticalMetadata[];
  waitlist: VerticalMetadata[];
  archived?: VerticalMetadata[];
}

/**
 * Calculator Input with Vertical - extends input schema with vertical selection
 */
export interface CalculatorInputWithVertical {
  verticalId?: string;
  verticalName?: string;
  // ... other calculator fields
}

/**
 * Growth Recommendation - vertical-specific recommendation
 */
export interface GrowthRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  constraint: ScalingConstraint;
  formulaApplied?: string;
}

/**
 * Vertical-Specific Examples - pre-populated calculator examples by vertical
 */
export interface VerticalExamples {
  verticalId: string;
  examples: Array<{
    name: string;
    description: string;
    businessMetrics: {
      annualRevenue: number;
      netMargin: number;
      cac?: number;
      ltv?: number;
      growtRate?: number;
    };
  }>;
}

/**
 * Vertical Query Helpers
 */
export class VerticalQuery {
  /**
   * Get all featured verticals
   */
  static getFeaturedVerticals(config: VerticalConfiguration): VerticalMetadata[] {
    return config.featured;
  }

  /**
   * Get vertical by ID
   */
  static getVerticalById(id: string, config: VerticalConfiguration): VerticalMetadata | undefined {
    return [
      ...config.featured,
      ...config.comingSoon,
      ...config.waitlist,
      ...(config.archived || []),
    ].find(v => v.id === id);
  }

  /**
   * Get verticals by scaling constraint
   */
  static getVerticalsByConstraint(
    constraint: ScalingConstraint,
    config: VerticalConfiguration
  ): VerticalMetadata[] {
    return config.featured.filter(v => v.scalingConstraint === constraint);
  }

  /**
   * Get verticals by service model
   */
  static getVerticalsByModel(
    model: ServiceBusinessModel,
    config: VerticalConfiguration
  ): VerticalMetadata[] {
    return config.featured.filter(v => v.serviceModel === model);
  }

  /**
   * Get verticals by margin profile
   */
  static getVerticalsByMargin(
    margin: MarginProfile,
    config: VerticalConfiguration
  ): VerticalMetadata[] {
    return config.featured.filter(v => v.marginProfile === margin);
  }

  /**
   * Search verticals by keyword
   */
  static searchVerticals(query: string, config: VerticalConfiguration): VerticalMetadata[] {
    const q = query.toLowerCase();
    return config.featured.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.keywords.some(k => k.toLowerCase().includes(q))
    );
  }
}

/**
 * Export all IDs for easy access
 */
export const AllVerticalIds = {
  Featured: FeaturedVerticalId,
  Waitlist: WaitlistVerticalId,
};
