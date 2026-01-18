'use client'

import React from 'react'

interface Step {
  id: string | number
  label: string
  completed?: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string | number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = step.completed !== false && index < currentIndex
        const isCurrent = step.id === currentStep
        const isUpcoming = index > currentIndex

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all
                  ${
                    isCompleted
                      ? 'bg-sage-500 text-white'
                      : isCurrent
                        ? 'bg-sage-600 text-white ring-2 ring-sage-300'
                        : 'bg-warm-200 text-warm-600'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`mt-2 text-xs font-medium text-center max-w-20 ${
                isCurrent ? 'text-sage-600' : isCompleted ? 'text-warm-700' : 'text-warm-500'
              }`}>
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-2 rounded-full transition-all
                  ${isCompleted ? 'bg-sage-500' : 'bg-warm-200'}
                `}
                style={{ minWidth: '20px' }}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
