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
    // Custom loader resizes via Hygraph's CDN (graphassets.com), so Vercel's
    // Image Optimization is never invoked — zero transformation-quota usage.
    // Local/static assets are passed through untouched by the loader.
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
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
