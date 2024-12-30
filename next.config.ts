import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  async rewrites() {
    return [
      {
        source: '/naver-token/:path*',
        destination: 'https://nid.naver.com/:path*',
      },
      {
        source: '/naver-me/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ]
  },
}

export default nextConfig
