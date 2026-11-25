import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  async headers() { return [{source:"/api/:path*",headers:[{key:"X-Robots-Tag",value:"noindex, nofollow"}]}]; },
  async redirects() { return [{ source: "/Home", destination: "/", permanent: true }]; },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
