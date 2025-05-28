// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Mock stylesheets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
  },
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
