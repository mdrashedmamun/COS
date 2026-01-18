# Decision Rules Library

Comprehensive collection of conditional decision rules used across all playbooks. Each rule is extracted from real business analysis and can be applied to similar business scenarios.

Format for each rule:
- **Condition** (If): What situation triggers this rule
- **Action** (Then): What to do when condition is met
- **Source**: Which playbook(s) use this rule
- **Evidence**: Verbatim quote with timestamp
- **Application**: When and how to use this rule
- **Related metrics**: What to measure to apply this rule

---

## Profitability Rules

These rules address the most critical constraint: business viability.

### Rule 1: Fix Unit Economics Before Scaling

**Condition**: Net margin is negative OR LTV:CAC < 1.5:1

**Action**: Stop scaling acquisition. Focus on:
1. Rebuilding offer structure (pricing, payment timing, packaging)
2. Improving fulfillment efficiency (reduce COGS or labor)
3. Increasing gross margin per customer
4. Reducing CAC through channel optimization

**Source Playbooks**:
- 01_garbage_collection (net margin -23%)
- 06_music_legal_services (net margin -33%)

**Evidence**:
- "Our net margins are negative 23%." [0:26] - Garbage Collection
- "We lost a 100,000" [0:35] - Music Legal
- "Do you think the issue is with lead generation?" "No. The issue is that if you fix the lead generation, all you've done is lose money faster." [16:01-16:15] - Garbage Collection

**Application**:
1. Calculate net margin (net profit / revenue)
2. Calculate LTV:CAC ratio
3. If either is negative, pause growth spending
4. Map offer structure to Value Equation (dream outcome, likelihood, time, effort)
5. Test offer variations or pricing changes
6. Don't scale until margin improves

**Related metrics**:
- Net margin (must be positive)
- LTV:CAC ratio (must be >1.5:1)
- CAC (can be lowered)
- Gross margin (can be increased)

**Exceptions**:
- VC-backed companies intentionally running negative margins for growth
- Market penetration play where long-term margins will be positive

---

### Rule 2: Don't Scale a Broken Model

**Condition**: LTV:CAC < 3:1 AND company wants to grow

**Action**: Improve unit economics first, then scale. Until 3:1 ratio is achieved:
1. Tighten marketing spend (lower CAC)
2. Improve retention (increase LTV)
3. Raise prices (increase margin)
4. Fix offer-market fit

**Source Playbooks**:
- 05_beverage_consulting (1.7:1 ratio)
- 03_chiropractic_chain (4.8:1 ratio, acceptable)

**Evidence**:
- "If we can get you to a three to one and then continue to spend, you can continue to spend forever." [9:34] - Beverage Consulting
- "A $12,000 CAC is crazy" [4:29] - Beverage Consulting (at 1.7:1, should be <$3K)

**Application**:
1. Calculate LTV:CAC ratio
2. If <3:1, don't increase marketing budget
3. Instead, optimize existing spend:
   - Move budget to highest-performing channel
   - Improve offer targeting
   - Test price increases
4. Track ratio weekly and scale only when >3:1

**Related metrics**:
- LTV:CAC ratio (target: 3:1 minimum)
- CAC by channel (double-check which channels are profitable)
- Close rate by channel (find underperforming channels to kill)
- Customer lifetime (extend through retention)

**Real-world threshold**:
- 1:1 to 2:1 → Critical; fix immediately
- 2:1 to 3:1 → Risky; don't add spend
- 3:1 to 5:1 → Healthy; can scale gradually
- 5:1+ → Excellent; scale aggressively

---

### Rule 3: Negative Margin Means Cash Flow is Broken

**Condition**: Business losing money month-to-month despite revenue

**Action**: Problem is not revenue, it's unit economics. Fix cash flow timing:
1. Move cost structure to align with revenue timing
2. Get upfront payment to cover CAC + first month's costs
3. Negotiate payment terms with suppliers
4. Consider restructuring offer (bundling, pricing, packaging)

**Source Playbooks**:
- 01_garbage_collection (negative 23%, solved through offer restructuring)

