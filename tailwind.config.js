/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    "./pages/**/*{html,js,jsx,tsx}",
    "./components/**/*{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        c60: colors.slate["700"],
        c30: colors.slate["900"],
        c10: colors.teal["900"]
      }
    },
  },
  plugins: [],
}
