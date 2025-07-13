/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Your backend port
        pathname: '/api/uploads/**', // Path to your uploaded images
      },
      // Add other domains if needed for production deployment
    ],
  },
};

// Change this line:
// module.exports = nextConfig;
// To this:
export default nextConfig;
