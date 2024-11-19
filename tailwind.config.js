/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ['./three_project/app/templates/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
}