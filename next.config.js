/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ggbacgzwgxmqxkbwrkyp.supabase.co',
      },
    ],
  },
};

export default nextConfig;
