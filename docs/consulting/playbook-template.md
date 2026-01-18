# Playbook Template

Template and guide for creating new simulation playbooks following the consulting framework methodology. This template includes instructions for each of the 11 sections and examples from existing playbooks.

## Before You Start

### Prerequisites
- **Audio/Video transcript** of a business teardown session (or interview with business operator)
- **Verbatim quotes** with timestamps from the transcript
- **Financial data** from the business (revenue, profit, CAC, LTV, margins, channel breakdown)
- **Decision logic** showing how constraints were diagnosed and solutions were developed

### Timeline
- 2-3 hours to extract business data from transcript
- 2-3 hours to structure playbook and write content
- 1-2 hours for review and refinement
- **Total: 5-8 hours per playbook**

### Success Criteria
- [ ] All 11 sections completed
- [ ] At least 8-10 verbatim quotes with timestamps
- [ ] All metrics calculated and verified
- [ ] Decision rules clearly stated with evidence
- [ ] Book frameworks applied with page references
- [ ] Ready for another practitioner to use on similar business

---

## 11-Section Playbook Template

### Section 1: Title and Metadata

**Purpose**: Identify the business model and source of data

**Template**:
```markdown
# [Number] [Business Name] - Simulation Playbook ([Business Type])

Timestamp: YYYY-MM-DD HH:MM:SS +TZ
Source: transcripts/[path]/[filename.rtf]
```

**Instructions**:
- Number sequentially (01, 02, 03, etc.)
- Name should describe business model clearly
- Business type: "Service", "Recurring", "Multi-location", "Consulting", etc.
- Timestamp: When the analysis was created
- Source: Path to the original transcript file

**Example**:
```markdown
# 05 Beverage Consulting - Simulation Playbook (Service)

Timestamp: 2026-01-16 16:40:00 +06
Source: transcripts/100M/05 Building a $3,000,000 Business for a Stranger in 57 Mins .rtf
```

---

### Section 2: How to Use This

**Purpose**: Explain that this is reproducible and must be followed systematically

**Template**:
```markdown
## How to Use This
This is a reproducible teardown playbook. Follow the steps in order, collect the minimum inputs, and produce the outputs exactly as written. If you use assumptions, log them and label the result as scenario.
```

**Instructions**:
- Keep this standard across all playbooks
- Emphasizes reproducibility
- Points to Assumptions Log at end

---

### Section 3: Business Snapshot (Verbatim Anchors)

**Purpose**: Provide exact quotes that establish credibility and allow future verification

**Template**:
```markdown
## Business Snapshot (Verbatim Anchors)
- "Quote here with specific business data" [M:SS]
- "Another quote establishing context" [M:SS]
- "Key quote about constraint or problem" [M:SS]
- [Continue with 8-15 quotes total]
```

**Instructions**:
1. Extract verbatim quotes from transcript
2. Include timestamps in [M:SS] format (minutes:seconds)
3. Focus quotes on:
   - Revenue and profit numbers
   - Customer types/avatars
   - Key pain points
   - Pricing/offer structure
   - Lead channels and conversion
   - Operational constraints
4. Aim for 8-15 total quotes
5. Organize roughly in order: metrics → constraints → decisions

**Extraction Process**:
1. Read/watch entire transcript first
2. Note timestamps of key data points
3. Go back and extract exact quotes
4. Verify spelling and punctuation from transcript
5. Organize quotes logically

**Example** (from Personal Styling):
```markdown
- "Revenue we make about 309,000 annually" [0:31]
- "130,000 in profits that gives us about 42% in net margins" [0:37]
- "Blended CAC of 600 um LTV is 10K annually so that gives us a 16 to1 LTV to CAC ratio" [6:56]
```

**Key principle**: These quotes are the "evidence trail" - future practitioners must be able to verify your methodology by checking timestamps.

---

### Section 4: Required Inputs (Minimum to Simulate)

