/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure MDX
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Optional: If deploying to GitHub Pages with custom repo (uncomment and adjust)
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
}

module.exports = nextConfig
