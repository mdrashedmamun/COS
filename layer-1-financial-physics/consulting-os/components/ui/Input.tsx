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
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-warm-900 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 text-base border border-warm-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all ${
          error ? 'border-quality-500 focus:ring-quality-400' : ''
        } ${className}`}
        {...props}
      />
      {helper && !error && (
        <p className="mt-1 text-sm text-warm-600">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-quality-600">{error}</p>
      )}
    </div>
  )
}
