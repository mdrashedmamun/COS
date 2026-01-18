'use client'

import React from 'react'

interface SelectCardProps {
  emoji?: string
  title: string
  description?: string
  selected?: boolean
  onClick: () => void
}

export function SelectCard({
  emoji,
  title,
  description,
  selected = false,
  onClick,
}: SelectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all
        ${
          selected
            ? 'border-sage-500 bg-sage-50 shadow-md'
            : 'border-warm-200 bg-white hover:border-sage-300 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <div className="flex-1">
          <h4 className="font-medium text-warm-900">{title}</h4>
          {description && (
            <p className="text-sm text-warm-600 mt-1">{description}</p>
          )}
        </div>
        {selected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
