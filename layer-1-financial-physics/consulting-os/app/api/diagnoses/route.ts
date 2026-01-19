import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/diagnoses - List user's diagnoses
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('diagnoses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ diagnoses: data })
}

// POST /api/diagnoses - Create new diagnosis
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('diagnoses')
      .insert({
        user_id: user.id,
        primary_constraint: body.primaryConstraint,
        confidence: body.confidence,
        explanation: body.explanation,
        revenue: body.metrics?.revenue || body.revenue,
        margin: body.metrics?.margin || body.margin,
        cac: body.metrics?.cac || body.cac,
        ltv: body.metrics?.ltv || body.ltv,
        pain_point: body.metrics?.painPoint || body.painPoint,
        vertical: body.vertical,
        customer_type: body.positioningContext?.customerType,
        customer_trigger: body.positioningContext?.customerTrigger,
        acquisition_channel: body.positioningContext?.acquisitionChannel,
        meta_analysis: body.metaAnalysis,
        reasoning: body.reasoning,
        alternative_constraints: body.alternativeConstraints,
        next_steps: body.nextSteps,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ diagnosis: data })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
