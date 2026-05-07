import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLicenses, saveLicenses } from '@/lib/license-db';
import crypto from 'crypto';

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  return authCookie?.value === 'authenticated';
}

function generateLicenseKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  const segment = () => {
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = crypto.randomInt(chars.length);
      result += chars[randomIndex];
    }
    return result;
  };
  
  return `SGTA-${segment()}-${segment()}-${segment()}`;
}

const PLAN_ACTIVATIONS: Record<string, number> = {
  single: 2,
  pro: 5,
  federation: 99,
};

export async function POST(request: NextRequest) {
  // Check authentication
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { plan, customerName, expiresAt } = await request.json();

    // Validate plan
    if (!PLAN_ACTIVATIONS[plan]) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const licenses = getLicenses();
    
    // Generate unique key
    let key: string;
    let attempts = 0;
    do {
      key = generateLicenseKey();
      attempts++;
      if (attempts > 100) {
        return NextResponse.json(
          { success: false, error: 'Failed to generate unique key' },
          { status: 500 }
        );
      }
    } while (licenses[key]);

    // Create license
    const newLicense = {
      plan,
      maxActivations: PLAN_ACTIVATIONS[plan],
      activations: [],
      createdAt: new Date().toISOString(),
      revoked: false,
      ...(customerName && { customerName }),
      ...(expiresAt && { 
        expiresAt: new Date(expiresAt + 'T23:59:59.999Z').toISOString() 
      }),
    };

    licenses[key] = newLicense;
    saveLicenses(licenses);

    return NextResponse.json({
      success: true,
      key,
      license: newLicense,
    });
  } catch (error) {
    console.error('Create license error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create license' },
      { status: 500 }
    );
  }
}
