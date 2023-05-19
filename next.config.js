const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? "/trentbaker.github.io/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
