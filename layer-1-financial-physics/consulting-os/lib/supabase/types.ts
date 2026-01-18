export interface Diagnosis {
  id: string
  user_id: string
  primary_constraint: string
  confidence: number
  explanation: string
  revenue: number
  margin: number
  cac: number
  ltv: number
  pain_point: string
  vertical?: string
  customer_type?: string
  customer_trigger?: string
  acquisition_channel?: string
  meta_analysis?: Record<string, any>
  reasoning?: Record<string, any>
  alternative_constraints?: Record<string, any>
  next_steps?: Record<string, any>
  created_at: string
  updated_at: string
}
