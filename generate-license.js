#!/usr/bin/env node

/**
 * License Key Generator for Sagitta
 * 
 * Usage:
 *   node generate-license.js
 *   node generate-license.js --plan pro --customer "John Doe" --expires 2026-12-31
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag, defaultValue) => {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const hasFlag = (flag) => args.includes(flag);

// Configuration
const plan = getArg('--plan', 'single');
const customerName = getArg('--customer', null);
const expiresDate = getArg('--expires', null);
const count = parseInt(getArg('--count', '1'));
const dryRun = hasFlag('--dry-run');

// Validate plan
const PLANS = {
  single: 2,
  pro: 5,
  federation: 99
};

if (!PLANS[plan]) {
  console.error(`❌ Invalid plan: ${plan}`);
  console.error(`   Valid plans: ${Object.keys(PLANS).join(', ')}`);
  process.exit(1);
}

// Validate expiration date if provided
if (expiresDate) {
  const date = new Date(expiresDate);
  if (isNaN(date.getTime())) {
    console.error(`❌ Invalid date format: ${expiresDate}`);
    console.error(`   Use format: YYYY-MM-DD`);
    process.exit(1);
  }
}

// Generate license key
function generateKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'; // Exclude I, O for clarity
  const segment = () => {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars[crypto.randomInt(chars.length)];
    }
    return result;
  };
  
  return `SGTA-${segment()}-${segment()}-${segment()}`;
}

// Load existing licenses
const licensesPath = path.join(__dirname, 'data', 'licenses.json');
let licenses = {};

try {
  if (fs.existsSync(licensesPath)) {
    licenses = JSON.parse(fs.readFileSync(licensesPath, 'utf-8'));
  }
} catch (error) {
  console.error(`❌ Failed to read licenses.json: ${error.message}`);
  process.exit(1);
}

// Generate licenses
const newLicenses = [];

for (let i = 0; i < count; i++) {
  let key;
  let attempts = 0;
  
  // Ensure unique key
  do {
    key = generateKey();
    attempts++;
    if (attempts > 100) {
      console.error('❌ Failed to generate unique key after 100 attempts');
      process.exit(1);
    }
  } while (licenses[key]);
  
  // Create license object
  const license = {
    plan,
    maxActivations: PLANS[plan],
    activations: [],
    createdAt: new Date().toISOString(),
    revoked: false
  };
  
  // Add optional fields
  if (customerName) {
    license.customerName = customerName;
  }
  
  if (expiresDate) {
    const date = new Date(expiresDate);
    date.setHours(23, 59, 59, 999); // End of day
    license.expiresAt = date.toISOString();
  }
  
  // Add to collection
  licenses[key] = license;
  newLicenses.push({ key, license });
}

// Display results
console.log('\n✨ Generated License Keys:\n');
console.log('─'.repeat(70));

newLicenses.forEach(({ key, license }) => {
  console.log(`\n🔑 Key: ${key}`);
  console.log(`   Plan: ${license.plan} (${license.maxActivations} activations)`);
  if (license.customerName) {
    console.log(`   Customer: ${license.customerName}`);
  }
  if (license.expiresAt) {
    const date = new Date(license.expiresAt);
    console.log(`   Expires: ${date.toLocaleDateString()}`);
  } else {
    console.log(`   Type: Lifetime`);
  }
  console.log(`   Created: ${new Date(license.createdAt).toLocaleDateString()}`);
});

console.log('\n' + '─'.repeat(70));

// Save to file
if (!dryRun) {
  try {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(licensesPath, JSON.stringify(licenses, null, 2));
    console.log(`\n✅ Saved to: ${licensesPath}`);
    console.log(`   Total licenses: ${Object.keys(licenses).length}`);
  } catch (error) {
    console.error(`\n❌ Failed to save: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log(`\n⚠️  Dry run mode - not saved to file`);
}

console.log('\n📋 To use in JSON format:\n');
newLicenses.forEach(({ key, license }) => {
  console.log(`"${key}": ${JSON.stringify(license, null, 2)},`);
});

console.log('\n💡 Usage examples:');
console.log('   node generate-license.js --plan pro');
console.log('   node generate-license.js --plan single --customer "John Doe"');
console.log('   node generate-license.js --expires 2026-12-31 --count 5');
console.log('   node generate-license.js --dry-run\n');
