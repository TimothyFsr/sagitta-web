import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLicenses, saveLicenses } from '@/lib/license-db';

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  return authCookie?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  // Check authentication
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, revoked } = await request.json();

    const licenses = getLicenses();
    
    if (!licenses[key]) {
      return NextResponse.json(
        { success: false, error: 'License not found' },
        { status: 404 }
      );
    }

    licenses[key].revoked = revoked;
    saveLicenses(licenses);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update license' },
      { status: 500 }
    );
  }
}
