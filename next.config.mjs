/** @type {import('next').NextConfig} */

const nextConfig = {
  // Important to get rid off client cache in Nextjs 14
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
