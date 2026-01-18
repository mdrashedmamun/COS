'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helper?: string
  error?: string
}

export function Input({
  label,
  helper,
  error,
  className = '',
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`
  const helperId = helper ? `${inputId}-helper` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-warm-900 mb-1.5"
        >
          {label}
          {required && <span className="text-quality-600 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 text-base border border-warm-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all focus-visible:ring-offset-2 min-h-[44px] ${
          error
            ? 'border-quality-500 focus:ring-quality-400 bg-quality-50'
            : 'hover:border-warm-300'
        } ${className}`}
        aria-describedby={`${helperId || ''} ${errorId || ''}`.trim()}
        aria-invalid={!!error}
        aria-required={required}
        {...props}
      />
      {helper && !error && (
        <p id={helperId} className="mt-1 text-sm text-warm-600">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-quality-600 font-medium" role="alert">
          ✗ {error}
        </p>
      )}
    </div>
  )
}
