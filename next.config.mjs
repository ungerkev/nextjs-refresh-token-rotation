/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
