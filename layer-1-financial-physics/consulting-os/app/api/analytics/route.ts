import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/analytics
 * Store analytics events in Vercel KV for persistence
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, type, timestamp, data } = body

    if (!sessionId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store event in KV with session ID as key
    const key = `analytics:${sessionId}:${timestamp}`
    const event = {
      type,
      timestamp,
      data,
    }

    // Set expiration to 30 days
    await kv.setex(key, 30 * 24 * 60 * 60, JSON.stringify(event))

    // Also maintain a list of all events for this session
    const sessionKey = `session:${sessionId}`
    await kv.lpush(sessionKey, JSON.stringify(event))
    await kv.expire(sessionKey, 30 * 24 * 60 * 60)

    return NextResponse.json({ success: true, sessionId })
  } catch (error) {
    console.error('[API] Analytics POST error:', error)
    return NextResponse.json(
      { error: 'Failed to store analytics event' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/analytics/session/[id]
 * Retrieve all analytics events for a session
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      )
    }

    const sessionKey = `session:${sessionId}`
    const events = await kv.lrange(sessionKey, 0, -1)

    return NextResponse.json({
      sessionId,
      eventCount: events.length,
      events: events.map(e => (typeof e === 'string' ? JSON.parse(e) : e)),
    })
  } catch (error) {
    console.error('[API] Analytics GET error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve analytics events' },
      { status: 500 }
    )
  }
}
