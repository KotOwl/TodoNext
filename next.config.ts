import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@heroui/react"],
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
};

export default nextConfig;
