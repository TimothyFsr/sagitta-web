import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getLicense, updateLastValidated, logActivation } from "@/lib/license-db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

interface TokenPayload {
  key: string;
  hardwareId: string;
  plan: string;
  activatedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Parse request body
    const body = await request.json();
    const { token, key, hardwareId } = body;

    let licenseKey: string;
    let hwId: string;

    // Support both token-based and key+hardwareId validation
    if (token) {
      // JWT token validation (original method)
      try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        licenseKey = payload.key;
        hwId = payload.hardwareId;
      } catch (error) {
        return NextResponse.json(
          { success: false, isActive: false, message: "Invalid or expired token" },
          { status: 401 }
        );
      }
    } else if (key && hardwareId) {
      // Direct key+hardwareId validation (for Swift app)
      licenseKey = key;
      hwId = hardwareId;
    } else {
      return NextResponse.json(
        { success: false, message: "Missing token or key+hardwareId" },
        { status: 400 }
      );
    }

    // Check if license still exists and is valid
    const license = getLicense(licenseKey);
    if (!license) {
      logActivation({
        timestamp: new Date().toISOString(),
        action: "validate",
        key: licenseKey,
        hardwareId: hwId,
        ip,
        success: false,
        error: "LICENSE_NOT_FOUND",
      });
      return NextResponse.json(
        { success: false, isActive: false, message: "License not found" },
        { status: 404 }
      );
    }

    if (license.revoked) {
      logActivation({
        timestamp: new Date().toISOString(),
        action: "validate",
        key: licenseKey,
        hardwareId: hwId,
        ip,
        success: false,
        error: "KEY_REVOKED",
      });
      return NextResponse.json(
        { success: false, isActive: false, message: "License has been revoked" },
        { status: 403 }
      );
    }

    // Check if this hardware ID is still activated
    const isActivated = license.activations.some(
      (a) => a.hardwareId === hwId
    );

    if (!isActivated) {
      logActivation({
        timestamp: new Date().toISOString(),
        action: "validate",
        key: licenseKey,
        hardwareId: hwId,
        ip,
        success: false,
        error: "NOT_ACTIVATED",
      });
      return NextResponse.json(
        { success: false, isActive: false, message: "License not activated on this device" },
        { status: 403 }
      );
    }

    // Update last validated timestamp
    updateLastValidated(licenseKey, hwId);

    // Log successful validation
    logActivation({
      timestamp: new Date().toISOString(),
      action: "validate",
      key: licenseKey,
      hardwareId: hwId,
      ip,
      success: true,
    });

    return NextResponse.json({
      success: true,
      isActive: true,
      message: "License is valid",
      plan: license.plan,
      activationsUsed: license.activations.length,
      activationsMax: license.maxActivations,
    });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
