/** @type {import('next').NextConfig} */

// GitHub Pages serves a project repo under /<repo-name>/, not root. Set
// NEXT_PUBLIC_BASE_PATH to that sub-path for the Pages build so every asset
// (/_next/..., /images/...) resolves. Leave it unset for a root-served build
// (e.g. local preview or any host that serves at /).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Static HTML export — emits a self-contained ./out folder (no Node runtime
  // needed at serve time), suitable for GitHub Pages / any static host.
  output: "export",
  // Required for `output: export` (Next's image optimiser needs a server);
  // the site uses plain <img> tags, so this is a no-op for behaviour.
  images: {
    unoptimized: true,
  },
  // Emit per-page folders with index.html (…/path/ -> …/path/index.html) so a
  // static file server resolves routes without special rewrites.
  trailingSlash: true,
  // Serve under the GitHub Pages repo sub-path when provided.
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
