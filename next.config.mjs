/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: ''
      }
    ]
  },

  reactStrictMode: false,
  swcMinify: true,

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true
          }
        }
      ]
    });

    return config;
  }
};

export default nextConfig;
