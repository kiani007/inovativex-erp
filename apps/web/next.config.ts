import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@inovativex/db",
    "@inovativex/types",
    "@inovativex/validators",
    "@inovativex/ui",
    "@inovativex/utils",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
