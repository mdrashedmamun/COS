# CLAUDE.md
<!-- This file helps Claude understand the repository architecture and how to work with this codebase -->

## Repository Purpose

This is a **hybrid consulting framework and AI skills platform** designed to combine:
- A reproducible business consulting methodology applied to 7 real service business scenarios
- Complete copy of Anthropic's official skills library for Claude Code and Claude API integration
- Scaffolding for future consulting OS web application and custom Claude skills development

The repository serves as both a reference library for business consulting frameworks and a development environment for skills-based AI applications.

## Architecture

### 1. Business Consulting Framework

**Location:** `High Ticket Services/Alex H/`

The core consulting methodology is based on Alex Hormozi's business frameworks and consists of:

#### Simulation Playbooks (7 total)
Located in: `High Ticket Services/Alex H/detailed_service_playbooks/`

Each playbook applies a reproducible teardown methodology to analyze real service businesses:
- **01_garbage_collection_simulation_playbook.md** - High-margin waste management business
- **02_personal_styling_simulation_playbook.md** - Fashion/personal brand consulting
- **03_chiropractic_chain_simulation_playbook.md** - Healthcare franchise scaling
- **05_beverage_consulting_simulation_playbook.md** - Beverage distribution and production
- **06_music_legal_simulation_playbook.md** - Music industry legal services
- **07_eyelash_chain_simulation_playbook.md** - Beauty services franchising
- **08_thai_restaurant_simulation_playbook.md** - Food service operations

#### Playbook Methodology
Each playbook follows a strict structure:
1. **Business Snapshot** - Verbatim quotes with timestamps from actual business operators
2. **Required Inputs** - Key financial data points (revenue, costs, margins)
3. **Derived Metrics** - CAC (Customer Acquisition Cost), LTV (Lifetime Value), payback periods, margins
4. **Step-by-Step Teardown Process** - Decision rules and framework for analyzing the business
5. **Reproducible Analysis** - Output metrics that can be verified and replicated

**Critical:** Verbatim anchors with timestamps are essential for future practitioners to verify methodologies and reproduce conclusions.

#### Consulting Transcripts
Located in: `High Ticket Services/Alex H/transcripts/100M/`

8 business teardown sessions showing real-time business analysis (building businesses from $1M to $5M+). These RTF transcripts demonstrate the consulting methodology in action.

#### Reference Materials
Located in: `High Ticket Services/Alex H/Books/`

3 PDF references:
- 100M-Leads-by-Alex-Hormozi.pdf (customer acquisition framework)
- 100m-Offers.pdf (value proposition framework)
- Money_Models_by_Alex_Hormozi.pdf (business model patterns)

### 2. Anthropic Skills Library

**Location:** `skills-main/`

Complete copy of Anthropic's official skills repository containing 16 production-ready skills:

**Spreadsheets & Documents:**
- `xlsx/` - Excel/CSV workbooks with formulas, formatting, and data analysis
- `docx/` - Microsoft Word document creation and editing
- `pptx/` - PowerPoint presentation creation and manipulation
- `pdf/` - PDF extraction, creation, and form handling

**Content & Design:**
- `frontend-design/` - Web UI components and pages (React, Tailwind, shadcn/ui)
- `web-artifacts-builder/` - Complex multi-component web applications
- `canvas-design/` - Visual design and art generation (.png, .pdf)
- `algorithmic-art/` - Generative art with p5.js and seeded randomness

**Communication & Workflow:**
- `doc-coauthoring/` - Structured documentation co-authoring workflow
- `internal-comms/` - Internal company communications templates
- `slack-gif-creator/` - Animated GIFs optimized for Slack

**Development & System Design:**
- `mcp-builder/` - Model Context Protocol server development
- `skill-creator/` - Guide for creating new Claude skills
- `theme-factory/` - Styling toolkit with 10+ preset themes
- `brand-guidelines/` - Anthropic brand color and typography standards
- `webapp-testing/` - Web application testing with Playwright

#### Skills Structure
Each skill contains:
- `SKILL.md` - Detailed instructions with YAML frontmatter
- Examples and templates
- Integration guidelines for Claude Code and Claude API

Reference: See `skills-main/spec/` for Agent Skills specification and `skills-main/template/` for skill template reference.

### 3. Future Development Scaffolding

#### consulting-os/
**Location:** `consulting-os/`

Placeholder framework for web application development:
- `app/` - Future Next.js/React application code
- `lib/schemas/` - Data schema definitions
- `lib/utils/` - Utility functions
- `data/` - Application data and fixtures

Currently empty; ready for consulting platform web UI implementation.

#### growth-physics-skill/
**Location:** `growth-physics-skill/`

