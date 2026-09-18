/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // The fonts are content-hashed by name and never change in place, so they can
  // be cached hard. Everything else Next fingerprints itself.
  async headers() {
    return [
      {
        source: '/assets/fonts/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