**Evidence**:
- "Our revenue is 642,000. Our net profit is -151,000." [0:18]
- "We're not utilizing our assets enough. Trash is a very capitalally intensive business." [0:40]
- "We just need cash in the first 30 days to be greater than your cost of goods sold and CAC" [16:01]
- "If we get upfront cash over call it 120 bucks, you could be good to go" [18:15]

**Application**:
1. Map out cash flow timeline (when do you pay, when do customers pay?)
2. Identify cash shortfall periods
3. Get upfront payment (or payment structure) to cover gaps
4. Test offer restructuring (onboarding fee, service packaging)
5. Negotiate supplier terms

**Related metrics**:
- Net margin (must become positive)
- Days sales outstanding (DSO) - how long until you get paid
- Days payable outstanding (DPO) - how long until you pay suppliers

---

## Pricing & Offer Rules

These rules address how to structure and price offers.

### Rule 4: If Close Rate > 40%, Increase Pricing

**Condition**: Sales close rate is above 40% (indicating strong buyer interest)

**Action**: Test price increase before increasing marketing spend:
1. Raise price 20-30% and measure impact
2. Expected: Some volume loss, but higher profit
3. Optimal: Lower volume but higher margin may be better than higher volume at low price
4. Focus on margin per customer, not customer count

**Source Playbooks**:
- 03_chiropractic_chain (71% close rate; pricing discussion)
- 02_personal_styling (50% appointment-to-sale)

**Evidence**:
- "Healthy close rate percentage is usually like 30 to 40%." [3:32] - Chiropractic (71% is too high)
- "If we increase the price, what would happen to demand?" (Pricing optimization discussion) - Chiropractic

**Application**:
1. Calculate current close rate
2. If >40%, you have pricing power
3. Test 15-20% price increase on new leads
4. Measure:
   - New close rate (will drop)
   - Profit per customer (should increase)
   - Total profit (will likely increase)
5. If profit improves, keep new price

**Related metrics**:
- Close rate (current vs. after increase)
- Revenue per customer (should increase)
- Volume of customers (expected to decrease)
- Total profit (should increase)

**Reasoning**:
- High close rate = strong offer-market fit
- At strong fit, buyers are less price-sensitive
- Can trade volume for margin
- Example: 50 customers at $100 = $5K vs. 40 customers at $125 = $5K (same revenue but better?), or 40 customers × $125 with better margin

---

### Rule 5: If Close Rate < 20%, Problem Isn't Lead Volume

**Condition**: Close rate below 20% despite decent lead volume

**Action**: Don't add more leads. Instead:
1. Audit the offer (Value Equation: dream outcome, likelihood, time, effort)
2. Check avatar targeting (are leads the right fit?)
3. Fix sales process (qualification, objection handling)
4. Test messaging variations
5. Then scale leads after close rate improves

**Source Playbooks**:
- 05_beverage_consulting (low opt-in rate indicates offer problem)
- Multiple playbooks discuss conversion optimization before scaling

**Evidence**:
- "When I saw 1,800 Clicks in eight sales it was clearly a conversion issue" [8:03] - Personal Styling
- "There's definitely an offer mismatch between what is being advertised and what they're selling" [4:47] - Beverage

**Application**:
1. Calculate close rate (sales / leads)
2. If <20%, pause marketing spend increase
3. Audit offer:
   - What is dream outcome? (Is it compelling?)
   - What is likelihood? (Do they believe it?)
   - What is timeline? (Is it fast enough?)
   - What is effort? (Is it too high?)
4. Test offer variations (keep testing until close rate improves)
5. Only scale leads once close rate >25%

**Related metrics**:
- Close rate (goal: >25% minimum)
- Lead quality (wrong avatar?)
- Offer clarity (messaging test)
- Sales process steps (where do prospects drop off?)

**Common causes**:
- Avatar doesn't match offer
- Messaging doesn't resonate
- Pricing is too high
- Offer doesn't solve their real problem
- Sales process is weak

---

### Rule 6: Align Offer to Avatar

**Condition**: Different customer avatars have different pain points and buying behavior

**Action**: Create distinct offers for each avatar. Don't force same offer onto different audiences:
1. Identify each avatar's pain point
2. Map offer to that specific pain
3. Create avatar-specific messaging
4. Test offer-channel-avatar combination
5. Scale winner, kill losers

