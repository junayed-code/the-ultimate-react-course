import js from "@eslint/js";
import globals from "globals";

/**@type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  js.configs.recommended,
  {
    name: `@ultimate-react/eslint-config/env`,
    files: [`**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
];

export default eslintConfig;
