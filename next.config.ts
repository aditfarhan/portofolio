import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    // Reduce bundle size
    optimizePackageImports: ["@/components", "@/lib", "@/hooks"],
  },
  // Mobile performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Reduce JavaScript bundle
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}",
    },
  },
};

export default nextConfig;
