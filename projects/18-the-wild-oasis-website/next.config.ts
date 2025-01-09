import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rfudxnqghrcgihjwkaaa.supabase.co",
        pathname: "/storage/v1/object/public/cabins/*",
      },
    ],
  },
};

export default nextConfig;
