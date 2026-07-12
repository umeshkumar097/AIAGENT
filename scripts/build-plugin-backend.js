#!/usr/bin/env node

/**
 * Build Plugin Backend - Compiles plugin TypeScript to JavaScript for production
 * 
 * In production, Node.js cannot import .ts files directly.
 * This script compiles each plugin's TypeScript entry point and dependencies to JavaScript.
 * 
 * Usage: node scripts/build-plugin-backend.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const pluginsDir = path.join(projectRoot, 'plugins');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║     Building Plugin Backend (TypeScript → JavaScript)      ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

if (!fs.existsSync(pluginsDir)) {
  console.log('No plugins directory found. Skipping.');
  process.exit(0);
}

const plugins = fs.readdirSync(pluginsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

if (plugins.length === 0) {
  console.log('No plugins found. Skipping.');
  process.exit(0);
}

console.log(`Found ${plugins.length} plugin(s): ${plugins.join(', ')}`);
console.log('');

let successCount = 0;
let errorCount = 0;

for (const pluginName of plugins) {
  const pluginPath = path.join(pluginsDir, pluginName);
  const manifestPath = path.join(pluginPath, 'plugin.json');
  
  if (!fs.existsSync(manifestPath)) {
    console.log(`⚠️  Skipping ${pluginName}: no plugin.json`);
    continue;
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    if (!manifest.entryPoint || !manifest.entryPoint.endsWith('.ts')) {
      console.log(`⚠️  Skipping ${pluginName}: entryPoint is not TypeScript`);
      continue;
    }
    
    console.log(`📦 Building ${manifest.displayName || pluginName}...`);
    
    const entryFile = path.join(pluginPath, manifest.entryPoint);
    const outFile = entryFile.replace(/\.ts$/, '.js');
    
    try {
      console.log(`   Entry file: ${manifest.entryPoint} → ${path.basename(outFile)}`);
      
      // Bundle using esbuild - resolves relative paths and aliases at build time
      execSync(`npx esbuild "${entryFile}" --bundle --outfile="${outFile}" --format=esm --platform=node --target=node18 --packages=external`, {
        cwd: projectRoot,
        stdio: 'pipe'
      });
      
      console.log(`   ✓ Bundled entryPoint successfully`);
      successCount++;
      console.log(`   ✅ ${manifest.displayName || pluginName} compiled`);
      console.log('');
      
    } catch (err) {
      console.error(`   ✗ Failed to bundle plugin: ${err.message}`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ Error building ${pluginName}:`, error.message);
    errorCount++;
  }
}

console.log('════════════════════════════════════════════════════════════');
console.log(`✅ Built ${successCount} plugin(s)`);
if (errorCount > 0) {
  console.log(`❌ ${errorCount} error(s)`);
}
console.log('');
