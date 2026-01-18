'use client'

import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'subtle'
}

export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white border border-warm-200 rounded-lg shadow-sm',
    elevated: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow',
    subtle: 'bg-warm-50 border border-warm-100 rounded-lg',
  }

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
