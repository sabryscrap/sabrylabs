#!/usr/bin/env node
// tests/e2e/runner.mjs
// Master E2E Test Suite Runner for Sabry Labs Production Website

import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const ROOT_DIR = path.resolve(import.meta.dirname, '../..');
const TESTS_DIR = path.join(ROOT_DIR, 'tests/e2e');

// Parse CLI arguments
const args = process.argv.slice(2);
const tierArg = args.find(a => a.startsWith('--tier='))?.split('=')[1];
const formatArg = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'spec';

// Map tiers to test files
const TIER_FILES = {
  1: path.join(TESTS_DIR, 'tier1-features.test.mjs'),
  2: path.join(TESTS_DIR, 'tier2-boundaries.test.mjs'),
  3: path.join(TESTS_DIR, 'tier3-combinations.test.mjs'),
  4: path.join(TESTS_DIR, 'tier4-scenarios.test.mjs')
};

let filesToRun = [];
if (tierArg && TIER_FILES[tierArg]) {
  filesToRun = [TIER_FILES[tierArg]];
} else {
  filesToRun = [
    TIER_FILES[1],
    TIER_FILES[2],
    TIER_FILES[3],
    TIER_FILES[4]
  ];
}

console.log('================================================================================');
console.log('       SABRY LABS PRODUCTION WEBSITE — OPAQUE-BOX E2E TEST SUITE        ');
console.log('================================================================================');
console.log(`[SYS] Node.js Runtime: ${process.version}`);
console.log(`[SYS] Workspace Root:  ${ROOT_DIR}`);
console.log(`[SYS] Test Tier Scope: ${tierArg ? `Tier ${tierArg}` : 'All Tiers (1 - 4)'}`);
console.log(`[SYS] Test Files:      ${filesToRun.map(f => path.basename(f)).join(', ')}`);
console.log('--------------------------------------------------------------------------------\n');

const reporterFlag = formatArg === 'tap' ? '--test-reporter=tap' : '--test-reporter=spec';

const child = spawn(process.execPath, ['--test', reporterFlag, ...filesToRun], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  console.log('\n================================================================================');
  console.log('                           E2E TEST RUN COMPLETE                                ');
  console.log('================================================================================');
  if (code === 0) {
    console.log('\x1b[32m✔ STATUS: 100% E2E TEST SUITE PASSED (ALL VERIFIED)\x1b[0m');
    console.log('================================================================================\n');
    process.exit(0);
  } else {
    console.log(`\x1b[31m✖ STATUS: TEST SUITE FAILED (Exit Code: ${code})\x1b[0m`);
    console.log('================================================================================\n');
    process.exit(code || 1);
  }
});
