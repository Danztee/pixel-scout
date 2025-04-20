import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // Enable SWC compiler
    styledComponents: true,
  },
  experimental: {
    // Disable Babel completely
    forceSwcTransforms: true,
  },
};

export default nextConfig;