**Purpose**: Specify what data is needed to run this playbook on a new business

**Template**:
```markdown
## Required Inputs (Minimum to Simulate)
- Data point 1
- Data point 2
- Data point 3
- [Continue with 8-12 key inputs]
```

**Instructions**:
1. Extract all financial/operational data mentioned in the playbook
2. Focus on "must-have" data (minimum to simulate)
3. Don't include "nice-to-have" data
4. Organize by category (financial, operational, market)
5. Each input should be actionable/measurable

**Categories of inputs**:
- **Financial**: Revenue, profit, margins, CAC, LTV, pricing
- **Operational**: Customer count, conversion rates, churn, capacity
- **Market**: Customer types/avatars, lead sources, channels, market size
- **Strategic**: Current offer structure, key constraints, goals

**Example** (from Beverage):
```markdown
## Required Inputs (Minimum to Simulate)
- Target avatar criteria (revenue, business type, operating status)
- Current revenue and net profit margin
- Core offer price and deliverables
- Upsell/retainer price and take rate
- CAC and LTV (or enough to compute LTV:CAC)
- Lead sources and funnel steps
- Close rate and sales cycle length
- Retention/churn for any continuity offers
- Fulfillment constraints (who delivers, on-site vs remote)
```

**Format tip**: Use bullet points, keep each input to one line, be specific about what data is needed.

---

### Section 5: Derived Metrics (From Transcript Numbers)

**Purpose**: Show calculated metrics extracted from the business snapshot

**Template**:
```markdown
## Derived Metrics (From Transcript Numbers)
- Metric 1: [value] (calculation shown if relevant)
- Metric 2: [value] (calculated from X and Y)
- Metric 3: [value] (stated directly at [M:SS])
- [Continue with all relevant metrics]
```

**Instructions**:
1. Calculate metrics using formulas from metrics-glossary.md
2. Show calculation when derived from multiple data points
3. Reference timestamp when metric is stated directly
4. Include all key metrics:
   - Net margin, Gross margin
   - CAC (if calculable)
   - LTV (if calculable)
   - LTV:CAC ratio
   - Close rate, Show rate
   - Payback period (if calculable)
   - Customer lifetime
   - Churn rate
5. Verify all math before including

**Verification checklist**:
- [ ] All calculations match the data
- [ ] Metrics are from transcript or clearly calculated
- [ ] Timestamps reference the source data
- [ ] Metrics align with "Required Inputs" section

**Example** (from Personal Styling):
```markdown
## Derived Metrics (From Transcript Numbers)
- Net margin: 130,000 / 309,000 = 42%
- Lead to sale: 4 sales / 12 leads = 33%
- Appointment to sale: 4 sales / 8 appointments = 50%
- Churn: 1 / 40 = 2.5% annual churn
- LTV:CAC: 10,000 / 600 = 16:1
```

---

### Section 6: Step-by-Step Teardown Process

**Purpose**: Walk through the consulting methodology systematically, showing how constraints are diagnosed and decisions are made

**Template**:
```markdown
## Step-by-Step Teardown Process

### Step 1: [Goal Statement]
Goal: [What question are we answering?]

Evidence:
- "Verbatim quote" [M:SS]
- "Another relevant quote" [M:SS]

Decision rule:
- If [condition], then [action]

Output:
- [What decision/finding comes from this step]

### Step 2: [Next Goal]
Goal: [Next question]

Evidence:
- "Quote" [M:SS]

Decision rule:
- If [condition], then [action]

Output:
- [Decision/finding]

[Continue with 6-10 steps total]
```

**Instructions**:
1. Review transcript and identify 6-10 key decision points
2. For each decision:
   - **Goal**: What problem is being solved?
   - **Evidence**: 1-2 verbatim quotes supporting the analysis
   - **Decision rule**: Conditional statement ("If X, then Y")
   - **Output**: What gets documented/decided