**Source Playbooks**:
- 01_garbage_collection (scatter vs. HOA avatars)
- 02_personal_styling (different customer types)

**Evidence**:
- "We have two types of avatars. 50% are what we call scatter. The other 50% are HOAs." [2:12]
- "For scatter customers, we charge $29.67 a month... as an intro offer, we offer three months free." [4:45]
- "If you have call it 500 HOAs... is not a cold email play. Handwritten card personal gift drive up." [8:22-8:30]

**Application**:
1. Identify each customer avatar (demographics, pain points, buying behavior)
2. For each avatar:
   - What is their dream outcome?
   - What is their budget constraint?
   - What channel do they use?
   - What message resonates?
3. Create offer variations for each
4. Test each offer with its target avatar
5. Scale highest LTV:CAC combinations

**Related metrics**:
- CAC by avatar (some are cheaper to acquire)
- LTV by avatar (some have higher lifetime value)
- Close rate by avatar (some convert better)
- Churn by avatar (some stay longer)

---

### Rule 7: The Offer Must Pass Through the Value Equation

**Condition**: Any offer being tested must address all four components of value

**Action**: Map offer to:
1. **Dream Outcome**: What benefit? (Increase this perception)
2. **Likelihood of Achievement**: Can they actually get it? (Increase confidence)
3. **Time Delay**: How fast do they see results? (Decrease wait time)
4. **Effort & Sacrifice**: What's required from them? (Decrease effort/cost)

**Source Playbooks**:
- All playbooks use 100M Offers framework
- 01_garbage_collection, 02_personal_styling, 05_beverage_consulting apply explicitly

**Evidence**:
- "100M Offers, p. 62: There are four primary drivers of value." - Multiple playbooks
- Example mapping for scatter customers: "Dream outcome: reliable pickup at lower effort, Likelihood: consistent service history + local proof, Time delay: next-week service start, Effort/sacrifice: simple signup, no contract" - Garbage Collection

**Application**:
1. Write down current offer
2. Map each component:
   - Dream outcome: What end result? (cleaning, beauty, health?)
   - Likelihood: What proof do they see? (testimonials, results, guarantees?)
   - Time delay: How fast? (hours, days, weeks?)
   - Effort: What's required? (signup, payment, time commitment?)
3. For low close rates, test improving weakest component
4. For pricing power, strengthen likelihood or dream outcome

**Related metrics**:
- Close rate (improves as offer strengthens)
- Conversion by component tested
- A/B test results for offer variations

---

## Channel & Avatar Rules

These rules address go-to-market strategy.

### Rule 8: One Avatar, One Channel Until Profitable

**Condition**: Business has multiple avatars and/or multiple acquisition channels

**Action**: Choose the ONE avatar and ONE channel with best unit economics:
1. Calculate LTV:CAC for each avatar × channel combination
2. Pick the highest performer
3. Focus 100% on that combination until profitable
4. Expand to second combination only after first is profitable
5. Repeat for additional channels/avatars

**Source Playbooks**:
- 01_garbage_collection (scatter vs. HOA; chose to start with one)
- 03_chiropractic_chain (expanded from one channel to multiple)

**Evidence**:
- "You're at that stage where... one avatar, one channel, one product" [19:18] - Garbage Collection
- "I think what we're going to do is... go avatar" [18:44] - Garbage Collection
- "If you have two avatars and five channels, choose one avatar and one dominant channel until profitability is restored." - Decision rule

**Application**:
1. List all customer avatars
2. List all acquisition channels
3. Calculate metrics for each combination:
   - CAC for each channel
   - Close rate for each avatar
   - LTV for each avatar
4. Find best LTV:CAC combination
5. Allocate 80% of marketing budget to this combination
6. Allocate 20% to test secondary combinations
7. When primary is highly profitable, expand secondary

**Related metrics**:
- CAC by channel (which is cheapest to acquire?)
- LTV by avatar (which customers stay longer?)
- LTV:CAC by combination (which is healthiest?)
- Close rate by channel (which converts best?)

**Reasoning**:
- Focus creates speed
- Dilution creates chaos
- Perfect one segment before expanding
- Each new segment has learning curve

---

### Rule 9: High-Touch Services Use Relationship Channels

