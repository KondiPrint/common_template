/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media.wired.com/photos/',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.it',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