3. Steps should build on each other
4. Each step should move closer to the final Growth Physics Brief
5. Decision rules should be testable on other businesses

**Decision Rule Format**:
- Always use "If [condition], then [action]" format
- Condition should be measurable/observable
- Action should be specific and actionable
- Should be applicable to other businesses with similar constraints

**Common Step Structures**:
- **Diagnosis steps**: Identify constraint (profitability, lead flow, conversion, fulfillment)
- **Analysis steps**: Analyze each component (offer, channel, pricing, operations)
- **Decision steps**: Choose direction (avatar, channel, offer structure)
- **Implementation steps**: Plan execution

**Example** (from Garbage Collection):
```markdown
### Step 1: Diagnose the Primary Constraint (Profitability)
Goal: Identify the core failure that blocks growth.

Evidence:
- "Our net margins are negative 23%." [0:26]
- "We need to become profitable." [0:33]

Decision rule:
- If net margin is negative, fix unit economics and cash flow before scaling lead volume.

Output:
- Constraint statement: "Business is cash-flow negative; fix offer and cash timing before scaling."
```

**Step creation process**:
1. Watch/read transcript
2. Identify moments where a key decision is made
3. Note the timestamp
4. Extract evidence (quotes) supporting decision
5. Write the decision rule ("If X, then Y")
6. Document the output/decision
7. Move to next major decision point

---

### Section 7: Book Frameworks Applied (With Examples)

**Purpose**: Show how the consulting frameworks from the 3 reference books apply to this specific business

**Template**:
```markdown
## Book Frameworks Applied (With Examples)

### 100M Offers - [Framework Name] (Applied)
Framework quote:
- 100M Offers, p. XX: "[Quote from book]"
  - [Book concept 1]
  - [Book concept 2]

Example mapping for [business/avatar]:
- [How framework applies to this business]

Additional offer anchors:
- 100M Offers, p. XX: "[Quote]"

### 100M Leads - [Framework Name] (Applied)
Framework quote:
- 100M Leads, p. XX: "[Quote from book]"

Example application:
- [How this applies to this business]

### 100M Money Models - [Framework Name] (Applied)
Framework quote:
- 100M Money Models, p. XX: "[Quote from book]"

Example application:
- [How this applies to this business]
```

**Instructions**:
1. Read the 3 reference books (see /Books/ directory)
2. Identify which frameworks apply to this business
3. For each framework:
   - Find the exact page reference
   - Quote the key framework component
   - Explain how it maps to this business
   - Provide specific example
