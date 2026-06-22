const { defineConfig } = require('cypress')
const { loadEnvConfig } = require('@next/env')

// Load .env the same way Next.js does so specs can reach NEXT_PUBLIC_* vars.
const { combinedEnv } = loadEnvConfig(process.cwd())

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT = combinedEnv.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
      return config
    },
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
})
