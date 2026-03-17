import type { NextConfig } from "next";

const repo = "daiyum";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // GitHub Pages needs a static site
  output: "export",
  trailingSlash: true,

  // When hosted at https://Lucas-Chu-0209.github.io/daiyum/
  basePath: isGitHubPages ? `/${repo}` : undefined,
  assetPrefix: isGitHubPages ? `/${repo}/` : undefined,

  // GitHub Pages does not provide the Next.js Image Optimization API
  images: {
    unoptimized: true,
  },
};

export default nextConfig;