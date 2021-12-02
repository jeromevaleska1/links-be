module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.(t|j)s', '!**/main.ts', '!**/*.(metadata|module|factory).(t|j)s'],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: [
      '<rootDir>/(sdk|swagger|schema|__fixtures__|config|events)/',
      '__tests__',
      'integration-spec.ts',
      'interface',
      'dto',
      'middleware',
    ],
    coverageReporters: ['html', 'lcov', 'text', 'text-summary'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    modulePathIgnorePatterns: [],
    rootDir: 'src',
    testMatch: ['**/*.spec.ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['dist'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
  };
  