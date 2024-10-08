module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',  // Mantiene el soporte para TypeScript, JavaScript y HTML
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/**/*.module.ts'
  ],
  coverageReporters: ['html', 'lcov', 'text'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$', // Agrega esta línea para manejar archivos HTML como cadenas
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy', // Utiliza un proxy para manejar CSS/SCSS
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],  // Evita transformar archivos de node_modules que no sean .mjs
};
