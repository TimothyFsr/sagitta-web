#!/usr/bin/env node

/**
 * License Management Tool for Sagitta
 * 
 * Usage:
 *   node manage-licenses.js list
 *   node manage-licenses.js show SGTA-XXXX-XXXX-XXXX
 *   node manage-licenses.js revoke SGTA-XXXX-XXXX-XXXX
 *   node manage-licenses.js unrevoke SGTA-XXXX-XXXX-XXXX
 *   node manage-licenses.js deactivate SGTA-XXXX-XXXX-XXXX hardware-id
 *   node manage-licenses.js stats
 */

const fs = require('fs');
const path = require('path');

const licensesPath = path.join(__dirname, 'data', 'licenses.json');
const logsPath = path.join(__dirname, 'data', 'activation-log.json');

// Load licenses
function loadLicenses() {
  try {
    if (!fs.existsSync(licensesPath)) {
      console.error('❌ licenses.json not found');
      process.exit(1);
    }
    return JSON.parse(fs.readFileSync(licensesPath, 'utf-8'));
  } catch (error) {
    console.error(`❌ Failed to load licenses: ${error.message}`);
    process.exit(1);
  }
}

// Save licenses
function saveLicenses(licenses) {
  try {
    fs.writeFileSync(licensesPath, JSON.stringify(licenses, null, 2));
  } catch (error) {
    console.error(`❌ Failed to save licenses: ${error.message}`);
    process.exit(1);
  }
}

