/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globalSetup: '<rootDir>/src/jest/global-setup.ts',
  globalTeardown: '<rootDir>/src/jest/global-teardown.ts',
  testEnvironment: '<rootDir>/src/jest/cudos-environment.ts',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.ts'],
  testTimeout: 20000,
};
