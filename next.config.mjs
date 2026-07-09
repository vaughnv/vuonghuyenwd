/** @type {import('next').NextConfig} */
// Deploy (Vercel/SSR): default — enables per-guest metadata.
// Local static preview: set STATIC_EXPORT=1 to emit a static /out build.
const isStatic = process.env.STATIC_EXPORT === '1';

const nextConfig = isStatic
  ? { output: 'export', images: { unoptimized: true } }
  : { images: { unoptimized: true } };

export default nextConfig;
