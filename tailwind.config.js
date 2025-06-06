// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F9",
        "background-dark": "#1A1D29",
        card: "#FFFFFF",
        "card-dark": "#232736",
        input: "#FFFFFF",
        "input-dark": "#2B2F40",
        rose: colors.rose,
        gray: colors.zinc,
      },
    },
  },
  plugins: [],
};
