module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    testPathIgnorePatterns: ['dist/', 'node_modules/'],
    collectCoverage: true,
  };
  