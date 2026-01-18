# Documentation Hub

This directory contains reference documentation for the consulting framework and future development structure.

## Structure

```
docs/
├── README.md (this file)
├── consulting/
│   ├── metrics-glossary.md          ← All metric definitions and formulas
│   ├── decision-rules.md            ← Library of conditional decision rules
│   ├── methodology.md               ← Deep dive on 5-phase process
│   ├── playbook-template.md         ← Template for creating new playbooks
│   └── case-studies.md              ← Index of all 7 playbooks with summaries
└── development/
    ├── getting-started.md           ← For when consulting-os is built
    └── contributing.md              ← How to add new playbooks/content
```

## Documentation Sections

### Consulting Framework Documentation

#### [metrics-glossary.md](./consulting/metrics-glossary.md)
**Complete reference for all business metrics used in the framework**

Includes:
- CAC (Customer Acquisition Cost) - formula, interpretation, benchmarks
- LTV (Lifetime Value) - formula, interpretation, benchmarks
- LTV:CAC Ratio - what it means, healthy ranges
- Net Margin - profitability metric
- Gross Margin - available profit
- Payback Period - acquisition efficiency
- Close Rate - conversion metric
- Show Rate - lead quality metric
- Churn Rate - retention metric
- All other metrics used in playbooks

Use this when you need to:
- Understand what a metric means
- Calculate a metric from raw data
- Benchmark your business against healthy standards
- Find all variations of a metric name

#### [decision-rules.md](./consulting/decision-rules.md)
**Library of all conditional decision rules used across playbooks**

Organized by category:
- Profitability rules
- Pricing rules
- Channel selection rules
- Scaling rules
- Offer structure rules
- Operational efficiency rules

Each rule includes:
- The condition ("If X")
- The action ("Then Y")
- Source playbook where it's applied
- Verbatim evidence from transcript
- When to apply it

Use this when you need to:
- Find decision rules for your business scenario
- Understand the logic behind a recommendation
- Apply the methodology to a new business
- Create your own playbook

#### [playbook-template.md](./consulting/playbook-template.md)
**Template for creating new simulation playbooks**

Includes:
- 11-section structure with instructions
- Examples from existing playbooks
- How to format verbatim quotes
- How to write decision rules
- Validation checklist

Use this when you need to:
- Create a new playbook for a different business
- Structure analysis of a new business scenario
- Learn the playbook format in detail

#### [methodology.md](./consulting/methodology.md)
**Deep dive on the 5-phase consulting process**

Covers:
- Phase 1: Data Collection
- Phase 2: Diagnosis
- Phase 3: Decision Tree
- Phase 4: Strategic Recommendations
- Phase 5: Output Validation

Use this when you need to:
- Understand the overall consulting process
- Learn how phases connect
- See the flow of decision-making

#### [case-studies.md](./consulting/case-studies.md)
**Index of all 7 playbooks with summaries**

Includes:
- One-page summary of each playbook
- Key metrics and constraints
- Main decision made
- Key learnings
- When to use each playbook

Use this when you need to:
- Quick overview of all playbooks
- Decide which playbook applies to your business
- Understand the range of business models covered

### Development Documentation

#### [development/getting-started.md](./development/getting-started.md)
**Guidance for when the consulting-os web application is being built**

Covers:
- Architecture overview
- How playbooks integrate with web app
- API design for consulting tools
- Data model for playbook results

Use this when:
- Starting development on consulting-os
- Building features that consume playbook methodology
- Designing API for consulting framework

#### [development/contributing.md](./development/contributing.md)
**How to add new playbooks or content to the framework**

Covers:
- Playbook creation process
- Quality standards
- Review checklist
- How to organize new content

Use this when:
- Creating new playbooks
- Extending the framework
- Contributing back to the project

## Quick Navigation

### "I'm new to this framework"
1. Start with: [High Ticket Services/Alex H/README.md](../High%20Ticket%20Services/Alex%20H/README.md)
2. Read: [High Ticket Services/Alex H/detailed_service_playbooks/README.md](../High%20Ticket%20Services/Alex%20H/detailed_service_playbooks/README.md)
3. Pick a playbook from the list above
4. Reference: [metrics-glossary.md](./consulting/metrics-glossary.md) as needed

### "I need to understand a specific metric"
→ See [metrics-glossary.md](./consulting/metrics-glossary.md)

### "I need to find decision rules"
→ See [decision-rules.md](./consulting/decision-rules.md)

