import { type JestConfigWithTsJest } from "ts-jest";
import { defaults as tsjPreset } from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>'],
  transform: {
    ...tsjPreset.transform,
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  modulePaths: ['<rootDir>/'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/components/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
};

export default jestConfig;