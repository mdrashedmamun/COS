import { ConstraintType, DiagnosisInput } from '@/lib/schemas/diagnosis-schema'
import { generatePersonalizedPlaybook, PersonalizedPlaybook } from './playbook-personalizer'

/**
 * Load personalized playbook for a constraint
 * Uses the user's metrics to personalize the content
 */
export async function getPersonalizedPlaybook(
  constraint: ConstraintType,
  input: DiagnosisInput
): Promise<PersonalizedPlaybook> {
  return generatePersonalizedPlaybook(constraint, input)
}

/**
 * Format playbook for display
 */
export async function formatPlaybookAsMarkdown(playbook: PersonalizedPlaybook): Promise<string> {
  let markdown = `# ${playbook.title}\n\n`

  // Business Context
  markdown += `## Your Situation\n\n${playbook.businessContext}\n\n`

  // Current State
  markdown += `## Current State\n\n${playbook.currentState}\n\n`

  // Target State
  markdown += `## Target State\n\n${playbook.targetState}\n\n`

  // 90-Day Roadmap
  markdown += `## 90-Day Implementation Roadmap\n\n`
  playbook.roadmap.forEach((phase, idx) => {
    markdown += `### ${phase.phase}\n\n`
    markdown += `**Timeframe:** ${phase.timeframe}\n\n`

    markdown += `**Objectives:**\n`
    phase.objectives.forEach((obj) => {
      markdown += `- ${obj}\n`
    })
    markdown += '\n'

    markdown += `**Actions:**\n`
    phase.actions.forEach((action) => {
      markdown += `- ${action}\n`
    })
    markdown += '\n'

    markdown += `**Success Criteria:**\n`
    phase.successCriteria.forEach((criteria) => {
      markdown += `- ${criteria}\n`
    })
    markdown += '\n'

    markdown += `**Risks:**\n`
    phase.risks.forEach((risk) => {
      markdown += `- ${risk}\n`
    })
    markdown += '\n'
  })

  // Key Metrics
  markdown += `## Key Metrics to Track\n\n`
  markdown += `| Metric | Current | Target | Frequency |\n`
  markdown += `|--------|---------|--------|----------|\n`
  playbook.keyMetrics.forEach((metric) => {
    markdown += `| ${metric.name} | ${metric.current} | ${metric.target} | ${metric.frequency} |\n`
  })
  markdown += '\n'

  // Critical Actions
  markdown += `## Critical Actions This Week\n\n`
  playbook.criticalActions.forEach((action, idx) => {
    markdown += `${idx + 1}. ${action}\n`
  })
  markdown += '\n'

  // Resources
  markdown += `## Resources\n\n`
  playbook.resources.forEach((resource) => {
    markdown += `**${resource.title}** (${resource.type})\n`
    markdown += `${resource.description}\n\n`
  })

  return markdown
}

/**
 * Get playbook content as formatted markdown
 */
export async function getPlaybookContent(
  constraint: ConstraintType,
  input: DiagnosisInput
): Promise<string> {
  const playbook = await getPersonalizedPlaybook(constraint, input)
  return formatPlaybookAsMarkdown(playbook)
}

/**
 * Get playbook title
 */
export async function getPlaybookTitle(constraint: ConstraintType, input: DiagnosisInput): Promise<string> {
  const playbook = await getPersonalizedPlaybook(constraint, input)
  return playbook.title
}
