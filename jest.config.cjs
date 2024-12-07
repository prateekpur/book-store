// eslint-disable-next-line 
module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript support
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Set up custom Jest matchers
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/app/(.*)$': '<rootDir>/app/$1', // maps @src to src
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore these directories
};
