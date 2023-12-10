/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  resolver: "jest-ts-webcompat-resolver",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,

}