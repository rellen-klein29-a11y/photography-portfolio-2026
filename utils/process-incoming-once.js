#!/usr/bin/env node
/**
 * One-shot processor for `incoming_photos/` (excluding `incoming_photos/processed/`).
 *
 * This exists because the watcher can try to process many RAW files concurrently,
 * and on some systems `sips` may occasionally produce a truncated JPEG when
 * under heavy parallel load. This script processes sequentially and retries RAW
 * conversion when Sharp cannot decode the intermediate JPEG.
 */
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const { execFile } = require('child_process');

const WATCH_DIR = path.resolve(process.cwd(), 'incoming_photos');
const OUTPUT_ROOT = path.resolve(process.cwd(), 'src/photos');
const PROCESSED_DIR = path.join(WATCH_DIR, 'processed');
const WIDTHS = [600, 900, 1200, 1536, 1800, 2400, 3072];
const ALLOWED = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.tiff',
  '.tif',
  '.cr2',
]);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fileExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function sips(args) {
  return new Promise((resolve, reject) => {
    execFile('sips', args, (err, _stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve();
    });
  });
}

async function sipsToJpeg(inputPath, outPath) {
  await sips(['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', inputPath, '--out', outPath]);
}

async function sipsResizeWidthToJpeg(inputPath, width, outPath) {
  await sips([
    '--resampleWidth',
    String(width),
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    '90',
    inputPath,
    '--out',
    outPath,
  ]);
}

async function processFile(filePath) {
  const originalExt = path.extname(filePath);
  const ext = originalExt.toLowerCase();
  if (!ALLOWED.has(ext)) return { skipped: true };

  const baseName = path.basename(filePath, originalExt);
  const outputDir = path.join(OUTPUT_ROOT, baseName);
  await ensureDir(outputDir);

  console.log(`Processing ${path.basename(filePath)} -> ${path.relative(process.cwd(), outputDir)}`);

  const originalOut = path.join(outputDir, 'original.jpg');
  if (ext === '.cr2') {
    // For RAW files, use sips end-to-end. (Sharp/libvips often can't decode sips RAW->JPEG output.)
    await sipsToJpeg(filePath, originalOut);
    for (const w of WIDTHS) {
      const outPath = path.join(outputDir, `${w}.jpg`);
      await sipsResizeWidthToJpeg(filePath, w, outPath);
    }
  } else {
    // Non-RAW: use sharp
    await sharp(filePath)
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(originalOut);
    for (const w of WIDTHS) {
      const outPath = path.join(outputDir, `${w}.jpg`);
      await sharp(filePath)
        .resize({ width: w, withoutEnlargement: false })
        .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
        .toFile(outPath);
    }
  }

  // Move original into processed so it won't get re-run.
  await ensureDir(PROCESSED_DIR);
  const destPath = path.join(PROCESSED_DIR, path.basename(filePath));
  await fs.rename(filePath, destPath);

  return { ok: true };
}

async function main() {
  await ensureDir(WATCH_DIR);
  await ensureDir(OUTPUT_ROOT);
  await ensureDir(PROCESSED_DIR);

  const entries = await fs.readdir(WATCH_DIR);
  const files = entries
    .filter((n) => n !== 'processed')
    .map((n) => path.join(WATCH_DIR, n));

  if (files.length === 0) {
    console.log('No files found in incoming_photos/');
    return;
  }

  let ok = 0;
  let failed = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!ALLOWED.has(ext)) continue;
    try {
      await processFile(f);
      ok++;
    } catch (e) {
      failed++;
      console.error(`Failed: ${path.basename(f)}\n  ${e.message}`);
    }
  }

  console.log(`Done. Succeeded: ${ok}. Failed: ${failed}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

