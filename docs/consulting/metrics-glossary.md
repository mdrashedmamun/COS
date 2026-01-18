# Metrics Glossary

Complete reference for all business metrics used in the consulting framework. Each metric includes definition, formula, interpretation, and healthy benchmarks.

## Core Unit Economics Metrics

### CAC (Customer Acquisition Cost)

**Definition**: The total cost to acquire one new customer.

**Formula**:
```
CAC = Total Marketing Spend / Number of New Customers
```

**Example**:
- Marketing spend this month: $5,000
- New customers acquired: 50
- CAC = $5,000 / 50 = $100 per customer

**Why it matters**:
- Shows efficiency of customer acquisition
- Determines how much you can afford to spend on marketing
- Must be compared against LTV to assess sustainability
- Directly impacts profitability

**Benchmark standards**:
- **Excellent**: CAC is <10% of first-year gross profit per customer
- **Healthy**: CAC recoverable within 12 months of customer lifetime
- **Concerning**: CAC > 50% of first-year gross profit
- **Broken**: CAC greater than lifetime customer value

**Where to find it in playbooks**:
- Garbage Collection: "blended CAC: $67" [11:45]
- Personal Styling: "Blended CAC of 600" [6:56]
- Chiropractic: "CAC is about 700" [5:16]

**Variations**:
- **Blended CAC**: Average CAC across all channels (total spend / total customers)
- **Channel CAC**: CAC specific to one acquisition channel
- **Avatar CAC**: CAC specific to one customer type

---

### LTV (Lifetime Value)

**Definition**: The total gross profit you expect from a customer over their entire relationship with your business.

**Formula**:
```
LTV = (Gross Margin per Customer × Average Customer Lifetime in Months) - CAC
```

**Alternative for recurring revenue**:
```
LTV = Monthly Gross Margin × Average Customer Lifetime in Months - CAC
```

**Example**:
- Monthly gross margin per customer: $50
- Average customer lifetime: 36 months
- CAC: $200
- LTV = ($50 × 36) - $200 = $1,800 - $200 = $1,600

**Why it matters**:
- Shows the true profitability potential of each customer
- Must exceed CAC for business viability
- Directly determines scaling budget
- Indicates if business model works long-term

**Benchmark standards**:
- **LTV < CAC**: Business model is broken (losing money)
- **LTV = CAC (1:1)**: Business barely breaks even
- **LTV:CAC 1-3:1**: Fix unit economics before scaling
- **LTV:CAC 3-5:1**: Healthy; can invest in scaling
- **LTV:CAC 5:1+**: Excellent; strong scaling path

**Where to find it in playbooks**:
- Garbage Collection HOA: "LTV $23,000" [12:27]
- Personal Styling: "LTV is 10K annually" [6:56]
- Chiropractic: "lifetime value is 3,400" [5:16]

**Key components**:
- **Gross margin per customer**: Revenue per customer minus cost of goods/services (before operating costs)
- **Average customer lifetime**: How long typical customer stays (in months)
- **Churn**: How many customers leave per month

---

### LTV:CAC Ratio

**Definition**: Ratio comparing lifetime value to customer acquisition cost. The most important profitability metric.

**Formula**:
```
LTV:CAC Ratio = LTV / CAC
```

**Example**:
- LTV = $1,600
- CAC = $200
- Ratio = 1,600 / 200 = 8:1

**Interpretation by Range**:

| Ratio | Status | Action |
|-------|--------|--------|
| <1:1 | **Critical** | Business model is broken; losing money on every customer |
| 1:1 to 2:1 | **Poor** | Barely profitable; don't scale yet |
| 2:1 to 3:1 | **Marginal** | Risky to scale; focus on unit economics first |
| 3:1 to 5:1 | **Healthy** | Can profitably scale; good foundation |
| 5:1 to 10:1 | **Excellent** | Strong economics; significant scaling potential |
| 10:1+ | **Outstanding** | Exceptional profitability; rapid scaling possible |

**Why it matters**:
- Single metric that shows business health
- Determines how aggressively you can scale
- Guides marketing budget allocation
- Indicates if model is sustainable

**Benchmark standards by business type**:
- **SaaS**: Target 3-5:1 (recurring revenue model)
- **High-ticket services**: Target 3-4:1
- **E-commerce**: Target 2-3:1 (lower lifetime)
- **Marketplace**: Target 3-5:1

**Where to find it in playbooks**:
- Garbage Collection HOA: "LTV:CAC 18:1" [12:27]
- Personal Styling: "16 to1 LTV to CAC ratio" [6:56]
- Beverage: "LTV to CAC of 1.7 to1" [5:46]

**Decision rule**:
- If LTV:CAC < 3:1 → Don't scale acquisition yet; fix unit economics first
- If LTV:CAC > 5:1 → Bottleneck is lead volume, not economics

