const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // *.gql files are compiled by graphql-tag/loader in webpack; Jest has no such
  // loader, so map them to a stub (the Apollo client is mocked in tests anyway).
  moduleNameMapper: {
    '\\.(gql|graphql)$': '<rootDir>/__mocks__/gqlMock.js',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
