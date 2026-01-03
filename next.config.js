module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphcms.com',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

    return config;
  }
};
