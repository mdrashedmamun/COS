'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Card } from './Card'
import { Button } from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Error boundary component that catches rendering errors
 * Displays user-friendly error message instead of white screen
 */
export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true)
      setError(event.error)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError || error) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100 flex items-center justify-center px-4">
          <Card className="max-w-md">
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-warm-600 mb-6">
                We encountered an unexpected error. Please try again.
              </p>
              {process.env.NODE_ENV === 'development' && error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-warm-500 hover:text-warm-600">
                    Error details (dev only)
                  </summary>
                  <pre className="mt-2 p-2 bg-warm-100 rounded text-xs overflow-auto max-h-40 text-warm-800">
                    {error.message}
                  </pre>
                </details>
              )}
              <Button
                variant="primary"
                onClick={() => {
                  setHasError(false)
                  setError(null)
                  window.location.href = '/'
                }}
              >
                Go Home
              </Button>
            </div>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
