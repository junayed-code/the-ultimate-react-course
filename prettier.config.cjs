/**@type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  singleQuote: false,
  arrowParens: "avoid",

  overrides: [
    {
      files: ["**/projects/16-fast-react-pizza/**"],
      options: {
        singleQuote: true,
        plugins: [require.resolve("prettier-plugin-tailwindcss")],
      },
    },
  ],
};

module.exports = config;
