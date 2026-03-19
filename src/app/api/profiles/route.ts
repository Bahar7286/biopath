import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with Supabase in production
const profiles = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (username) {
      const profile = profiles.get(username);
      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(profile);
    }

    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  } catch (error) {
    console.error('GET /api/profiles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, fullName, bio, email, location, website } = body;

    if (!username || !fullName) {
      return NextResponse.json(
        { error: 'Username and full name are required' },
        { status: 400 }
      );
    }

    const profile = {
      username,
      fullName,
      bio: bio || '',
      email: email || '',
      location: location || '',
      website: website || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    profiles.set(username, profile);

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error('POST /api/profiles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, ...updateData } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const profile = profiles.get(username);
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const updatedProfile = {
      ...profile,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    profiles.set(username, updatedProfile);

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('PUT /api/profiles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
