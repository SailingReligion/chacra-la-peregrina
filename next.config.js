const path = require('path');

// basePath / assetPrefix para GitHub Pages.
// - En GitHub Pages SIN dominio propio el sitio vive en una subcarpeta:
//   https://sailingreligion.github.io/chacra-la-peregrina  -> basePath = '/chacra-la-peregrina'
// - Cuando conecten el dominio propio (Squarespace), el sitio vive en la raíz
//   y esta variable debe quedar vacía. Se controla con NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // 'export' genera el sitio estático (carpeta out/) para GitHub Pages.
  // En la preview de Abacus esta variable no se setea, así sigue funcionando normal.
  output: process.env.NEXT_OUTPUT_MODE,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = 'static/chunks/[name]-[contenthash:8].js';
      config.output.chunkFilename = 'static/chunks/[contenthash:16].js';
    }
    return config;
  },
};

module.exports = nextConfig;