---

### Net Margin

**Definition**: The percentage of revenue that becomes profit after ALL expenses.

**Formula**:
```
Net Margin = (Net Profit / Total Revenue) × 100%
```

**Example**:
- Revenue: $100,000
- All expenses: $80,000
- Net profit: $20,000
- Net margin = (20,000 / 100,000) × 100% = 20%

**Why it matters**:
- Shows true profitability of the business
- Negative margins mean you're losing money
- Determines if business can sustain operations
- Must be positive before scaling

**Benchmark standards by business type**:
- **Service businesses**: 15-25% (goal)
- **Recurring services**: 20-30% (goal)
- **Manufacturing**: 5-15% (lower margins)
- **Retail**: 3-10% (very thin)
- **Consulting**: 25-40% (high margins)

**When negative**:
- Business is losing money
- Must fix before scaling
- Focus on: pricing, cost reduction, or efficiency

**Where to find it in playbooks**:
- Garbage Collection: "net margins are negative 23%" [0:26]
- Personal Styling: "42% in net margins" [0:37]
- Chiropractic: "net profit is about 23%" [0:28]

**Relationship to other metrics**:
- Net margin is the end result of all other metrics
- High CAC + high churn = low net margin
- Improving one metric (e.g., price) improves net margin

**Decision rule**:
- If net margin < 0 → Fix unit economics and cash flow before scaling
- If net margin is 15-20%+ → Focus on growth

---

### Gross Margin

**Definition**: The percentage of revenue remaining after direct costs (COGS), available to cover operating costs and profit.

**Formula**:
```
Gross Margin = ((Revenue - Cost of Goods Sold) / Revenue) × 100%
```

**Alternative**:
```
Gross Margin % = Revenue per Customer - COGS per Customer / Revenue per Customer
```

**Example**:
- Revenue: $1,000
- COGS (supplies, materials, labor for delivery): $300
- Gross profit: $700
- Gross margin = (700 / 1,000) × 100% = 70%

**Why it matters**:
- Shows profit available for operating costs and scaling
- Lower gross margin = harder to be profitable
- Directly impacts viability of business model
- Used to calculate LTV

**Benchmark standards by business type**:
- **Services**: 60-80% (higher is better)
- **High-touch services**: 70-85%
- **SaaS**: 75-90%
- **Manufacturing**: 30-50%
- **Retail**: 30-50%

**Relationship to other metrics**:
- LTV calculation requires gross margin per customer
- Payback period uses monthly gross margin
- Scaling decisions depend on gross margin

**Where to find it in playbooks**:
- Used in all LTV calculations
- Garbage Collection: Implied in LTV calculations

**Decision rule**:
- If gross margin < 40% → Business model may not be viable; test pricing or efficiency
- If gross margin > 70% → Model has room for scaling investment

---

## Conversion & Efficiency Metrics

### Close Rate (Conversion Rate)

**Definition**: The percentage of potential customers (leads) that become paying customers.

**Formula**:
```
Close Rate = (Number of Sales / Number of Leads) × 100%
```

**Example**:
- Leads received: 100
- Sales closed: 25
- Close rate = (25 / 100) × 100% = 25%

**Why it matters**:
- Indicates offer-market fit
- Shows sales effectiveness
- High close rate = pricing may be too low
- Low close rate = offer or sales process problem

**Benchmark standards**:
- **Cold outreach**: 5-15% is typical
- **Warm/referral**: 20-40% is healthy
- **Sales qualified leads**: 40-60% is good
- **High-ticket**: 50-80% if properly qualified

**Common issues**:
- **Close rate < 10%**: Offer messaging mismatch or avatar targeting wrong
- **Close rate 10-20%**: Typical for cold outreach; improve targeting or messaging
- **Close rate > 40%**: Pricing likely too low; test price increase
- **Close rate > 70%**: Check data; may indicate leads are too warm or pricing is too low

**Where to find it in playbooks**:
- Garbage Collection: "close rate is right around 26%" [5:45]
- Personal Styling: "Appointment to sale: 4 sales / 8 appointments = 50%" [5:07]
- Chiropractic: "closing rate is about 71%" [3:13]

**Variations**:
- **Lead-to-sale**: All leads → Sales (includes no-shows)
- **Appointment-to-sale**: Only scheduled appointments → Sales
- **Qualified-to-sale**: Only qualified leads → Sales

**Decision rule**:
- If close rate > 40% → Test higher pricing; lower volume but higher margin may be better
- If close rate < 20% → Problem is not lead volume; fix offer or sales process

---

### Show Rate (Appointment Attendance)

**Definition**: The percentage of scheduled appointments that actually show up.

**Formula**:
```
Show Rate = (Number of Attendees / Number of Scheduled Appointments) × 100%
```

**Example**:
- Appointments scheduled: 20
- Customers who showed up: 16
- Show rate = (16 / 20) × 100% = 80%

