/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add your hostname(s) to this array
  },
  experimental: {
    swcMinify: true,
  },
};

module.exports = nextConfig;
