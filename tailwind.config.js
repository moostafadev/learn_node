/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.css", "./views/**/*.pug"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        xl: "1200px",
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
