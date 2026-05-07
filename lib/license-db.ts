import fs from "fs";
import path from "path";

export interface License {
  plan: string;
  maxActivations: number;
  customerName?: string;
  expiresAt?: string;
  activations: Array<{
    hardwareId: string;
    activatedAt: string;
    lastValidated?: string;
  }>;
  createdAt: string;
  revoked: boolean;
}

export interface LicenseDB {
  [key: string]: License;
}

const LICENSES_PATH = path.join(process.cwd(), "data", "licenses.json");
const LOG_PATH = path.join(process.cwd(), "data", "activation-log.json");

export function getLicenses(): LicenseDB {
  try {
    const data = fs.readFileSync(LICENSES_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

export function saveLicenses(licenses: LicenseDB): void {
  fs.writeFileSync(LICENSES_PATH, JSON.stringify(licenses, null, 2));
}

export function getLicense(key: string): License | null {
  const licenses = getLicenses();
  return licenses[key] || null;
}

export function addActivation(
  key: string,
  hardwareId: string
): { success: boolean; error?: string } {
  const licenses = getLicenses();
  const license = licenses[key];

  if (!license) {
    return { success: false, error: "INVALID_KEY" };
  }

  if (license.revoked) {
    return { success: false, error: "KEY_REVOKED" };
  }

  // Check if already activated with this hardware ID
  const existingActivation = license.activations.find(
    (a) => a.hardwareId === hardwareId
  );
  if (existingActivation) {
    return { success: false, error: "ALREADY_ACTIVATED" };
  }

  // Check activation limit
  if (license.activations.length >= license.maxActivations) {
    return { success: false, error: "MAX_ACTIVATIONS_REACHED" };
  }

  // Add activation
  license.activations.push({
    hardwareId,
    activatedAt: new Date().toISOString(),
  });

  saveLicenses(licenses);
  return { success: true };
}

export function removeActivation(
  key: string,
  hardwareId: string
): { success: boolean; error?: string } {
  const licenses = getLicenses();
  const license = licenses[key];

  if (!license) {
    return { success: false, error: "INVALID_KEY" };
  }

  const index = license.activations.findIndex(
    (a) => a.hardwareId === hardwareId
  );

  if (index === -1) {
    return { success: false, error: "NOT_ACTIVATED" };
  }

  license.activations.splice(index, 1);
  saveLicenses(licenses);
  return { success: true };
}

export function updateLastValidated(key: string, hardwareId: string): void {
  const licenses = getLicenses();
  const license = licenses[key];

  if (!license) return;

  const activation = license.activations.find(
    (a) => a.hardwareId === hardwareId
  );

  if (activation) {
    activation.lastValidated = new Date().toISOString();
    saveLicenses(licenses);
  }
}

export interface LogEntry {
  timestamp: string;
  action: "activate" | "validate" | "deactivate";
  key: string;
  hardwareId: string;
  ip: string;
  success: boolean;
  error?: string;
}

export function logActivation(entry: LogEntry): void {
  try {
    let logs: LogEntry[] = [];
    try {
      const data = fs.readFileSync(LOG_PATH, "utf-8");
      logs = JSON.parse(data);
    } catch {
      // File doesn't exist or is invalid
    }

    logs.push(entry);

    // Keep only last 10000 entries
    if (logs.length > 10000) {
      logs = logs.slice(-10000);
    }

    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}
