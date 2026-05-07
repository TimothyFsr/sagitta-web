import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLicenses } from '@/lib/license-db';

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  return authCookie?.value === 'authenticated';
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const licenses = getLicenses();
    
    // Calculate stats
    const keys = Object.keys(licenses);
    const stats = {
      total: keys.length,
      active: keys.filter(k => !licenses[k].revoked).length,
      revoked: keys.filter(k => licenses[k].revoked).length,
      totalActivations: keys.reduce((sum, k) => sum + licenses[k].activations.length, 0),
      plans: keys.reduce((acc, k) => {
        acc[licenses[k].plan] = (acc[licenses[k].plan] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    return NextResponse.json({ licenses, stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load licenses' },
      { status: 500 }
    );
  }
}
