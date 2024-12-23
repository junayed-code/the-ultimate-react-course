import eslintConfigBase from "@ultimate-react/eslint-config";
import eslintConfigNext from "@ultimate-react/eslint-config/next";
import eslintConfigReact from "@ultimate-react/eslint-config/react";
import eslintConfigTs from "@ultimate-react/eslint-config/typescript";

/**@type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...eslintConfigBase,
  ...eslintConfigReact,
  ...eslintConfigNext,
  ...eslintConfigTs,
  {
    ignores: [
      `.yarn`,
      `.pnp.cjs`,
      `.pnp.loader.mjs`,
      `**/node_modules/`,
      `**/.next/`,
      `**/dist/`,
      `**/package.json`,
    ],
  },
  {
    files: [`**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
    rules: {
      "no-console": "warn",
      "no-import-assign": "error",
      "no-undef": ["error", { typeof: false }],
    },
  },
  {
    files: [`projects/18-the-wild-oasis-website/**/*.{js,ts,jsx,tsx}`],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];

export default eslintConfig;
