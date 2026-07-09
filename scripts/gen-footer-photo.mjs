import sharp from 'sharp';

const src = 'public/PMN07622.JPG';
const out = 'public/images/footer.webp';

const meta = await sharp(src).rotate().metadata();
console.log('source (after auto-orient):', meta.width + 'x' + meta.height);

// Resize down for web (keep aspect), bake EXIF orientation, encode webp.
const info = await sharp(src)
  .rotate()
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(out);

console.log('wrote', out, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
