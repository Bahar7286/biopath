import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  trailingSlash: false,
  experimental: {
    turbo: {
      resolveAlias: {
        // Server tarafında bu paketleri boş modülle değiştir
        'fflate/lib/node.cjs': './src/lib/empty.ts',
        'fflate': './src/lib/empty.ts',
      },
    },
  },
};

export default nextConfig;
