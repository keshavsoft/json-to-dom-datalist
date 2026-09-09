#!/usr/bin/env node

import { readdirSync, existsSync, cpSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const srcDir = resolve(packageRoot, "src");

// 1. Parse CLI Arguments
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
    console.log(`
json-to-dom-datalist CLI - Config-Driven HTML5 <datalist> Renderer

Usage:
  npx json-to-dom-datalist [destination-directory] [options]

Arguments:
  destination-directory   Folder to copy the latest datalist engine to (default: ./json-to-dom-datalist)

Options:
  -v, --version           Display package and engine version
  -h, --help              Show this help message
  --version-target=<ver>  Specify an explicit version to copy (e.g. --version-target=v2)

Examples:
  npx json-to-dom-datalist
  npx json-to-dom-datalist ./src/lib/json-to-dom-datalist
  npx json-to-dom-datalist ./components/datalist --version-target=v2
`);
    process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
    console.log("json-to-dom-datalist CLI v1.2.2");
    process.exit(0);
}

// 2. Discover Versions in src/
if (!existsSync(srcDir)) {
    console.error("❌ Error: Could not locate 'src' directory in json-to-dom-datalist package.");
    process.exit(1);
}

const versionFolders = readdirSync(srcDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^v\d+$/.test(entry.name))
    .map(entry => ({ name: entry.name, n: Number(entry.name.slice(1)) }))
    .sort((a, b) => b.n - a.n);

if (versionFolders.length === 0) {
    console.error("❌ Error: No version folders (v1, v2, ... vN) found in src/.");
    process.exit(1);
}

// 3. Determine Target Version (highest version by default)
const explicitVersionArg = args.find(arg => arg.startsWith("--version-target="));
let selectedVersion = versionFolders[0].name;

if (explicitVersionArg) {
    const targetVer = explicitVersionArg.split("=")[1]?.trim();
    if (versionFolders.some(v => v.name === targetVer)) {
        selectedVersion = targetVer;
    } else {
        console.error(`❌ Error: Requested version '${targetVer}' not found in src/. Available: ${versionFolders.map(v => v.name).join(", ")}`);
        process.exit(1);
    }
}

// 4. Determine Destination Directory
const customDest = args.find(arg => !arg.startsWith("-"));
const destinationPath = resolve(process.cwd(), customDest || "./json-to-dom-datalist");

console.log(`\n⚡ json-to-dom-datalist CLI`);
console.log(`📦 Discovered highest version: ${selectedVersion}`);
console.log(`📂 Copying engine to: ${destinationPath} ...`);

try {
    const sourceVersionDir = resolve(srcDir, selectedVersion);
    mkdirSync(destinationPath, { recursive: true });

    // Copy the engine version directory
    cpSync(sourceVersionDir, destinationPath, { recursive: true });

    console.log(`✅ Successfully copied ${selectedVersion} to ${destinationPath}`);
    console.log(`\n🚀 Getting Started:`);
    console.log(`   import { DataList } from "${customDest || "./json-to-dom-datalist"}/index.js";`);
    console.log(`   const dl = new DataList({ columns, config, data });`);
    console.log(`   await dl.render();\n`);
} catch (error) {
    console.error(`❌ Failed to copy version:`, error.message);
    process.exit(1);
}