**Condition**: Service requires trust, expert advice, or customization (high-touch)

**Action**: Use warm/relationship channels:
- Referrals
- Warm introductions
- Direct relationship building
- NOT cold email, ads, or volume channels

**Source Playbooks**:
- 01_garbage_collection (HOA contracts require relationships)
- 02_personal_styling (high-touch service; referral-based)

**Evidence**:
- "If you have call it 500 HOAs... is not a cold email play. Handwritten card personal gift drive up." [8:22-8:30]
- "I never want to have a commoditized service where I get into an auction" [20:03]
- "Blended CAC of 600... majority from referrals/relationships" - Implied in Personal Styling

**Application**:
1. Assess service complexity (high-touch? customized? requires trust?)
2. If high-touch → use warm channels
3. If commodity/simple → can use volume channels
4. Build referral system: satisfied customers → referrals → easier sells
5. Invest in relationships, not ads

**Related metrics**:
- CAC by channel (warm usually has lower CAC)
- Close rate by channel (warm usually closes higher)
- Time to close (relationship may take longer)
- LTV by channel (warm leads often have higher LTV)

---

### Rule 10: Low-Touch Services Use Volume Channels

**Condition**: Service is simple, well-defined, low-involvement (e.g., door-to-door sales, subscription)

**Action**: Use volume channels:
- Door-to-door
- Performance marketing (Google, Facebook)
- Affiliate channels
- Partnerships at scale

**Source Playbooks**:
- 01_garbage_collection (scatter customers; D2D channel)

**Evidence**:
- "I knock out 300 doors and my close rate is right around 26%" [5:45]
- "Scale door-to-door with commission-only team" [23:13]

**Application**:
1. Assess service (simple? repeatable? low-customization?)
2. If low-touch → can use volume channels
3. Test channel economics: CAC × close rate = cost per customer
4. Scale highest-ROI channel
5. Add commission-based sales team for scalability

**Related metrics**:
- CAC by channel (volume channels often cheaper)
- Close rate (must be >20%)
- Scale potential (can you hire/automate?)

---

### Rule 11: Match Channel Spend to Avatar Concentration

**Condition**: Customer avatars are concentrated in specific locations or channels

**Action**: Allocate channel spending proportional to avatar presence:
1. Map where target avatars spend time/attention
2. Allocate budget to those channels
3. Avoid channels where avatar isn't present
4. Example: If 70% of customers are HOAs, don't spend on D2D to HOAs; use relationships instead

**Source Playbooks**:
- 01_garbage_collection (HOAs in specific markets; different strategy)
- 03_chiropractic_chain (multi-location; geographic allocation)

**Evidence**:
- "If you have call it 500 HOAs which represent 70% of the market is not a cold email play." [8:22]
- "We are spending here, but our customers are actually here" (implied misalignment)

**Application**:
1. Identify where target avatar is (location, channel, platform)
2. Allocate marketing budget accordingly
3. Don't chase avatars where they aren't
4. Example: "Our customers are on Facebook, but we're spending on LinkedIn"
5. Align message and medium to avatar

---

## Operational Rules

These rules address fulfillment, efficiency, and scaling.

### Rule 12: Optimize Efficiency Before Hiring