**Why it matters**:
- Indicates lead quality and offer appeal
- Factors into real conversion rate (show rate × close rate)
- High no-show rates waste sales time
- Reflects buyer intent and offer relevance

**Benchmark standards**:
- **Cold outreach**: 50-70% show rate
- **Warm/referral**: 70-85% show rate
- **High-engagement offer**: 80-90%+
- **Business-critical meetings**: 90%+

**Interpretation**:
- **Show rate < 50%**: Lead quality issue; targeting or offer doesn't appeal
- **Show rate 50-75%**: Typical for cold; improve targeting or messaging
- **Show rate > 80%**: Excellent; leads are genuinely interested
- **Show rate < 70% + low close rate**: Double problem; fix both

**Where to find it in playbooks**:
- Personal Styling: "100% show ratees" [5:07]
- Chiropractic: "we have a show rate about 80%" [3:07]

**Formula variations**:
- **Actual show rate**: Showed up / Scheduled
- **Effective show rate**: Showed up and engaged / Scheduled
- **Cancellation rate**: Cancellations / Scheduled (inverse measure)

**Decision rule**:
- If show rate < 50% → Problem is offer not appealing; improve messaging or targeting
- If show rate > 80% + close rate < 30% → Sales process or pricing issue

---

### Payback Period

**Definition**: How many months until a customer's gross profit covers their CAC.

**Formula**:
```
Payback Period (months) = CAC / Monthly Gross Margin per Customer
```

**Example**:
- CAC: $300
- Monthly gross margin: $50
- Payback period = 300 / 50 = 6 months

**Why it matters**:
- Shows how long capital is tied up in acquisition
- Customer must generate profit for payback period to recover CAC
- Longer payback = higher risk; customer may churn before paying back
- Affects cash flow and scaling ability

**Benchmark standards**:
- **Excellent**: <3 months
- **Healthy**: 3-6 months
- **Acceptable**: 6-12 months
- **Risky**: 12-18 months
- **Broken**: >18 months (customer likely gone before payback)

**Interpretation**:
- If payback period > 12 months → Customer must stay >1 year to be profitable
- If payback period < 3 months → Quickly cash flow positive; can scale faster
- For recurring revenue, payback period is critical

**Where to find it in playbooks**:
- Implied in all unit economics discussions
- Particularly important for recurring revenue models

**Example scenarios**:
- **Garbage Collection**: $67 CAC / ~$36 monthly margin = ~2 months payback
- **Personal Styling**: $600 CAC / $250+ monthly margin = ~2-3 months payback

**Decision rule**:
- If payback period > 12 months → Model is risky; customer must stay >1 year to break even
- If payback period < 6 months → Can reinvest profits quickly into scaling

---

## Retention & Lifetime Metrics

### Churn Rate

**Definition**: The percentage of customers that leave (stop paying) in a given period.

**Formula**:
```
Monthly Churn Rate = (Customers Lost This Month / Customers at Start of Month) × 100%
```

**Example**:
- Customers at month start: 100
- Customers lost during month: 5
- Monthly churn rate = (5 / 100) × 100% = 5%

**Why it matters**:
- Directly impacts LTV (longer customer lifetime = higher LTV)
- Shows product/service quality and customer satisfaction
- Even small churn changes dramatically impact economics
- Retention is cheaper than acquisition

**Benchmark standards by business type**:
- **SaaS**: 2-5% monthly churn is healthy
- **High-touch services**: 1-3% monthly churn
- **Recurring services**: <2% monthly churn is target
- **Retail/E-commerce**: Harder to measure; focus on repeat rate

**Impact of churn on LTV**:
- 2% monthly churn = ~24 month average lifetime
- 5% monthly churn = ~20 month average lifetime
- 10% monthly churn = ~10 month average lifetime

**Where to find it in playbooks**:
- Personal Styling: "she's only lost one customer over a year out of 40" = 2.5% annual = 0.2% monthly
- Eyelash: 30% new / 70% returning = implies strong retention

**Decision rule**:
- High CAC + high churn = business doesn't work (customers gone before payback)
- High retention + low CAC = excellent model

---

### Customer Lifetime

**Definition**: The average number of months or years a customer stays with the business.

**Formula**:
```
Average Lifetime (months) = 1 / Monthly Churn Rate
```

**Example**:
- Monthly churn rate: 5%
- Average lifetime = 1 / 0.05 = 20 months

**Why it matters**:
- Directly used in LTV calculation
- Determines viability of acquisition spending
- Indicates business model sustainability
- Shows customer satisfaction/product-market fit

**Benchmark standards**:
- **SaaS**: 18-36 months
- **High-ticket services**: 24-60 months
- **Recurring services**: 24-48 months
- **E-commerce one-time**: 1 transaction

