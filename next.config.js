module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com'],
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