Placeholder for custom Claude skill implementation:
- `data/` - Skill-specific data and training examples
- `references/playbooks/` - Integration with consulting playbooks

Currently empty; reserved for custom skill development and growth physics models.

## Working with Playbooks

### Playbook Purpose
Playbooks are reproducible business analysis frameworks, not marketing materials. Each one applies the same methodology to understand service business unit economics.

### Key Components Explained

**1. Business Snapshot**
- Verbatim quotes from business operator/owner with timestamps
- **Why verbatim matters:** Allows future practitioners to verify assumptions, catch errors, or re-analyze with new frameworks
- Provides real context without interpretation bias

**2. Required Inputs**
- Specific financial data points: total revenue, COGS, labor costs, gross margin, customer count
- Data must be verifiable or estimated with clear reasoning
- Used to calculate all downstream metrics

**3. Derived Metrics**
The framework calculates:
- **CAC (Customer Acquisition Cost)** = Marketing spend / New customers
- **LTV (Lifetime Value)** = (Gross margin per customer × Average customer lifetime) - CAC
- **Payback Period** = CAC / Gross margin per customer per month
- **Unit Economics** = Revenue per customer, cost per customer, margin percentage

**4. Step-by-Step Teardown Process**
- Numbered decision rules: "If [condition], then [conclusion]"
- Each rule traces back to input data or derived metrics
- Output should be reproducible with same inputs

**5. Decision Rules & Framework**
Example structure:
```
Rule 1: If cost per delivery > $X, business is not viable with Y pricing
Rule 2: If customer lifetime > Z months, LTV justifies CAC of $K
Rule 3: If gross margin < V%, scale is unlikely to improve profitability
```

### Using Playbooks for Analysis
1. Start with Business Snapshot - verify verbatim context
2. Extract Required Inputs from the business description
3. Calculate Derived Metrics using the formulas
4. Apply Decision Rules in order
5. Validate conclusions match final output

### Extending Playbooks
When applying this methodology to new businesses:
- Always capture verbatim quotes with timestamps
- Extract all required financial inputs before analysis
- Show all metric calculations explicitly
- Number and document all decision rules
- Verify conclusions are supported by metrics and rules

## Repository Structure

```
SMB- Boring Business Investment Readiness/
│
├── CLAUDE.md                          (This file)
├── README.md                          (Main repository overview)
│
├── High Ticket Services/              (28 MB - Core consulting content)
│   └── Alex H/
│       ├── detailed_service_playbooks/    (7 analysis playbooks)
│       ├── transcripts/                   (8 business teardown sessions)
│       │   └── 100M/
│       └── Books/                        (3 reference PDFs)
│
├── skills-main/                       (8.9 MB - Anthropic skills library)
│   ├── README.md                      (Skills documentation)
│   ├── SKILL.md files                 (Instructions for each skill)
│   ├── spec/                          (Agent Skills specification)
│   ├── template/                      (Skill development template)
│   └── skills/                        (16 production skills)
│
├── growth-physics-skill/              (Future custom skill)
│   ├── data/
│   └── references/playbooks/
│
└── consulting-os/                     (Future web application)
    ├── app/
    ├── lib/schemas/
    └── data/
```

## Important Notes

### No Build System
- This is a **documentation and reference repository** - no package.json, requirements.txt, or build tools
- No CI/CD pipelines or automated tests
- Playbooks are standalone markdown files, not code
- Skills are reference implementations, not installed as dependencies

### Development for Future Modules
- `consulting-os/` appears to be configured for Next.js/React (based on .gitignore patterns)
- `growth-physics-skill/` is reserved for custom Claude skill development
- Both are currently scaffolding with empty subdirectories

### Repository State
- Git initialized with single commit
- Remote: https://github.com/mdrashedmamun/COS
- `.claude/` directory excluded from git (local Claude configuration)
- Proprietary consulting frameworks - not open source

### Content Notes
- PDFs and RTF files are reference materials, not build outputs
- Playbooks are methodology documents, not templates to copy
- Skills documentation should not be modified without coordinating with Anthropic
- Consulting content is valuable intellectual property

### When Working with Skills
- Each skill in `skills-main/skills/` has its own SKILL.md file
- Refer to skill specifications for proper integration patterns
- Use skills via the Skill tool when applicable
- Do not modify Anthropic's official skills; fork if customization needed

## Quick References

- **Playbook structure:** See any file in `High Ticket Services/Alex H/detailed_service_playbooks/`
- **Skills integration:** See `skills-main/README.md` and individual `SKILL.md` files
- **Business transcripts:** `High Ticket Services/Alex H/transcripts/100M/`
- **Reference books:** `High Ticket Services/Alex H/Books/`
- **Skills specification:** `skills-main/spec/Agent-Skills.md`
