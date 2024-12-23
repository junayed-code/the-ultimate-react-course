import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/**@type {import("eslint").Linter.Config[]} */
const eslintConfigNext = [
  ...compat.config({
    extends: [`next/core-web-vitals`],
    settings: {
      react: { version: `detect` },
      next: {
        version: `detect`,
        rootDir: `projects/*`,
      },
    },
  }),
];

export default eslintConfigNext;
