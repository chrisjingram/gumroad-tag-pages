/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/bundles/**/*.{js,jsx,ts,tsx}",
    "./app/views/**/*.{erb,haml,html,slim}",
    "./app/assets/svg/**/*.svg",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

