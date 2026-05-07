import { NextRequest, NextResponse } from "next/server";
import { removeActivation, logActivation } from "@/lib/license-db";

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Parse request body
    const body = await request.json();
    const { key, hardwareId } = body;

    // Validate input
    if (!key || !hardwareId) {
      return NextResponse.json(
        { error: "MISSING_PARAMETERS" },
        { status: 400 }
      );
    }

    // Validate key format
    if (!/^SGTA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
      return NextResponse.json(
        { error: "INVALID_KEY" },
        { status: 400 }
      );
    }

    // Validate hardware ID format
    if (!/^[a-f0-9]{64}$/.test(hardwareId)) {
      return NextResponse.json(
        { error: "INVALID_HARDWARE_ID" },
        { status: 400 }
      );
    }

    // Attempt deactivation
    const result = removeActivation(key, hardwareId);

    // Log the attempt
    logActivation({
      timestamp: new Date().toISOString(),
      action: "deactivate",
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

    return NextResponse.json({
      success: true,
      message: "License deactivated successfully",
    });
  } catch (error) {
    console.error("Deactivation error:", error);
    return NextResponse.json(
      { error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
