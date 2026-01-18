'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getPlaybookContent, getPlaybookTitle } from '@/lib/utils/playbook-loader'
import { getConstraintDetails, ConstraintType, ALL_CONSTRAINTS } from '@/lib/utils/constraint-diagnosis'
import { getAnalytics } from '@/lib/utils/analytics'
import ReactMarkdown from 'react-markdown'

interface PlaybookParams {
  constraint: string
}

export default function PlaybookPage() {
  const params = useParams() as PlaybookParams
  const router = useRouter()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedSection, setSelectedSection] = useState<string>('')
  const analyticsRef = useRef(getAnalytics())

  const constraint = params.constraint as ConstraintType

  useEffect(() => {
    if (!constraint || !ALL_CONSTRAINTS.includes(constraint)) {
      router.push('/calculator')
      return
    }

    // Load playbook content
    const loadPlaybook = async () => {
      try {
        // Get default vertical from session or use first available
        const vertical = sessionStorage.getItem('selectedVertical') || 'styling'
        const playbookContent = await getPlaybookContent(vertical, constraint)
        const playbookTitle = await getPlaybookTitle(vertical, constraint)

        setContent(playbookContent)
        setTitle(playbookTitle)

        // Track playbook viewing
        analyticsRef.current.track('playbook_viewed', {
          constraint,
          title: playbookTitle,
        })
      } catch (error) {
        console.error('Error loading playbook:', error)
        setContent(
          `# Error Loading Playbook\n\nThere was an issue loading the playbook for ${constraint}. Please try again.`
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPlaybook()
  }, [constraint, router])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement
      const scrollTop = window.scrollY
      const docHeight = element.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownload = () => {
    // Track download
    analyticsRef.current.track('playbook_downloaded', {
      constraint,
      title,
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `${title.replace(/\s+/g, '-').toLowerCase()}.md`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    // Track share attempt
    analyticsRef.current.track('playbook_shared', {
      constraint,
      title,
    })

    const text = `Check out this growth playbook for ${title}`
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      })
    } else {
      alert('Copy this link to share:\n\n' + window.location.href)
    }
  }

  const details = getConstraintDetails(constraint)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-gentle">{details.emoji}</div>
          <h2 className="text-xl font-serif font-semibold text-warm-900 mb-2">Loading your playbook...</h2>
          <p className="text-warm-600">Just a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-warm-200 z-40">
        <div
          className="h-full bg-sage-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/calculator">
              <Button variant="ghost" size="sm">
                ← Back
              </Button>
            </Link>
            <div>
              <p className="text-xs text-warm-600">{details.title} Constraint</p>
              <h1 className="font-serif font-semibold text-warm-900 text-sm">
                {title.split(' - ')[0]}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleShare}>
              Share
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="text-6xl mb-6 animate-pulse-gentle inline-block">{details.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-warm-900 mb-4">{title}</h1>
          <p className="text-lg text-warm-600 max-w-2xl mx-auto">
            A step-by-step playbook designed specifically for your constraint. Follow this roadmap over the next 90
            days to unlock growth.
          </p>
        </div>

        {/* Playbook Content */}
        <Card className="mb-12 p-8 md:p-12 prose prose-warm max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-serif font-semibold text-warm-900 mt-8 mb-4 first:mt-0" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-serif font-semibold text-warm-900 mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold text-warm-800 mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-base text-warm-800 leading-relaxed mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-warm-800" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 text-warm-800" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-sage-400 pl-4 py-2 italic text-warm-700 my-4 bg-sage-50 rounded"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-sage-700" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-warm-100 px-2 py-1 rounded text-sm font-mono text-warm-900" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-sage-50 to-warm-50 border border-sage-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-serif font-semibold text-warm-900 mb-2">Ready to implement?</h3>
          <p className="text-warm-600 mb-6">
            Print this playbook, share with your team, and start with Phase 1 this week.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={handleDownload}>
              Download for Your Team
            </Button>
            <Link href="/calculator">
              <Button variant="secondary">Analyze Another Business</Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-warm-200 text-center text-sm text-warm-600">
          <p>This playbook is tailored to your specific constraint. Update metrics quarterly to track progress.</p>
        </div>
      </div>
    </div>
  )
}
