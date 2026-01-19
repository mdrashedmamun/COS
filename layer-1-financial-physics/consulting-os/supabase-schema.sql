-- ============================================================================
-- Consulting OS: Supabase Database Schema
-- ============================================================================
-- This schema creates the diagnoses table with proper RLS policies for user isolation
-- Run this SQL in your Supabase project's SQL editor
-- ============================================================================

-- ============================================================================
-- CREATE DIAGNOSES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Core diagnosis fields
  primary_constraint TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  explanation TEXT NOT NULL,

  -- Metrics
  revenue NUMERIC NOT NULL,
  margin NUMERIC NOT NULL,
  cac NUMERIC NOT NULL,
  ltv NUMERIC NOT NULL,
  pain_point TEXT NOT NULL,
  vertical TEXT,

  -- Positioning context (optional)
  customer_type TEXT,
  customer_trigger TEXT,
  acquisition_channel TEXT,

  -- Meta analysis (flexible JSON for future enhancements)
  meta_analysis JSONB,
  reasoning JSONB,
  alternative_constraints JSONB,
  next_steps JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Fast lookup by user
CREATE INDEX IF NOT EXISTS idx_diagnoses_user_id ON diagnoses(user_id);

-- Fast sorting by creation date
CREATE INDEX IF NOT EXISTS idx_diagnoses_created_at ON diagnoses(created_at DESC);

-- Fast lookup by constraint type (for analytics)
CREATE INDEX IF NOT EXISTS idx_diagnoses_constraint ON diagnoses(primary_constraint);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Policy 1: Users can view only their own diagnoses
CREATE POLICY "users_can_view_own_diagnoses"
  ON diagnoses FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Users can insert only their own diagnoses
CREATE POLICY "users_can_insert_own_diagnoses"
  ON diagnoses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update only their own diagnoses
CREATE POLICY "users_can_update_own_diagnoses"
  ON diagnoses FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy 4: Users can delete only their own diagnoses
CREATE POLICY "users_can_delete_own_diagnoses"
  ON diagnoses FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_diagnoses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ATTACH TRIGGER TO DIAGNOSES TABLE
-- ============================================================================

DROP TRIGGER IF EXISTS diagnoses_updated_at_trigger ON diagnoses;

CREATE TRIGGER diagnoses_updated_at_trigger
  BEFORE UPDATE ON diagnoses
  FOR EACH ROW
  EXECUTE FUNCTION update_diagnoses_updated_at();

-- ============================================================================
-- VERIFICATION QUERIES (run after setup to verify)
-- ============================================================================

-- Check table exists and has correct structure
-- SELECT * FROM information_schema.tables WHERE table_name = 'diagnoses';

-- Check RLS is enabled
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'diagnoses';

-- Check policies are in place
-- SELECT * FROM pg_policies WHERE tablename = 'diagnoses';

-- ============================================================================
-- EXAMPLE DATA (OPTIONAL - Remove in production)
-- ============================================================================
-- Uncomment to test with sample data after setting up auth users

-- INSERT INTO diagnoses (
--   user_id,
--   primary_constraint,
--   confidence,
--   explanation,
--   revenue,
--   margin,
--   cac,
--   ltv,
--   pain_point,
--   vertical,
--   meta_analysis,
--   reasoning,
--   next_steps
-- ) VALUES (
--   auth.uid(), -- Replace with actual user UUID
--   'demand',
--   85,
--   'Your business has strong margins and reasonable acquisition costs, but you are not getting enough customers.',
--   500000,
--   0.20,
--   150,
--   1500,
--   'cant_get_leads',
--   'styling',
--   '{"potentialRevenueLift": "$150,000 - $300,000 annual revenue"}',
--   '["High margin (20%) suggests unit economics can support growth spending", "CAC ($150) is reasonable relative to LTV ($1,500)", "Pain point points to acquisition as the bottleneck"]',
--   '["Week 1: Map current customer acquisition channels", "Week 2-4: Test paid ads with $2K budget", "Week 5-8: Optimize high-performing channels", "Week 9-12: Scale winning channels to $5K+ monthly spend"]'
-- );

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
