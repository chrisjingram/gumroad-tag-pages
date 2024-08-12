const systemFontStack = "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif";
module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/bundles/**/*.{js,jsx,ts,tsx}",
    "./app/views/**/*.{erb,haml,html,slim}",
    "./app/assets/svg/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        "gumroad-pink": "#ff90e7",
        "gumroad-yellow": "#ffc900",
        "gumroad-purple": "#b23386",
        "gumroad-green": "#24a094",
        "gumroad-yellow": "#f1f332",
        "gumroad-blue": "#91a8ed",
        "gumroad-red": "#98282a",
        "gumroad-orange": "#ff7051",
        "gumroad-black": "#0d0d0d",
        "gumroad-cream": "#F4F4F1"
      },
      fontFamily: {
        sans: [systemFontStack]
      }
    },
  },
  plugins: [],
}

