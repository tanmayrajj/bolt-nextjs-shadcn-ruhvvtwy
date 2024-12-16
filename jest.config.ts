import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    coverageDirectory: '<rootDir>/__coverage__',
    collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}', '<rootDir>/components/**/*.{ts,tsx}', '<rootDir>/libs/**/*.{ts,tsx}'],
    transformIgnorePatterns: [
        'node_modules/(?!(next|next-auth|@next-auth|next-themes)/)'
    ],
    moduleDirectories: ['node_modules', '<rootDir>'],
    testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
}

export default createJestConfig(config)