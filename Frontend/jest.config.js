module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        // Transform files with a `js`, `jsx`, `ts`, or `tsx` extension using `babel-jest`
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        // Handle module aliases (if you have them in your project)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Location of your setupTests file
};
