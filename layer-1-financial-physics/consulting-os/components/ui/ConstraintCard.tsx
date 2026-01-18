'use client'

import React from 'react'

type ConstraintType = 'demand' | 'delivery' | 'efficiency' | 'quality' | 'capital' | 'retention' | 'pricing'

interface ConstraintCardProps {
  constraint: ConstraintType
  title: string
  description: string
  explanation: string
  isClickable?: boolean
  onClick?: () => void
}

const constraintConfig: Record<ConstraintType, { emoji: string; color: string; bgColor: string }> = {
  demand: { emoji: '💸', color: 'demand-600', bgColor: 'demand-50' },
  delivery: { emoji: '⚙️', color: 'delivery-600', bgColor: 'delivery-50' },
  efficiency: { emoji: '📊', color: 'efficiency-600', bgColor: 'efficiency-50' },
  quality: { emoji: '⭐', color: 'quality-600', bgColor: 'quality-50' },
  capital: { emoji: '💰', color: 'capital-600', bgColor: 'capital-50' },
  retention: { emoji: '🪝', color: 'retention-600', bgColor: 'retention-50' },
  pricing: { emoji: '💎', color: 'pricing-600', bgColor: 'pricing-50' },
}

export function ConstraintCard({
  constraint,
  title,
  description,
  explanation,
  isClickable = false,
  onClick,
}: ConstraintCardProps) {
  const config = constraintConfig[constraint]

  return (
    <div
      className={`
        p-6 rounded-lg border-2 transition-all
        ${isClickable ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'border-warm-200'}
        bg-white
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`text-4xl flex-shrink-0 animate-pulse-gentle`}>
          {config.emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-warm-900">
            {title}
          </h3>
          <p className="text-sm text-warm-600 mt-1">
            {description}
          </p>
          <p className="text-base text-warm-800 mt-3 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  )
}
