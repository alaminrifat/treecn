import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/tree-view",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
