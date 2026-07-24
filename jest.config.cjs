module.exports = {
	clearMocks: true,
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.test.{ts,tsx}",
		"!src/shared/testing/**",
	],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	moduleNameMapper: {
		"^@/shared/config/env$": "<rootDir>/src/shared/testing/env-mock.ts",
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.css$": "<rootDir>/src/shared/testing/style-mock.cjs",
	},
	setupFiles: ["<rootDir>/src/shared/testing/jest-polyfills.cjs"],
	setupFilesAfterEnv: ["<rootDir>/src/shared/testing/setup-tests.ts"],
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["/.react-router/", "/build/"],
	transform: {
		"^.+\\.[cm]?[jt]sx?$": [
			"@swc/jest",
			{
				jsc: {
					parser: {
						syntax: "typescript",
						tsx: true,
					},
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
				module: {
					type: "commonjs",
				},
			},
		],
	},
	transformIgnorePatterns: [],
}