4. Focus on frameworks that directly influenced recommendations
5. Not all frameworks apply to every business (that's OK)

**Common frameworks by book**:

**100M Offers**:
- Value Equation (4 drivers of value)
- The pain is the pitch
- Offer packaging variations
- Price anchoring

**100M Leads**:
- Lead magnet types and criteria
- Direct response marketing
- Lead qualification
- Channel selection by avatar

**100M Money Models**:
- Recurring vs. one-time revenue
- Retention as multiplier
- Pricing models
- Unit economics

**Example** (from Garbage Collection):
```markdown
### 100M Offers - Value Equation (Applied)
Framework quote:
- 100M Offers, p. 62: "There are four primary drivers of value."
  - "The Dream Outcome" (increase)
  - "Perceived Likelihood of Achievement" (increase)
  - "Perceived Time Delay Between Start and Achievement" (decrease)
  - "Perceived Effort & Sacrifice" (decrease)

Example mapping for scatter customers:
- Dream outcome: reliable pickup at lower effort
- Likelihood: consistent service history + local proof
- Time delay: next-week service start
- Effort/sacrifice: simple signup, no contract
```

**Verification**:
- [ ] Page numbers are accurate
- [ ] Quotes are exact from books
- [ ] Framework mapping is logical
- [ ] Examples are specific to business discussed

---

### Section 8: Example Outputs (From This Case)

**Purpose**: Show what the final Growth Physics Brief would look like for this specific business

**Template**:
```markdown
## Example Outputs (From This Case)
- Output 1: [Key decision or recommendation from analysis]
- Output 2: [Next recommendation]
- Output 3: [Operational change]
- Output 4: [Metric improvement target]
- [Continue with 3-5 total outputs]
```

**Instructions**:
1. Summarize the recommendations from the Step-by-Step Teardown
2. Focus on the 3-5 most impactful actions
3. Include both strategic decisions and tactical actions
4. Each output should be actionable
5. Reference which step led to each output

**Output categories**:
- Avatar/channel focus decision
- Offer restructuring
- Pricing changes
- Channel strategy
- Operational improvements
- Unit economics targets

**Example** (from Garbage Collection):
```markdown
## Example Outputs (From This Case)
- Avatar focus: Scatter (short-term cash flow) or HOA (long-term share), choose one
- Channel focus: D2D commission-only for scatter, relationship cadence for HOA
- Offer fix: upfront cash >= CAC + first-month fulfillment
- Unit economics target: restore positive net margin through route efficiency
```

---

### Section 9: Book Anchors (Direct Quotes)

**Purpose**: Provide direct quotes from the 3 reference books that support the methodology

**Template**:
```markdown
## Book Anchors (Direct Quotes)
- 100M Offers, p. XX: "[Exact quote from book]"
- 100M Offers, p. XX: "[Another relevant quote]"
- 100M Leads, p. XX: "[Quote from this book]"
- 100M Money Models, p. XX: "[Quote from this book]"
- [Continue with 4-8 quotes total]
```

**Instructions**:
1. Extract quotes from the 3 reference books that support this playbook's recommendations
2. Focus on quotes that directly apply to this business
3. Include exact page numbers
4. Include exact quote text
5. These are "proof" that recommendations are backed by tested frameworks
6. Aim for 4-8 quotes across the 3 books

**Selection criteria**:
- Direct support for a key recommendation
- Applicable to the specific business scenario
- From foundational chapters (not just examples)

**Example** (from Garbage Collection):
```markdown
## Book Anchors (Direct Quotes)
- 100M Offers, p. 43: "The pain is the pitch."
- 100M Offers, p. 43: "The degree of the pain will be proportional to the price you will be able to charge"
- 100M Leads, p. 48: "Advertising your core offer might be all you need to get leads to engage. Try this way first."
- 100M Money Models, p. 103: "Good gyms have lots of recurring revenue. I had none."
```

**Verification**:
- [ ] All page numbers are accurate
- [ ] All quotes are verbatim from books
- [ ] Quotes support the methodology
- [ ] Quotes span across all 3 books where applicable

---

### Section 10: Simulation Checklist (Copy/Paste)

**Purpose**: Provide a checklist that someone can use to replicate this playbook's methodology on a new business

**Template**:
```markdown
## Simulation Checklist (Copy/Paste)
1) [Action 1 - typically data collection]
2) [Action 2 - typically first calculation]
3) [Action 3 - typically decision]
4) [Action 4 - typically implementation step]
5) [Continue with 6-10 actions total]
```

**Instructions**:
1. Create a step-by-step checklist someone could follow to apply this methodology
2. Each item should be actionable
3. Order should follow the 5-phase methodology:
   - Phase 1: Data collection
   - Phase 2: Diagnosis
   - Phase 3: Decision tree
   - Phase 4: Recommendations
   - Phase 5: Output
4. Should take ~2-3 hours to complete
5. Person should be able to use this without reading entire playbook

**Checklist items should include**:
- Collect X data points
- Calculate Y metrics
- Apply decision rule for Z
- Make decision about W
- Create output for V
- Document assumptions

**Example** (from Garbage Collection):
```markdown
## Simulation Checklist (Copy/Paste)
1) Record revenue, net margin, CAC, LTV, and route utilization.
2) Choose one avatar and one channel.
3) Align offer cash timing to CAC + fulfillment cost.
4) Scale the chosen channel (D2D or HOA outreach).
5) Implement route efficiency actions.
6) Produce Growth Physics Brief output.
```

**Usage**:
- Person unfamiliar with playbook can follow checklist
- Guarantees same analysis flow as original playbook
- Enables replication across different businesses

---

### Section 11: Assumptions Log (If Needed)

**Purpose**: Document any assumptions or deviations made during analysis

**Template**:
```markdown
## Assumptions Log (If Needed)
- Assumption 1: ______________________
- Assumption 2: ______________________
- Assumption 3: ______________________
- [Continue as needed]
```

**Instructions**:
1. Note this section can be blank if all data is from verbatim quotes
2. If you had to estimate or assume something, log it here
3. Examples of assumptions:
   - Estimated value (marked as such in text)
   - Market size assumed
   - Conversion rate estimated from limited data
   - Extrapolation from partial data
4. For each assumption, note why it was made
5. Mark any outputs dependent on assumptions as "scenario"

**Format**:
- Assumption 1: [What was assumed]
- Reason: [Why it was necessary]
- Impact: [Which conclusions depend on this assumption]

**Example**:
```markdown
## Assumptions Log (If Needed)
- Assumption 1: CAC calculated from partial data; extrapolated to annual
- Assumption 2: Customer lifetime estimated at 24 months based on retention data
- Assumption 3: Churn rate interpolated from single data point
```

**Key principle**: Transparency about assumptions builds credibility. Always log deviations from verbatim data.

---

## Creating Your Playbook: Step-by-Step

### Phase 1: Preparation (30 min)

- [ ] Obtain full transcript (video or RTF)
- [ ] Ensure transcript has timestamps
- [ ] Have financial data/spreadsheet available
- [ ] Read one existing playbook for format reference
- [ ] Decide which business type applies (Recurring, Multi-location, Consulting, etc.)

### Phase 2: Extraction (2-3 hours)

- [ ] Watch/read entire transcript (60 min)
- [ ] Extract all verbatim quotes with timestamps (60 min)
- [ ] Collect financial data: revenue, profit, CAC, LTV (30 min)
- [ ] Extract business snapshot (30 min)
- [ ] Extract required inputs (30 min)

### Phase 3: Analysis (2-3 hours)

- [ ] Calculate all derived metrics (45 min)
- [ ] Identify 6-10 key decision points from transcript (45 min)
- [ ] Write step-by-step teardown with decision rules (60 min)
- [ ] Map to book frameworks (45 min)
- [ ] Write example outputs (30 min)

### Phase 4: Documentation (1-2 hours)

- [ ] Fill in all 11 sections (90 min)
- [ ] Extract book quotes and add anchors (30 min)
- [ ] Create simulation checklist (30 min)
- [ ] Log assumptions (15 min)
- [ ] Review and refine (30 min)

### Phase 5: Validation (1 hour)

- [ ] Verify all timestamps are accurate
- [ ] Check all metrics calculations
- [ ] Ensure decision rules are logical
- [ ] Verify book quotes and page numbers
- [ ] Test checklist flows logically
- [ ] Get feedback from another practitioner

---

## Quality Checklist

Before publishing your playbook:

- [ ] **Verbatim Accuracy**: All quotes are exact matches from transcript
- [ ] **Timestamp Accuracy**: All timestamps are correct to +/- 10 seconds
- [ ] **Metric Verification**: All calculations shown and verifiable
- [ ] **Decision Logic**: Each decision rule is specific and actionable
- [ ] **Book Framework**: All frameworks correctly cited with page numbers
- [ ] **Book Quotes**: All quotes are verbatim from source books
- [ ] **Complete Structure**: All 11 sections filled with substantive content
- [ ] **Minimal Assumptions**: Deviations from data are logged
- [ ] **Reproducible**: Someone else could follow the checklist on similar business
- [ ] **Formatting**: Follows same markdown structure as existing playbooks

---

## Extending the Template

### When You Have Additional Data

If you have data beyond the 11 standard sections:
- Add "Additional Analysis" section
- Include market research findings
- Add industry benchmarks
- Include competitive analysis
- Document follow-up actions taken

### When Multiple Businesses Are Analyzed

If analyzing multiple businesses in same industry:
- Create separate playbook for each
- Cross-reference between playbooks
- Highlight variations in decision rules
- Note universal vs. business-specific rules

### When Methodology Evolves

If you discover new frameworks or decision rules:
- Update decision-rules.md in docs/consulting/
- Reference in Section 7 (Book Frameworks)
- Note in playbook when applicable
- Update template for future playbooks

---

## Common Mistakes to Avoid

1. **Paraphrasing instead of verbatim quotes**
   - Fix: Copy exact text from transcript, including "um", stutters, grammar

2. **Missing timestamps**
   - Fix: Every quote must have timestamp in [M:SS] format

3. **Calculating metrics incorrectly**
   - Fix: Double-check calculations; reference metrics-glossary.md

4. **Decision rules that are too vague**
   - Fix: Make them specific and testable ("If X > Y, then do Z")

5. **Not applying book frameworks**
   - Fix: Every playbook should reference at least one framework from each book

6. **Insufficient evidence for recommendations**
   - Fix: Each recommendation should trace back to verbatim quote or metric

7. **Simulation checklist too detailed/vague**
   - Fix: Should take 2-3 hours for practitioner unfamiliar with playbook to complete

8. **Assuming instead of calculating**
   - Fix: Log all assumptions; mark scenario outputs as such

9. **Inconsistent formatting**
   - Fix: Follow template exactly for consistency across playbooks

10. **Missing section numbering**
    - Fix: Use format "# [Number] [Name]" for playbook title

---

## Examples from Existing Playbooks

For reference while creating your playbook, study these sections in existing playbooks:

- **Best Business Snapshot**: Garbage Collection (01) - clear, concise quotes
- **Best Required Inputs**: Personal Styling (02) - specific data points
- **Best Decision Rules**: Garbage Collection (01) - clear conditional logic
- **Best Step-by-Step Teardown**: Chiropractic (03) - logical flow
- **Best Book Framework Application**: All playbooks - consistent approach
- **Best Simulation Checklist**: Garbage Collection (01) - actionable steps

---

## Getting Feedback

Before finalizing your playbook:

1. **Technical review**: Check metrics, timestamps, calculations
2. **Methodology review**: Ensure decision rules are logical
3. **Usability review**: Have someone follow simulation checklist
4. **Framework review**: Verify book references are accurate
5. **Completeness review**: Ensure all 11 sections have substance

---

## File Naming Convention

When saving your playbook:

```
[NN]_[business_name]_simulation_playbook.md
```

Examples:
- 01_garbage_collection_simulation_playbook.md
- 02_personal_styling_simulation_playbook.md
- 03_chiropractic_chain_simulation_playbook.md

Save to: `High Ticket Services/Alex H/detailed_service_playbooks/`

---

## Resources

- **Main methodology**: [High Ticket Services/Alex H/README.md](../../High%20Ticket%20Services/Alex%20H/README.md)
- **Metrics glossary**: [metrics-glossary.md](./metrics-glossary.md)
- **Decision rules library**: [decision-rules.md](./decision-rules.md)
- **Reference books**: `High Ticket Services/Alex H/Books/`
- **Existing playbooks**: `High Ticket Services/Alex H/detailed_service_playbooks/`

---

**Last Updated**: 2026-01-18
**Template Version**: 1.0
**Total Sections**: 11 (detailed instructions for each)
**Estimated Creation Time**: 5-8 hours per playbook
