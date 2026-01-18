/**
 * Analytics tracking for user journey
 * For MVP, this stores data in localStorage
 * In production, send to Segment, Mixpanel, or custom API
 */

export type EventType =
  | 'form_started'
  | 'form_step_completed'
  | 'form_completed'
  | 'diagnosis_viewed'
  | 'playbook_viewed'
  | 'playbook_downloaded'
  | 'playbook_shared'
  | 'page_visited'

export interface AnalyticsEvent {
  type: EventType
  timestamp: number
  data?: Record<string, any>
  sessionId: string
}

class Analytics {
  private sessionId: string
  private events: AnalyticsEvent[] = []

  constructor() {
    // Generate or retrieve session ID
    this.sessionId =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('sessionId') ||
          this.generateSessionId()
        : this.generateSessionId()

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sessionId', this.sessionId)
      this.loadEvents()
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private loadEvents() {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem(`analytics_${this.sessionId}`)
    this.events = stored ? JSON.parse(stored) : []
  }

  private saveEvents() {
    if (typeof window === 'undefined') return

    localStorage.setItem(`analytics_${this.sessionId}`, JSON.stringify(this.events))
  }

  /**
   * Track a user action
   */
  track(type: EventType, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data,
      sessionId: this.sessionId,
    }

    this.events.push(event)
    this.saveEvents()

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', type, data)
    }

    // In production, send to analytics service
    this.sendToAnalyticsService(event)
  }

  /**
   * Send to analytics service (Segment, Mixpanel, etc.)
   */
  private sendToAnalyticsService(event: AnalyticsEvent) {
    // This is where you'd integrate with your analytics provider
    // For now, just log it
    if (typeof window !== 'undefined') {
      // Example: send to your API endpoint
      // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) })
    }
  }

  /**
   * Get all events for this session
   */
  getEvents(): AnalyticsEvent[] {
    return this.events
  }

  /**
   * Get events of a specific type
   */
  getEventsByType(type: EventType): AnalyticsEvent[] {
    return this.events.filter(e => e.type === type)
  }

  /**
   * Check if user has completed core action
   * Core action = completed form + viewed playbook
   */
  hasCompletedCoreAction(): boolean {
    const formCompleted = this.events.some(e => e.type === 'form_completed')
    const playbookViewed = this.events.some(e => e.type === 'playbook_viewed')
    return formCompleted && playbookViewed
  }

  /**
   * Get user journey summary
   */
  getJourneySummary() {
    return {
      sessionId: this.sessionId,
      totalEvents: this.events.length,
      eventTypes: [...new Set(this.events.map(e => e.type))],
      formStarted: this.events.some(e => e.type === 'form_started'),
      formCompleted: this.events.some(e => e.type === 'form_completed'),
      diagnosisViewed: this.events.some(e => e.type === 'diagnosis_viewed'),
      playbookViewed: this.events.some(e => e.type === 'playbook_viewed'),
      playbookDownloaded: this.events.some(e => e.type === 'playbook_downloaded'),
      playbookShared: this.events.some(e => e.type === 'playbook_shared'),
      coreActionCompleted: this.hasCompletedCoreAction(),
      sessionDuration: this.events.length > 0 ? Date.now() - this.events[0].timestamp : 0,
    }
  }

  /**
   * Clear session data
   */
  clearSession() {
    this.events = []
    this.saveEvents()
  }
}

// Singleton instance
let analyticsInstance: Analytics | null = null

export function getAnalytics(): Analytics {
  if (typeof window === 'undefined') {
    // Return a no-op instance for server-side rendering
    return {
      track: () => {},
      getEvents: () => [],
      getEventsByType: () => [],
      hasCompletedCoreAction: () => false,
      getJourneySummary: () => ({
        sessionId: 'server',
        totalEvents: 0,
        eventTypes: [],
        formStarted: false,
        formCompleted: false,
        diagnosisViewed: false,
        playbookViewed: false,
        playbookDownloaded: false,
        playbookShared: false,
        coreActionCompleted: false,
        sessionDuration: 0,
      }),
      clearSession: () => {},
    } as any
  }

  if (!analyticsInstance) {
    analyticsInstance = new Analytics()
  }

  return analyticsInstance
}

/**
 * Hook to track page views
 * Usage: useTrackPageView('playbook_viewer')
 */
export function useTrackPageView(pageName: string) {
  if (typeof window === 'undefined') return

  const analytics = getAnalytics()
  return () => {
    analytics.track('page_visited', { page: pageName })
  }
}
