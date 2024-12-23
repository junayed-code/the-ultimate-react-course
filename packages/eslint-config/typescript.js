import tseslint from "typescript-eslint";

const eslintConfigTs = [
  ...tseslint.configs.recommended,
  {
    files: [`**/*.{ts,mts,cts,tsx}`],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfigTs;
