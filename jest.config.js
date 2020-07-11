module.exports = {
	collectCoverageFrom: ['<rooDir>/src/**/*.ts'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['<rooDir>/jest/setupFiles.js'],
};
