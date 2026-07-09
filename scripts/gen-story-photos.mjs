import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const dir = 'public/images/story';
const files = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

const manifest = [];
for (const f of files) {
  const src = `${dir}/${f}`;
  const base = f.replace(/\.(jpe?g|png)$/i, '');
  const out = `${dir}/${base}.webp`;
  const info = await sharp(src)
    .rotate()
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  const orient = info.width >= info.height ? 'landscape' : 'portrait';
  manifest.push({ src: `/images/story/${base}.webp`, w: info.width, h: info.height, orient });
  console.log(`${base}.webp ${info.width}x${info.height} ${orient} ${Math.round(info.size / 1024)}KB`);
}
console.log('\nCOUNT', manifest.length);
console.log(JSON.stringify(manifest.map((m) => ({ src: m.src, orient: m.orient })), null, 0));
