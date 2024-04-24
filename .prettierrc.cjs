/** @type {import("prettier").Config} */

const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};

module.exports = config;
