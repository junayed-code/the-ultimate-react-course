import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

/**@type {import("eslint").Linter.Config[]} */
const eslintConfigReact = [
  {
    name: `@ultimate-react/eslint-config/react`,
    files: [`**/*.{js,ts,jsx,tsx}`],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReactRefresh.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat[`jsx-runtime`].rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfigReact;
