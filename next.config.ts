import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint check during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ (Optional) Ignores TS errors during build
  },
};

export default nextConfig;
