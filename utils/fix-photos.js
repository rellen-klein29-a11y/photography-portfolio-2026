#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(process.cwd(), 'src/photos');
const INCOMING_PROCESSED = path.resolve(process.cwd(), 'incoming_photos/processed');
const WIDTHS = [600, 900, 1200, 1536, 1800, 2400, 3072];

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch(e){}
}

async function findOriginal(baseName) {
  // look in incoming_photos/processed for any file starting with baseName
  try {
    const items = await fs.readdir(INCOMING_PROCESSED);
    for (const it of items) {
      const bn = path.basename(it, path.extname(it));
      if (bn === baseName) return path.join(INCOMING_PROCESSED, it);
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function processFolder(folder) {
  const dirPath = path.join(ROOT, folder);
  const baseName = folder.replace(/\.[^/.]+$/, '');
  const outDir = path.join(ROOT, baseName);
  if (dirPath !== outDir) {
    await ensureDir(outDir);
  }

  // find best original
  let orig = await findOriginal(baseName);
  if (!orig) {
    // pick largest file inside folder
    try {
      const files = await fs.readdir(dirPath);
      let biggest = null;
      let biggestSize = 0;
      for (const f of files) {
        const p = path.join(dirPath, f);
        const stat = await fs.stat(p);
        if (stat.size > biggestSize) { biggestSize = stat.size; biggest = p; }
      }
      orig = biggest;
    } catch (e) {
      console.warn('No files found in', dirPath);
      return;
    }
  }

  if (!orig) { console.warn('No original found for', baseName); return; }

  console.log('Converting', baseName, 'using original', path.relative(process.cwd(), orig));

  // write original.jpg
  const originalOut = path.join(outDir, 'original.jpg');
  if (path.resolve(orig) !== path.resolve(originalOut)) {
    await sharp(orig).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(originalOut);
    const origMeta = await sharp(originalOut).metadata();
    console.log(`  created ${path.relative(process.cwd(), originalOut)} (${origMeta.width}x${origMeta.height})`);
  } else {
    const origMeta = await sharp(originalOut).metadata();
    console.log(`  using existing ${path.relative(process.cwd(), originalOut)} (${origMeta.width}x${origMeta.height})`);
  }

  // create requested sizes
  await Promise.all(WIDTHS.map(async (w) => {
    const outPath = path.join(outDir, `${w}.jpg`);
    await sharp(orig).resize({ width: w, withoutEnlargement: false }).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(outPath);
    const m = await sharp(outPath).metadata();
    console.log(`  created ${path.relative(process.cwd(), outPath)} (${m.width}x${m.height})`);
  }));

  // if folder name included extension, remove old folder after moving files
  if (dirPath !== outDir) {
    // attempt removing old files
    try {
      const oldFiles = await fs.readdir(dirPath);
      for (const f of oldFiles) {
        await fs.unlink(path.join(dirPath, f));
      }
      await fs.rmdir(dirPath);
    } catch (e) {}
  }
}

async function main() {
  await ensureDir(ROOT);
  const items = await fs.readdir(ROOT);
  for (const it of items) {
    const p = path.join(ROOT, it);
    const stat = await fs.stat(p);
    if (stat.isDirectory()) {
      await processFolder(it);
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