**Where to find it in playbooks**:
- Implied in all LTV calculations
- Important for recurring revenue models

**Relationship to other metrics**:
- LTV = Gross margin × lifetime - CAC
- Improving lifetime improves LTV without spending on acquisition

---

## Scaling Metrics

### Revenue per Customer

**Definition**: Total revenue from a customer divided by number of customers.

**Formula**:
```
Revenue per Customer = Total Revenue / Number of Customers
```

**Example**:
- Monthly revenue: $10,000
- Active customers: 50
- Revenue per customer = $10,000 / 50 = $200

**Why it matters**:
- Shows average transaction value
- Indicates pricing adequacy
- Used in unit economics calculations
- Helps identify customer quality

**Benchmark standards**: Varies widely by industry

**Variations**:
- **Average transaction value**: Revenue / Number of transactions
- **Annual revenue per customer**: Annual revenue / Active customers
- **Revenue per unit**: Revenue / Units sold

---

### Customer Acquisition Cost Percentage

**Definition**: Marketing spend as a percentage of revenue.

**Formula**:
```
CAC as % of Revenue = (Total Marketing Spend / Total Revenue) × 100%
```

**Example**:
- Annual revenue: $1M
- Annual marketing spend: $100K
- CAC as % = (100K / 1M) × 100% = 10%

**Why it matters**:
- Shows marketing efficiency
- Indicates sustainability of acquisition spending
- Benchmarks against industry standards

**Benchmark standards**:
- **Service businesses**: 5-15%
- **High-growth startups**: 15-30%
- **Mature businesses**: <10%
- **Can't exceed**: Gross margin %

**Where to find it in playbooks**:
- Eyelash: "$12,000/year on $2.3M revenue = 0.5%"

---

## Decision Tree Metrics

### Business Health Score (Qualitative)

Based on combination of metrics:

**Green flags** (business is healthy):
- LTV:CAC ≥ 3:1
- Net margin > 15%
- Churn < 5% monthly
- Close rate 30-60%
- Show rate > 70%

**Yellow flags** (needs improvement):
- LTV:CAC 2-3:1
- Net margin 5-15%
- Churn 5-10% monthly
- Close rate 20-30%
- Show rate 50-70%

**Red flags** (critical issues):
- LTV:CAC < 2:1
- Net margin < 0% (losing money)
- Churn > 10% monthly
- Close rate < 20%
- Show rate < 50%

---

## Metrics by Business Type

### Recurring Revenue (SaaS, Subscriptions)
**Most important metrics**:
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Churn Rate
- LTV:CAC Ratio
- Payback Period

### High-Ticket Services
**Most important metrics**:
- Close rate
- Average deal size
- Sales cycle length
- Payback period
- CAC per deal
- Net margin

### Multi-Location Business
**Most important metrics**:
- Revenue per location
- Customer acquisition cost per location
- Unit-level profitability
- Same-store growth
- CAC by channel

### E-Commerce
**Most important metrics**:
- Average order value (AOV)
- Customer acquisition cost (CAC)
- Repeat purchase rate
- Customer lifetime value (LTV)
- Gross margin

---

## Cross-Playbook Metric Comparison

| Metric | Garbage Collection | Personal Styling | Chiropractic | Beverage | Eyelash | Thai Restaurant |
|--------|---|---|---|---|---|---|
| Revenue | $642K | $309K | $5.2M | $1.1M | $2.3M | $3.5M |
| Net Margin | -23% | +42% | +23% | +11.3% | +28% | +19% |
| CAC | $67 | $600 | $700 | $12K | Estimated | N/A |
| LTV | $1,300 | $10K | $3,400 | ~$20K | Estimated | N/A |
| LTV:CAC | 19:1 | 16:1 | 4.8:1 | 1.7:1 | Estimated | N/A |
| Close Rate | 33% | 50% | 71% | TBD | TBD | N/A |
| Show Rate | N/A | 100% | 80% | N/A | N/A | N/A |

---

## Using This Glossary

### To calculate a metric:
1. Find the metric name
2. Look at the Formula section
3. Gather the required data
4. Calculate
5. Check your work against examples

### To understand a metric:
1. Read the Definition
2. Study the Why it matters section
3. Review the Benchmark standards
4. Find the metric in a playbook example

### To interpret results:
1. Calculate your metric
2. Compare to Benchmark standards
3. Check Decision rule at bottom
4. See which action to take

### To improve a metric:
Look at what factors into the formula and improve each component:
- CAC: Reduce marketing spend OR increase customers per dollar
- LTV: Increase customer lifetime OR increase gross margin OR reduce CAC
- Close rate: Improve targeting OR improve offer OR improve sales process
- Net margin: Increase revenue OR reduce costs

---

**Last Updated**: 2026-01-18
**Metrics Covered**: 17 core metrics + variations
**Status**: Complete reference
