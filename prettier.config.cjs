/**@type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  singleQuote: false,
  arrowParens: "avoid",

  overrides: [
    {
      files: ["**/projects/15-fast-react-pizza/**"],
      options: {
        singleQuote: true,
        plugins: [require.resolve("prettier-plugin-tailwindcss")],
      },
    },
    {
      files: ["**/projects/16-the-wild-oasis/**"],
      options: {
        singleQuote: true,
      },
    },
  ],
};

module.exports = config;
