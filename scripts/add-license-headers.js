#!/usr/bin/env node

/**
 * Script to add MIT license headers to all source files
 * Usage: node scripts/add-license-headers.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LICENSE_HEADER = `/**
 * AI Image Enhancement - Webflow Designer Extension
 * 
 * Copyright (c) 2024 AI Image Enhancement - Webflow Designer Extension
 * Licensed under the MIT License
 * 
 * A powerful Webflow Designer Extension that brings AI-powered image 
 * enhancement and generation capabilities directly into your design workflow.
 */

`;

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return [".ts", ".tsx", ".js", ".jsx"].includes(ext);
}

function hasLicenseHeader(content) {
  return content.includes("Licensed under the MIT License");
}

function addLicenseHeader(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (hasLicenseHeader(content)) {
    console.log(`⏭️  Skipping ${filePath} (already has license header)`);
    return;
  }

  const newContent = LICENSE_HEADER + content;
  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`✅ Added license header to ${filePath}`);
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and build directories
      if (!["node_modules", "dist", "build", ".git"].includes(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      addLicenseHeader(fullPath);
    }
  }
}

// Start processing from src directory
const srcPath = path.join(__dirname, "..", "src");
console.log("🚀 Adding MIT license headers to source files...\n");

if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log("\n✨ License header processing complete!");
} else {
  console.error("❌ src directory not found!");
  process.exit(1);
}