// Load logs
function loadLogs() {
  try {
    if (!fs.existsSync(logsPath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(logsPath, 'utf-8'));
  } catch (error) {
    return [];
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString();
}

// Format license for display
function displayLicense(key, license) {
  console.log(`\n${'─'.repeat(70)}`);
  console.log(`🔑 License Key: ${key}`);
  console.log(`${'─'.repeat(70)}`);
  console.log(`   Plan:         ${license.plan} (${license.maxActivations} max activations)`);
  console.log(`   Status:       ${license.revoked ? '❌ REVOKED' : '✅ Active'}`);
  console.log(`   Customer:     ${license.customerName || 'N/A'}`);
  console.log(`   Expires:      ${license.expiresAt ? formatDate(license.expiresAt) : '♾️  Lifetime'}`);
  console.log(`   Created:      ${formatDate(license.createdAt)}`);
  console.log(`   Activations:  ${license.activations.length} / ${license.maxActivations}`);
  
  if (license.activations.length > 0) {
    console.log('\n   Active Devices:');
    license.activations.forEach((activation, index) => {
      console.log(`   ${index + 1}. Hardware: ${activation.hardwareId.substring(0, 16)}...`);
      console.log(`      Activated:     ${formatDate(activation.activatedAt)}`);
      console.log(`      Last Checked:  ${formatDate(activation.lastValidated)}`);
    });
  }
  
  console.log(`${'─'.repeat(70)}\n`);
}

// Commands
const commands = {
  list: () => {
    const licenses = loadLicenses();
    const keys = Object.keys(licenses);
    
    if (keys.length === 0) {
      console.log('📭 No licenses found');
      return;
    }
    
    console.log(`\n📋 All Licenses (${keys.length} total):\n`);
    console.log('─'.repeat(90));
    console.log('Key                       Plan         Active  Status    Customer');
    console.log('─'.repeat(90));
    
    keys.forEach(key => {
      const license = licenses[key];
      const status = license.revoked ? '❌ Revoked' : '✅ Active';
      const activations = `${license.activations.length}/${license.maxActivations}`;
      const customer = (license.customerName || 'N/A').substring(0, 20);
      const plan = license.plan.padEnd(12);
      
      console.log(`${key}  ${plan}  ${activations.padEnd(6)}  ${status.padEnd(10)}  ${customer}`);
    });
    
    console.log('─'.repeat(90) + '\n');
  },
  
  show: (key) => {
    if (!key) {
      console.error('❌ Please provide a license key');
      console.error('   Usage: node manage-licenses.js show SGTA-XXXX-XXXX-XXXX');
      process.exit(1);
    }
    
    const licenses = loadLicenses();
    const license = licenses[key];
    
    if (!license) {
      console.error(`❌ License not found: ${key}`);
      process.exit(1);
    }
    
    displayLicense(key, license);
  },
  
  revoke: (key) => {
    if (!key) {
      console.error('❌ Please provide a license key');
      process.exit(1);
    }
    
    const licenses = loadLicenses();
    
    if (!licenses[key]) {
      console.error(`❌ License not found: ${key}`);
      process.exit(1);
    }
    
    if (licenses[key].revoked) {
      console.log(`⚠️  License already revoked: ${key}`);
      return;
    }
    
    licenses[key].revoked = true;
    saveLicenses(licenses);
    
    console.log(`✅ License revoked: ${key}`);
    console.log('   The app will detect this on next validation (within 7 days)');
  },
  
  unrevoke: (key) => {
    if (!key) {
      console.error('❌ Please provide a license key');
      process.exit(1);
    }
    
    const licenses = loadLicenses();
    
    if (!licenses[key]) {
      console.error(`❌ License not found: ${key}`);
      process.exit(1);
    }
    
    if (!licenses[key].revoked) {
      console.log(`⚠️  License is not revoked: ${key}`);
      return;
    }
    
    licenses[key].revoked = false;
    saveLicenses(licenses);
    
    console.log(`✅ License un-revoked: ${key}`);
  },
  
  deactivate: (key, hardwareId) => {
    if (!key || !hardwareId) {
      console.error('❌ Please provide both license key and hardware ID');
      console.error('   Usage: node manage-licenses.js deactivate SGTA-XXXX-XXXX-XXXX hardware-id');
      process.exit(1);
    }
    
    const licenses = loadLicenses();
    
    if (!licenses[key]) {
      console.error(`❌ License not found: ${key}`);
      process.exit(1);
    }
    
    const index = licenses[key].activations.findIndex(a => a.hardwareId === hardwareId);
    
    if (index === -1) {
      console.error(`❌ Hardware ID not found in activations`);
      console.log(`   Available hardware IDs:`);
      licenses[key].activations.forEach((a, i) => {
        console.log(`   ${i + 1}. ${a.hardwareId}`);
      });
      process.exit(1);
    }
    
    licenses[key].activations.splice(index, 1);
    saveLicenses(licenses);
    
    console.log(`✅ Deactivated hardware ID: ${hardwareId.substring(0, 16)}...`);
    console.log(`   Remaining activations: ${licenses[key].activations.length} / ${licenses[key].maxActivations}`);
  },
  
  stats: () => {
    const licenses = loadLicenses();
    const logs = loadLogs();
    const keys = Object.keys(licenses);
    
    // Calculate statistics
    const totalLicenses = keys.length;
    const activeLicenses = keys.filter(k => !licenses[k].revoked).length;
    const revokedLicenses = totalLicenses - activeLicenses;
    
    const planCounts = {};
    keys.forEach(key => {
      const plan = licenses[key].plan;
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    
    const totalActivations = keys.reduce((sum, key) => 
      sum + licenses[key].activations.length, 0
    );
    
    const totalCapacity = keys.reduce((sum, key) => 
      sum + licenses[key].maxActivations, 0
    );
    
    // Recent activity (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = logs.filter(log => new Date(log.timestamp) > oneDayAgo);
    const recentSuccess = recentLogs.filter(log => log.success).length;
    const recentFailed = recentLogs.filter(log => !log.success).length;
    
    console.log('\n📊 License Statistics\n');
    console.log('─'.repeat(50));
    console.log(`Total Licenses:      ${totalLicenses}`);
    console.log(`  ├─ Active:         ${activeLicenses}`);
    console.log(`  └─ Revoked:        ${revokedLicenses}`);
    console.log('');
    console.log('Plans:');
    Object.keys(planCounts).forEach(plan => {
      console.log(`  ├─ ${plan.padEnd(15)} ${planCounts[plan]}`);
    });
    console.log('');
    console.log(`Activations:         ${totalActivations} / ${totalCapacity}`);
    console.log(`Capacity Used:       ${Math.round(totalActivations / totalCapacity * 100)}%`);
    console.log('');
    console.log('Last 24 Hours:');
    console.log(`  ├─ Successful:     ${recentSuccess}`);
    console.log(`  └─ Failed:         ${recentFailed}`);
    console.log('─'.repeat(50) + '\n');
  },
  
  help: () => {
    console.log(`
📖 Sagitta License Management Tool

Commands:
  list                              List all licenses
  show <key>                        Show detailed license info
  revoke <key>                      Revoke a license
  unrevoke <key>                    Un-revoke a license
  deactivate <key> <hardware-id>    Remove a device activation
  stats                             Show license statistics
  help                              Show this help

Examples:
  node manage-licenses.js list
  node manage-licenses.js show SGTA-2025-PROD-0001
  node manage-licenses.js revoke SGTA-2025-PROD-0001
  node manage-licenses.js deactivate SGTA-2025-PROD-0001 abc123...
  node manage-licenses.js stats
`);
  }
};

// Main
const command = process.argv[2];
const args = process.argv.slice(3);

if (!command || !commands[command]) {
  commands.help();
  if (command) {
    console.error(`\n❌ Unknown command: ${command}\n`);
  }
  process.exit(command ? 1 : 0);
}

commands[command](...args);
