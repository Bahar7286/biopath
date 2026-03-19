import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data - replace with Supabase in production
const analyticsData = new Map();

export interface AnalyticsEvent {
  type: 'view' | 'click' | 'share' | 'follow';
  username: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const period = searchParams.get('period') || '7days';

    if (!username) {
      return NextResponse.json(
        { error: 'Username required' },
        { status: 400 }
      );
    }

    const events = analyticsData.get(username) || [];
    
    // Calculate stats
    const views = events.filter((e: AnalyticsEvent) => e.type === 'view').length;
    const clicks = events.filter((e: AnalyticsEvent) => e.type === 'click').length;
    const shares = events.filter((e: AnalyticsEvent) => e.type === 'share').length;
    const followers = events.filter((e: AnalyticsEvent) => e.type === 'follow').length;

    const engagement = views > 0 ? Math.round((clicks / views) * 100) : 0;

    return NextResponse.json({
      username,
      period,
      stats: {
        views,
        clicks,
        shares,
        followers,
        engagement,
      },
      events: events.slice(-30), // Last 30 events
    });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, type, metadata } = body;

    if (!username || !type) {
      return NextResponse.json(
        { error: 'Username and type are required' },
        { status: 400 }
      );
    }

    const event: AnalyticsEvent = {
      type,
      username,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // Store event
    if (!analyticsData.has(username)) {
      analyticsData.set(username, []);
    }
    const events = analyticsData.get(username);
    events.push(event);

    // Keep only last 1000 events per user
    if (events.length > 1000) {
      analyticsData.set(username, events.slice(-1000));
    }

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('POST /api/analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
