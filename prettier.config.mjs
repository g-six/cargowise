/** @type {import("prettier").Config} */
const config = {
  semi: false,
  useTabs: true,
  tabWidth: 1,
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'es5',
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
}

export default config
