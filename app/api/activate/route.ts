import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { addActivation, getLicense, logActivation } from "@/lib/license-db";
import { checkRateLimit } from "@/lib/rate-limiter";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Rate limiting
    const { allowed, remaining } = checkRateLimit(ip, 5, 60 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: "RATE_LIMIT_EXCEEDED" },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { key, hardwareId, software } = body;

    // Validate input
    if (!key || !hardwareId) {
      return NextResponse.json(
        { error: "MISSING_PARAMETERS" },
        { status: 400 }
      );
    }

    // Validate key format
    if (!/^SGTA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
      logActivation({
        timestamp: new Date().toISOString(),
        action: "activate",
        key,
        hardwareId,
        ip,
        success: false,
        error: "INVALID_KEY_FORMAT",
      });
      return NextResponse.json(
        { error: "INVALID_KEY" },
        { status: 400 }
      );
    }

    // Validate hardware ID format (should be sha256 hash)
    if (!/^[a-f0-9]{64}$/.test(hardwareId)) {
      return NextResponse.json(
        { error: "INVALID_HARDWARE_ID" },
        { status: 400 }
      );
    }

    // Check if license exists and is valid
    const license = getLicense(key);
    if (!license) {
      logActivation({
        timestamp: new Date().toISOString(),
        action: "activate",
        key,
        hardwareId,
        ip,
        success: false,
        error: "INVALID_KEY",
      });
      return NextResponse.json(
        { error: "INVALID_KEY" },
        { status: 404 }
      );
    }

    const licenseSoftware = license.software || "football-scoring";
    if (software && software !== licenseSoftware) {
      return NextResponse.json(
        { error: "SOFTWARE_MISMATCH" },
        { status: 403 }
      );
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "LICENSE_EXPIRED" },
        { status: 403 }
      );
    }

    // Attempt activation
    const result = addActivation(key, hardwareId);

    // Log the attempt
    logActivation({
      timestamp: new Date().toISOString(),
      action: "activate",
      key,
      hardwareId,
      ip,
      success: result.success,
      error: result.error,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        key,
        hardwareId,
        plan: license.plan,
        activatedAt: new Date().toISOString(),
      },
      JWT_SECRET,
      { expiresIn: "90d" } // Token valid for 90 days
    );

    return NextResponse.json({
      success: true,
      message: "License activated successfully",
      token,
      plan: license.plan,
      customerName: license.customerName || null,
      expiresAt: license.expiresAt || null,
      software: licenseSoftware,
      activationsUsed: license.activations.length,
      activationsMax: license.maxActivations,
    });
  } catch (error) {
    console.error("Activation error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