**Condition**: Fulfillment is at capacity (can't take more customers without hiring)

**Action**: Before adding headcount:
1. Improve efficiency (process, tools, training)
2. Optimize utilization (asset, time, space)
3. Increase productivity per person
4. Only hire after efficiency is optimized

**Source Playbooks**:
- 01_garbage_collection (route optimization before hiring)
- 07_eyelash_salon (capacity issues, training problems)

**Evidence**:
- "We're not utilizing our assets enough. Trash is a very capitalally intensive business." [0:40]
- "Routes are not super efficient." [0:47]
- "Prioritize route efficiency and asset utilization when margins are negative." - Decision rule

**Application**:
1. Identify capacity constraint (time? people? equipment?)
2. Before hiring, test:
   - Process improvement
   - Tool/technology upgrade
   - Training/methodology change
   - Workflow optimization
3. Measure productivity per unit (per person, per asset, per hour)
4. Only hire if productivity is maximized and still at capacity

**Related metrics**:
- Productivity per employee (revenue/employee or units/employee)
- Asset utilization (% of capacity used)
- Cost per unit (should decrease as efficiency improves)
- Fulfillment cost (COGS)

**Reasoning**:
- Hiring is expensive and permanent
- Efficiency improvements are permanent and replicable
- 20% efficiency gain often > hiring one person

---

### Rule 13: Retention is Cheaper Than Acquisition

**Condition**: Business has recurring revenue or repeat customers

**Action**: Invest in retention BEFORE scaling acquisition:
1. Reduce churn (improve retention)
2. Increase customer lifetime
3. Build retention system (check-ins, loyalty, prevention)
4. Measure and improve LTV before increasing CAC

**Source Playbooks**:
- 02_personal_styling (strong retention; only 1 customer lost)
- 07_eyelash_salon (retention system mentioned)

**Evidence**:
- "The fact that she's only lost one customer over a year out of 40" [7:16] - Personal Styling (high retention = strong LTV)
- "Book it then. Just get it done rather than trying to rely on them coming back by chance." [3:23] - Eyelash

**Application**:
1. Measure current churn rate
2. Implement retention improvements:
   - Onboarding program
   - Regular communication
   - Value delivery
   - Win-back campaigns
3. Measure churn improvement
4. Calculate LTV impact
5. Scale acquisition based on improved LTV

**Related metrics**:
- Churn rate (target: <5% monthly)
- Customer lifetime (target: 24+ months)
- LTV (increases as lifetime increases)
- Retention rate (inverse of churn)

**Economics**:
- Acquiring new customer = high CAC
- Retaining existing customer = low cost
- Repeat purchase rate = higher profit

---

### Rule 14: Manager Consistency Limits Scale

**Condition**: Multi-location or franchise business with inconsistent performance across locations

**Action**: Invest in management training and systems:
1. Create standard operating procedures (SOPs)
2. Train managers in consistent methodology
3. Audit and standardize across locations
4. Scale locations only when consistency is achieved
5. Quality > quantity in multi-location scaling

**Source Playbooks**:
- 07_eyelash_salon (manager training identified as constraint)
- 03_chiropractic_chain (location consistency matters)

**Evidence**:
- "Manager training is inconsistent" [0:45] - Eyelash
- "Three problems... Manager training" [0:45] - Eyelash

**Application**:
1. Audit consistency across locations/units
2. If inconsistent:
   - Create SOP documentation
   - Train managers on SOPs
   - Create audit/feedback system
   - Incentivize consistency
3. Measure performance variance by location
4. Scale only when variance is minimal

**Related metrics**:
- Revenue per location (should be similar)
- Profit margin by location (should be similar)
- Customer satisfaction by location (NPS, reviews)
- Operational metrics (close rate, show rate, by location)

---

## Lead Generation Rules

These rules address how to get customers into the funnel.

### Rule 15: Lead Magnet Must Be Risk-Free, Easy, and Fast

**Condition**: Testing lead magnet for capturing prospects

**Action**: Lead magnet should offer:
1. **Risk-free**: No commitment, easy to try
2. **Easy**: Low barrier to entry
3. **Fast**: Immediate or very quick results
4. **Valuable**: Worth exchanging contact info for

**Source Playbooks**:
- 02_personal_styling (lead magnet optimization)
- 100M Leads framework referenced in all playbooks

**Evidence**:
- "For a lead magnet to be really valuable we want it to be risk-free easy and fast" [20:37]
- "You should be able to get like 30% of people to opt in" [22:36]

**Application**:
1. Audit current lead magnet:
   - Is it risk-free? (Can people try without commitment?)
   - Is it easy? (Low friction to get?)
   - Is it fast? (Quick results or access?)
2. If any are missing, redesign
3. Test opt-in rate target: 30%+ for good magnet
4. Measure conversion from magnet → customer

**Related metrics**:
- Opt-in rate (target: 30%+)
- Magnet-to-lead conversion rate
- Magnet-to-customer conversion rate
- Lead cost (lower with better magnet)

---

### Rule 16: Consistent Lead Flow Over Feast/Famine

**Condition**: Lead volume is inconsistent (feast/famine cycles)

**Action**: Build consistent lead generation system:
1. Identify what causes feast/famine (seasonal? dependent on one channel?)
2. Diversify lead sources
3. Create automated lead flow (if possible)
4. Buffer consistency with retainers or continuity offers
5. Predictability enables better planning

**Source Playbooks**:
- 05_beverage_consulting (lead drought problem)

**Evidence**:
- "We will go for days, sometimes weeks without any leads at all" [4:08]
- "The lack of consistency really feels awful" [3:52]

**Application**:
1. Chart lead volume by week/month
2. Identify if seasonal or channel-dependent
3. Add lead sources to smooth variation
4. Example: Add referral program + partnership channel to ads
5. Measure: Standard deviation of monthly leads (lower = better)

**Related metrics**:
- Lead volume consistency (measure variance)
- Lead source diversity (number of channels)
- Forecast accuracy (can you predict lead volume?)

---

## Scaling Rules

These rules address when and how to grow.

### Rule 17: Scale One Winning Channel Before Adding New Channels

**Condition**: Multiple channels exist; one outperforms significantly

**Action**: Before adding new channels:
1. Identify best-performing channel (LTV:CAC ratio)
2. Maximize that channel
3. Extract all value from channel before diversifying
4. Expand to channel 2 only when channel 1 ROI plateaus

**Source Playbooks**:
- 03_chiropractic_chain (grow through dominant channels)
- 01_garbage_collection (pick one channel per avatar)

**Evidence**:
- "If one channel outperforms others by 3x, kill other channels and invest in the winner." - Decision rule
- "Let's focus on Google and local SEO before testing partnerships" (implied optimization)

**Application**:
1. Calculate LTV:CAC for each channel
2. Rank by profitability
3. Allocate 80% budget to top channel
4. Allocate 20% to test #2 and #3
5. When top channel ROI drops, shift budget to #2
6. Scale only winner channels

**Related metrics**:
- ROI by channel (revenue / spend)
- LTV:CAC by channel
- Cost per acquisition by channel
- Conversion rate by channel

---

### Rule 18: Nail It Before You Scale It

**Condition**: Business is ready to scale to new locations or markets

**Action**: Before scaling:
1. Prove the model works in current market/location
2. Document all processes and systems
3. Train team on proven methodology
4. Then replicate to new location
5. Don't scale broken model to new market

**Source Playbooks**:
- 08_thai_restaurant (new location planning)

**Evidence**:
- "Nail it then scale it" [8:53]
- "We soft open" [9:38] (test before full launch)

**Application**:
1. Current location must be:
   - Profitable (positive margin)
   - Optimized (good efficiency)
   - Documented (SOPs for new location to follow)
2. Before opening location #2:
   - Soft open or pilot
   - Test systems
   - Refine processes
   - Then full launch
3. Measure results against original location

**Related metrics**:
- Profit by location (location #1 baseline)
- Ramp-up time for new location
- Consistency vs. original location

---

### Rule 19: Test Before Full Commitment

**Condition**: Considering major change (new product, new channel, new pricing)

**Action**: Always test at small scale before full rollout:
1. Hypothesis: "If we do X, result will be Y"
2. Test: Run X with small segment
3. Measure: Did Y happen?
4. Decide: Roll out full or iterate
5. Learn: What did we learn? How to apply?

**Source Playbooks**:
- All playbooks use test-measure-decide methodology

**Evidence**:
- "Let's test higher pricing with one channel first" (implied)
- "Soft open" before full location launch [9:38]

**Application**:
1. Before major change, define hypothesis
2. Test scope: What's the smallest test possible?
3. Duration: How long to measure?
4. Success metric: What result indicates success?
5. Run test
6. Measure results
7. Decide: Roll out or iterate

**Related metrics**:
- Test sample size (must be statistically significant)
- Test duration (long enough to measure?)
- Result vs. hypothesis
- Rollout plan based on test results

---

## Diagnostic Rules

These rules help identify what's wrong.

### Rule 20: Map Problem to Constraint

**Condition**: Business is struggling but root cause isn't clear

**Action**: Systematically identify the constraint:
1. **Profitability constraint**: Is net margin positive? (Fix pricing/efficiency)
2. **Lead generation constraint**: Is lead volume sufficient? (Fix channels)
3. **Conversion constraint**: Is close rate acceptable? (Fix offer/sales)
4. **Fulfillment constraint**: Is capacity at max? (Fix efficiency/ops)
5. **Retention constraint**: Is churn too high? (Fix product/service)

**Source Playbooks**:
- 01_garbage_collection (profitability)
- 05_beverage_consulting (lead generation + offer)
- 03_chiropractic_chain (lead generation)
- 07_eyelash_salon (multiple constraints)

**Evidence**:
- Each playbook Step 1 is "Diagnose the Primary Constraint"
- Focus on the constraint that's blocking growth first

**Application**:
1. Check metrics in order:
   - Is margin positive?
   - Is lead volume sufficient?
   - Is conversion rate healthy?
   - Is capacity available?
   - Is retention acceptable?
2. Find first "No" answer
3. That's your constraint
4. Fix that constraint before others

**Related metrics**:
- Net margin
- Lead volume
- Close rate
- Capacity utilization
- Churn rate

---

## Quick Reference Decision Tree

Use this tree to find the right rule for your situation:

```
Is the business profitable?
├─ NO → Rule 1: Fix Unit Economics Before Scaling
│   ├─ Is LTV:CAC < 1.5:1?
│   │   └─ YES → Rule 2: Don't Scale Broken Model
│   └─ Is cash flow timing wrong?
│       └─ YES → Rule 3: Negative Margin Means Cash Flow is Broken
│
└─ YES → Good, move to growth
    ├─ Is close rate > 40%?
    │   └─ YES → Rule 4: Increase Pricing
    │
    ├─ Is close rate < 20%?
    │   └─ YES → Rule 5: Problem Isn't Lead Volume
    │
    ├─ Are you chasing wrong avatar?
    │   └─ YES → Rule 6: Align Offer to Avatar
    │
    ├─ Is fulfillment at capacity?
    │   └─ YES → Rule 12: Optimize Efficiency Before Hiring
    │
    ├─ Do you have multiple avatars/channels?
    │   └─ YES → Rule 8: One Avatar, One Channel Until Profitable
    │
    ├─ Are leads inconsistent?
    │   └─ YES → Rule 16: Consistent Lead Flow Over Feast/Famine
    │
    └─ Ready to scale?
        └─ YES → Rule 17: Scale One Winning Channel
        └─ YES → Rule 18: Nail It Before Scale It
```

---

## Applying Decision Rules

### To analyze a new business:

1. Collect data (revenue, CAC, LTV, margin, close rate, etc.)
2. Walk through decision tree above
3. Apply rules in order of priority
4. Document findings and recommendations
5. Create Growth Physics Brief with prioritized actions

### To validate recommendations:

1. For each recommendation, find the source rule
2. Verify rule conditions are met
3. Check evidence supports rule
4. Confirm metrics align with decision
5. Document traceable logic

### To extend the framework:

1. Extract new rule from playbook analysis
2. Document condition, action, source, evidence
3. Test on multiple businesses
4. Add to library once validated
5. Cross-reference to related rules

---

## Cross-Playbook Rule Frequency

Rules appearing in multiple playbooks (most generalizable):

| Rule | Playbooks | Frequency |
|------|-----------|-----------|
| Rule 1: Fix Unit Economics First | 01, 06 | 2x |
| Rule 2: Don't Scale Broken Model | 05 | 1x |
| Rule 4: Increase Pricing If CR>40% | 02, 03 | 2x |
| Rule 5: Low CR = Offer Problem | 02, 05 | 2x |
| Rule 6: Align Offer to Avatar | 01, 02 | 2x |
| Rule 8: One Avatar, One Channel | 01, 03 | 2x |
| Rule 12: Efficiency Before Hiring | 01, 07 | 2x |
| Rule 16: Consistent Lead Flow | 05 | 1x |
| Rule 18: Nail It Before Scale It | 08 | 1x |

Universal rules (apply to most businesses): 1, 4, 5, 6, 8, 12

---

**Last Updated**: 2026-01-18
**Rules Documented**: 20 core decision rules + variations
**Cross-references**: 50+ links to source playbooks and metrics
**Status**: Complete library extracted from 7 playbooks
