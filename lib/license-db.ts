import fs from "fs";
import path from "path";

export interface License {
  plan: string;
  software?: string;
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

const REPO_DATA_DIR = path.join(process.cwd(), "data");
const DEFAULT_LICENSES_PATH = path.join(REPO_DATA_DIR, "licenses.json");
const DEFAULT_LOG_PATH = path.join(REPO_DATA_DIR, "activation-log.json");

// Configure persistent storage location via environment variables.
// Recommended in production:
//   SAGITTA_DATA_DIR=/absolute/persistent/path
// or:
//   LICENSES_PATH=/absolute/persistent/path/licenses.json
//   ACTIVATION_LOG_PATH=/absolute/persistent/path/activation-log.json
const DATA_DIR = process.env.SAGITTA_DATA_DIR?.trim() || REPO_DATA_DIR;
const LICENSES_PATH =
  process.env.LICENSES_PATH?.trim() || path.join(DATA_DIR, "licenses.json");
const LOG_PATH =
  process.env.ACTIVATION_LOG_PATH?.trim() ||
  path.join(DATA_DIR, "activation-log.json");

function ensureJSONFile(
  targetPath: string,
  defaultValue: object | unknown[]
): void {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, JSON.stringify(defaultValue, null, 2));
  }
}

function migrateFromRepoIfNeeded(): void {
  // If using an external path and file doesn't exist yet, copy existing repo data once.
  if (LICENSES_PATH !== DEFAULT_LICENSES_PATH && !fs.existsSync(LICENSES_PATH)) {
    if (fs.existsSync(DEFAULT_LICENSES_PATH)) {
      const raw = fs.readFileSync(DEFAULT_LICENSES_PATH, "utf-8");
      fs.mkdirSync(path.dirname(LICENSES_PATH), { recursive: true });
      fs.writeFileSync(LICENSES_PATH, raw);
      return;
    }
  }
  ensureJSONFile(LICENSES_PATH, {});
}

function ensureLogFile(): void {
  ensureJSONFile(LOG_PATH, []);
}

export function getLicenses(): LicenseDB {
  try {
    migrateFromRepoIfNeeded();
    const data = fs.readFileSync(LICENSES_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

export function saveLicenses(licenses: LicenseDB): void {
  migrateFromRepoIfNeeded();
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
    ensureLogFile();
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
