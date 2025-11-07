module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.test.{js,jsx}',
    '!src/setupTests.js'
  ],
  coverageReporters: ['text', 'lcov', 'html']
};
