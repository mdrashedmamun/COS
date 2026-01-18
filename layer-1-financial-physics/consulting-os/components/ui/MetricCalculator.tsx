'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

type MetricType = 'margin' | 'cac' | 'ltv'

interface MetricCalculatorProps {
  metricType: MetricType
  onCalculate: (value: number) => void
  onTrack?: (event: string, data: any) => void
  revenue?: number      // For LTV/Margin
  margin?: number       // For LTV
}

export function MetricCalculator({
  metricType,
  onCalculate,
  onTrack,
  revenue,
  margin,
}: MetricCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null)

  const track = (event: string, data?: any) => {
    if (onTrack) {
      onTrack(event, { metric: metricType, ...data })
    }
  }

  // Margin Calculator: (revenue - totalCosts) / revenue
  const [marginInputs, setMarginInputs] = useState({
    annualRevenue: revenue || 0,
    laborCosts: 0,
    materialCosts: 0,
    overheadCosts: 0,
    marketingCosts: 0,
  })

  // CAC Calculator: (monthlyMarketing + monthlySales) / newCustomersPerMonth
  const [cacInputs, setCacInputs] = useState({
    monthlyMarketing: 0,
    monthlySales: 0,
    newCustomersPerMonth: 0,
  })

  // LTV Calculator: (revenuePerCustomer * margin * lifetimeMonths) / 12
  const [ltvInputs, setLtvInputs] = useState({
    annualRevenue: revenue || 0,
    totalCustomers: 0,
    customerLifetimeMonths: 24,
    margin: margin || 0,
  })

  const calculateMargin = () => {
    const totalCosts = marginInputs.laborCosts + marginInputs.materialCosts + marginInputs.overheadCosts + marginInputs.marketingCosts
    if (marginInputs.annualRevenue <= 0) {
      alert('Annual revenue must be greater than 0')
      return
    }
    const calculatedMargin = (marginInputs.annualRevenue - totalCosts) / marginInputs.annualRevenue
    setCalculatedValue(Math.max(-1, Math.min(1, calculatedMargin))) // Clamp to -1 to 1
  }

  const calculateCAC = () => {
    if (cacInputs.newCustomersPerMonth <= 0) {
      alert('New customers per month must be greater than 0')
      return
    }
    const totalMonthlyAcquisitionCost = cacInputs.monthlyMarketing + cacInputs.monthlySales
    const cac = totalMonthlyAcquisitionCost / cacInputs.newCustomersPerMonth
    setCalculatedValue(cac)
  }

  const calculateLTV = () => {
    if (ltvInputs.totalCustomers <= 0) {
      alert('Total customers must be greater than 0')
      return
    }
    const revenuePerCustomer = ltvInputs.annualRevenue / ltvInputs.totalCustomers
    const ltv = (revenuePerCustomer * ltvInputs.margin * ltvInputs.customerLifetimeMonths) / 12
    setCalculatedValue(ltv)
  }

  const handleApply = () => {
    if (calculatedValue !== null) {
      track('calculator_applied', { calculatedValue })
      onCalculate(calculatedValue)
      setIsExpanded(false)
      setCalculatedValue(null)
    }
  }

  const handleCancel = () => {
    setIsExpanded(false)
    setCalculatedValue(null)
  }

  const renderMarginCalculator = () => (
    <div className="space-y-4 p-4 bg-sage-50 border border-sage-200 rounded-lg">
      <p className="text-sm font-medium text-warm-900 mb-4">
        Calculate margin: <span className="text-sage-600 font-semibold">(revenue - costs) / revenue</span>
      </p>

      <div className="space-y-3">
        <Input
          type="number"
          label="Annual Revenue"
          value={marginInputs.annualRevenue || ''}
          onChange={e => setMarginInputs({ ...marginInputs, annualRevenue: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 500000"
        />

        <Input
          type="number"
          label="Annual Labor Costs"
          value={marginInputs.laborCosts || ''}
          onChange={e => setMarginInputs({ ...marginInputs, laborCosts: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 200000"
        />

        <Input
          type="number"
          label="Annual Material Costs"
          value={marginInputs.materialCosts || ''}
          onChange={e => setMarginInputs({ ...marginInputs, materialCosts: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 100000"
        />

        <Input
          type="number"
          label="Annual Overhead Costs"
          value={marginInputs.overheadCosts || ''}
          onChange={e => setMarginInputs({ ...marginInputs, overheadCosts: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 50000"
        />

        <Input
          type="number"
          label="Annual Marketing Costs"
          value={marginInputs.marketingCosts || ''}
          onChange={e => setMarginInputs({ ...marginInputs, marketingCosts: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 25000"
        />
      </div>

      {calculatedValue !== null && (
        <div className="p-3 bg-white rounded border border-sage-200">
          <p className="text-sm text-warm-600 mb-1">Calculated margin:</p>
          <p className="text-2xl font-semibold text-sage-600">
            {(calculatedValue * 100).toFixed(1)}%
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={calculateMargin} className="flex-1">
          Calculate
        </Button>
        {calculatedValue !== null && (
          <Button variant="secondary" size="sm" onClick={handleApply} className="flex-1">
            Use This Value
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )

  const renderCACCalculator = () => (
    <div className="space-y-4 p-4 bg-sage-50 border border-sage-200 rounded-lg">
      <p className="text-sm font-medium text-warm-900 mb-4">
        Calculate CAC: <span className="text-sage-600 font-semibold">(marketing + sales) / new customers</span>
      </p>

      <div className="space-y-3">
        <Input
          type="number"
          label="Monthly Marketing Spend"
          value={cacInputs.monthlyMarketing || ''}
          onChange={e => setCacInputs({ ...cacInputs, monthlyMarketing: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 2000"
        />

        <Input
          type="number"
          label="Monthly Sales Costs"
          value={cacInputs.monthlySales || ''}
          onChange={e => setCacInputs({ ...cacInputs, monthlySales: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 500"
        />

        <Input
          type="number"
          label="New Customers Per Month"
          value={cacInputs.newCustomersPerMonth || ''}
          onChange={e => setCacInputs({ ...cacInputs, newCustomersPerMonth: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 50"
        />
      </div>

      {calculatedValue !== null && (
        <div className="p-3 bg-white rounded border border-sage-200">
          <p className="text-sm text-warm-600 mb-1">Calculated CAC:</p>
          <p className="text-2xl font-semibold text-sage-600">
            ${calculatedValue.toFixed(0)}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={calculateCAC} className="flex-1">
          Calculate
        </Button>
        {calculatedValue !== null && (
          <Button variant="secondary" size="sm" onClick={handleApply} className="flex-1">
            Use This Value
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )

  const renderLTVCalculator = () => (
    <div className="space-y-4 p-4 bg-sage-50 border border-sage-200 rounded-lg">
      <p className="text-sm font-medium text-warm-900 mb-4">
        Calculate LTV: <span className="text-sage-600 font-semibold">(revenue/customer × margin × lifetime) / 12</span>
      </p>

      <div className="space-y-3">
        <Input
          type="number"
          label="Annual Revenue"
          value={ltvInputs.annualRevenue || ''}
          onChange={e => setLtvInputs({ ...ltvInputs, annualRevenue: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 500000"
        />

        <Input
          type="number"
          label="Total Active Customers"
          value={ltvInputs.totalCustomers || ''}
          onChange={e => setLtvInputs({ ...ltvInputs, totalCustomers: parseInt(e.target.value) || 0 })}
          placeholder="e.g., 100"
        />

        <Input
          type="number"
          label="Profit Margin (%)"
          value={ltvInputs.margin ? (ltvInputs.margin * 100).toFixed(1) : ''}
          onChange={e => setLtvInputs({ ...ltvInputs, margin: (parseInt(e.target.value) || 0) / 100 })}
          placeholder="e.g., 20"
        />

        <Input
          type="number"
          label="Average Customer Lifetime (months)"
          value={ltvInputs.customerLifetimeMonths || ''}
          onChange={e => setLtvInputs({ ...ltvInputs, customerLifetimeMonths: parseInt(e.target.value) || 24 })}
          placeholder="e.g., 24"
        />
      </div>

      {calculatedValue !== null && (
        <div className="p-3 bg-white rounded border border-sage-200">
          <p className="text-sm text-warm-600 mb-1">Calculated LTV:</p>
          <p className="text-2xl font-semibold text-sage-600">
            ${calculatedValue.toFixed(0)}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={calculateLTV} className="flex-1">
          Calculate
        </Button>
        {calculatedValue !== null && (
          <Button variant="secondary" size="sm" onClick={handleApply} className="flex-1">
            Use This Value
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  )

  const labels = {
    margin: 'Calculate margin for me',
    cac: 'Calculate CAC for me',
    ltv: 'Calculate LTV for me',
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => {
          track('calculator_opened')
          setIsExpanded(true)
        }}
        className="mt-4 text-sm text-sage-600 hover:text-sage-700 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded px-1"
      >
        🔢 {labels[metricType]}
      </button>
    )
  }

  return (
    <div className="mt-4">
      {metricType === 'margin' && renderMarginCalculator()}
      {metricType === 'cac' && renderCACCalculator()}
      {metricType === 'ltv' && renderLTVCalculator()}
    </div>
  )
}
