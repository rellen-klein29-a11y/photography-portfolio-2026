#!/usr/bin/env node
const chokidar = require('chokidar');
const sharp = require('sharp');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const fs = require('fs').promises;

const WATCH_DIR = path.resolve(process.cwd(), 'incoming_photos');
const OUTPUT_ROOT = path.resolve(process.cwd(), 'src/photos');
const WIDTHS = [600, 900, 1200, 1536, 1800, 2400, 3072];
const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.cr2']);

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function convertRawToJpeg(inputPath, baseName) {
  const tempName = `${baseName}-${Date.now()}.jpg`;
  const tempPath = path.join(os.tmpdir(), tempName);
  return new Promise((resolve, reject) => {
    execFile('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', inputPath, '--out', tempPath], (err, stdout, stderr) => {
      if (err) {
        return reject(new Error(`sips conversion failed: ${stderr || err.message}`));
      }
      resolve(tempPath);
    });
  });
}

async function waitForStable(filePath, attempts = 5, delay = 300) {
  let lastSize = -1;
  for (let i = 0; i < attempts; i++) {
    try {
      const stat = await fs.stat(filePath);
      if (stat.size === lastSize) return true;
      lastSize = stat.size;
    } catch (e) {
      return false;
    }
    await new Promise((r) => setTimeout(r, delay));
  }
  return true;
}

async function processFile(filePath) {
  const originalExt = path.extname(filePath);
  const ext = originalExt.toLowerCase();
  if (!ALLOWED.has(ext)) return;

  const stable = await waitForStable(filePath);
  if (!stable) {
    console.log('File not stable, skipping:', filePath);
    return;
  }

  const baseName = path.basename(filePath, originalExt);
  const outputDir = path.join(OUTPUT_ROOT, baseName);
  await ensureDir(outputDir);

  console.log(`Processing ${path.basename(filePath)} -> ${outputDir}`);

  let sourcePath = filePath;
  let tempJpeg;
  if (ext === '.cr2') {
    tempJpeg = await convertRawToJpeg(filePath, baseName);
    sourcePath = tempJpeg;
  }

  // create a JPEG original copy
  const originalOut = path.join(outputDir, `original.jpg`);
  await sharp(sourcePath).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(originalOut);
  const origMeta = await sharp(originalOut).metadata();
  console.log(`  created ${path.relative(process.cwd(), originalOut)} (${origMeta.width}x${origMeta.height})`);

  const tasks = WIDTHS.map(async (w) => {
    const outPath = path.join(outputDir, `${w}.jpg`);
    await sharp(sourcePath)
      .resize({ width: w, withoutEnlargement: false })
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(outPath);
    const m = await sharp(outPath).metadata();
    console.log(`  created ${path.relative(process.cwd(), outPath)} (${m.width}x${m.height})`);
  });

  await Promise.all(tasks);

  if (tempJpeg) {
    await fs.unlink(tempJpeg).catch(() => {});
  }

  // move original to processed folder so it's not reprocessed
  const processedDir = path.join(WATCH_DIR, 'processed');
  await ensureDir(processedDir);
  const destPath = path.join(processedDir, path.basename(filePath));
  try {
    await fs.rename(filePath, destPath);
  } catch (e) {
    console.warn('Could not move original file to processed folder:', e.message);
  }
}

async function main() {
  await ensureDir(WATCH_DIR);
  await ensureDir(OUTPUT_ROOT);

  console.log('Watching for incoming images in', WATCH_DIR);

  const watcher = chokidar.watch(WATCH_DIR, {
    persistent: true,
    ignoreInitial: false,
    depth: 0,
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 }
  });

  watcher.on('add', (filePath) => {
    // ignore files in processed subfolder
    if (filePath.includes(path.join('incoming_photos', 'processed'))) return;
    processFile(filePath).catch((err) => console.error('Processing error:', err.message));
  });

  watcher.on('error', (err) => console.error('Watcher error:', err));
}

main().catch((err) => { console.error(err); process.exit(1); });
