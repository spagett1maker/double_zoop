import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Vercel 배포 시에도 ESLint 무시
  },
};

export default nextConfig;
