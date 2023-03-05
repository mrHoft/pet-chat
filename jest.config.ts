import type {Config} from 'jest';

export default async (): Promise<Config> => {
	return {
		verbose: true,
		preset: 'ts-jest',
		testPathIgnorePatterns: ["/node_modules/", "/dist/", "/static/", "/github/"],
		testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts$',
		moduleFileExtensions: ['ts', 'js'],
		// modulePathIgnorePatterns: ['.*\.tmpl$'],
		moduleNameMapper: {
			'.*\.tmpl$': '<rootDir>/test/tmpl_dummy.js',
			'.*\.css$': '<rootDir>/test/obj_dummy.js',
			'.*\.ts$': '<rootDir>/test/obj_dummy.js'
		},
		// transform: {'^.+\.(css|less)$': '<rootDir>/test/css_dummy.js'},
		testEnvironment: 'jsdom',
	};
};