### "I want to create a new playbook"
→ See [playbook-template.md](./consulting/playbook-template.md)

### "I want to understand the methodology"
→ See [methodology.md](./consulting/methodology.md)

### "I'm building consulting-os"
→ See [development/getting-started.md](./development/getting-started.md)

## Cross-Repository References

### Consulting Framework Files
- **Main methodology**: `High Ticket Services/Alex H/README.md`
- **7 simulation playbooks**: `High Ticket Services/Alex H/detailed_service_playbooks/`
- **8 business transcripts**: `High Ticket Services/Alex H/transcripts/`
- **Reference books**: `High Ticket Services/Alex H/Books/`

### Skills Library
- **Anthropic skills**: `skills-main/`
- Individual skill documentation: `skills-main/skills/[skill-name]/SKILL.md`

### Development Scaffolding
- **consulting-os**: `consulting-os/` (currently empty, ready for Next.js/React)
- **growth-physics-skill**: `growth-physics-skill/` (currently empty, reserved for custom skill)

## Key Concepts

### Simulation Playbook
A reproducible business teardown methodology applied to a specific service business. Each playbook:
- Starts with actual verbatim quotes from a business operator
- Follows the same 11-section structure
- Ends with actionable recommendations with updated unit economics
- Can be replicated on any similar business model

### Growth Physics Brief
The output of applying a playbook to a business. Contains:
- Constraint diagnosis
- Avatar and channel focus
- Offer restructuring plan
- Lead generation playbook
- Updated unit economics
- 90-day execution roadmap

### One Avatar, One Channel
The primary decision rule: before scaling a business with multiple customer types or acquisition channels, focus on one avatar and one channel until profitable. Then expand.

### LTV:CAC Ratio
The most important business metric for determining scalability:
- <1:1: Business is losing money
- 1-3:1: Fix unit economics before scaling
- 3-5:1: Healthy; can scale profitably
- 5+:1: Excellent

### Verbatim Anchors
Exact quotes from business operators with timestamps. These are critical for:
- Verifying methodology accuracy
- Allowing future re-analysis with new frameworks
- Preventing interpretation bias
- Enabling error detection

## How This Documentation Relates

**The Consulting Framework** (High Ticket Services/Alex H/) is the practical content:
- 7 playbooks showing the methodology applied
- 8 transcripts showing real-time decision-making
- 3 reference books with foundational frameworks

**This Documentation** (docs/) is the reference material:
- Metrics glossary for understanding terms
- Decision rules library for conditional logic
- Playbook template for creating new playbooks
- Methodology guide for understanding the process
- Development guidance for building the web application

## Document Status

| Document | Status | Audience |
|----------|--------|----------|
| metrics-glossary.md | Ready | Everyone |
| decision-rules.md | Ready | Practitioners |
| playbook-template.md | Ready | New playbook creators |
| methodology.md | Ready | Framework learners |
| case-studies.md | Ready | Business selector |
| development/getting-started.md | Placeholder | Dev team |
| development/contributing.md | Placeholder | Contributors |

## Roadmap

### Current Phase
- ✅ 7 simulation playbooks complete
- ✅ 8 business transcripts complete
- ✅ Core methodology documentation complete
- ✅ Metrics glossary complete
- ✅ Decision rules library complete

### Next Phase (When consulting-os development begins)
- [ ] Web application architecture
- [ ] API design for playbook analysis
- [ ] Database schema for business data
- [ ] UI for playbook workflow
- [ ] Integration with custom Claude skills

### Future Phase (Year 2+)
- [ ] Advanced analytics on playbook results
- [ ] Benchmarking across industries
- [ ] Machine learning for constraint prediction
- [ ] Automated playbook generation
- [ ] Growth physics modeling tools

## Contributing

To add new documentation:
1. Follow the existing markdown structure
2. Include cross-references to related docs
3. Use the same terminology as the playbooks
4. Include examples from actual playbooks
5. Update this README with the new content

See [development/contributing.md](./development/contributing.md) for detailed guidelines.

## License & Attribution

This documentation is part of a proprietary consulting framework based on methodologies by Alex Hormozi (100M Offers, 100M Leads, Money Models). The consulting framework is a custom implementation for this project.

All content herein is for reference and educational purposes.

---

**Last Updated**: 2026-01-18
**Documentation Version**: 1.0
**Total Files**: 7 documents (4 ready, 2 placeholders)
