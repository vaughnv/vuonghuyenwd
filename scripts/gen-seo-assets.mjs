import sharp from 'sharp';

const src = 'public/images/album/PMN08872.webp';

// Favicon (square, auto-focus on the couple's faces)
await sharp(src).resize(256, 256, { fit: 'cover', position: 'attention' }).png().toFile('public/images/favicon.png');
await sharp(src).resize(180, 180, { fit: 'cover', position: 'attention' }).png().toFile('public/images/apple-touch-icon.png');

// Open Graph / social share image (1.91:1)
await sharp(src).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toFile('public/images/og-image.jpg');

console.log('SEO assets generated: favicon.png (256), apple-touch-icon.png (180), og-image.jpg (1200x630)');
