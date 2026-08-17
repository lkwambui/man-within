/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: process.env.NODE_ENV === "production",
  basePath: process.env.NODE_ENV === "production" ? "/man-within" : undefined,
  images: {
    unoptimized: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;