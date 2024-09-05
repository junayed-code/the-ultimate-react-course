import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/**@type {import("eslint").Linter.Config[]} */
export default tseslint.config({
  extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
  files: [`**/*.{js,mjs,cjs,ts,jsx,tsx}`],
  ignores: [`**/dist/**`, `**/node_modules/**`],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    react: pluginReact,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...pluginReact.configs.recommended.rules,
    "no-undef": ["error", { typeof: false }],
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        // "args": "all",
        argsIgnorePattern: "^_",
        // "caughtErrors": "all",
        // caughtErrorsIgnorePattern: "^_",
        // "destructuredArrayIgnorePattern": "^_",
        varsIgnorePattern: "^_",
        // "ignoreRestSiblings": true
      },
    ],
  },
});
