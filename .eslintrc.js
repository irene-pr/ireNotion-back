module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    "cypress/globals": true,
  },

  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ["/*.config.js"],
  plugins: ["@typescript-eslint", "prettier", "cypress"],
  rules: {
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "consistent-return": "off",
    "no-debugger": "off",
    "no-console": "off",
    "no-redeclare": { builtinGlobals: true },
  },
};
