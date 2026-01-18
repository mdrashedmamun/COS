/**
 * Reusable skeleton loader component for loading states
 * Shows placeholder content while data loads
 */

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'button' | 'input' | 'list'
  count?: number
  className?: string
}

export function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const baseClasses =
    'bg-gradient-to-r from-warm-200 via-warm-100 to-warm-200 animate-pulse'

  const variants = {
    card: 'h-32 rounded-lg mb-4',
    text: 'h-4 rounded mb-2 w-full',
    button: 'h-10 rounded-lg w-full',
    input: 'h-10 rounded-lg w-full',
    list: 'h-16 rounded-lg mb-3',
  }

  const variantClass = variants[variant]

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} ${variantClass} ${
            variant === 'text' && i > 0 ? 'w-5/6' : ''
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for diagnosis card with animation
 */
export function DiagnosisCardSkeleton() {
  return (
    <div className="space-y-4 p-8">
      <SkeletonLoader variant="text" count={1} className="h-6 rounded" />
      <SkeletonLoader variant="text" count={3} className="space-y-2" />
      <div className="grid grid-cols-2 gap-4 pt-4">
        <SkeletonLoader variant="card" className="h-24" />
        <SkeletonLoader variant="card" className="h-24" />
      </div>
    </div>
  )
}

/**
 * Skeleton for form input
 */
export function InputSkeleton() {
  return (
    <div className="space-y-2">
      <SkeletonLoader variant="text" className="h-4 w-32" />
      <SkeletonLoader variant="input" />
    </div>
  )
}

/**
 * Skeleton for full page loading
 */
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-warm-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <SkeletonLoader variant="card" className="h-24" />
        <SkeletonLoader variant="card" className="h-64" />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonLoader variant="button" />
          <SkeletonLoader variant="button" />
        </div>
      </div>
    </div>
  )
}
