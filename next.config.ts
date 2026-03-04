/**
 * Next.js Configuration with Performance Optimizations
 * 
 * Enhanced configuration for optimal performance, SEO, and bundle size.
 * Includes bundle analyzer setup and advanced optimizations.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow external images from logo services
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    // Reduce bundle size by optimizing package imports
    optimizePackageImports: ["@/components", "@/lib", "@/hooks"],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },


  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.{jpg,jpeg,png,gif,webp,svg,ico}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Explicit immutable cache for icons sprite (not matched by glob above)
        source: "/icons.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Performance budgets
      config.performance = {
        hints: "warning",
        maxAssetSize: 300000, // 300kb
        maxEntrypointSize: 500000, // 500kb
      };
    }

    return config;
  },

  // Turbopack configuration (Next.js 16+)
  // Empty config silences the warning about webpack config
  turbopack: {},
};

export default nextConfig;
