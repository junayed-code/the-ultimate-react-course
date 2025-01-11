/**@type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  singleQuote: false,
  arrowParens: "avoid",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],

  overrides: [
    {
      files: ["**/projects/15-fast-react-pizza/**"],
      options: {
        singleQuote: true,
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
