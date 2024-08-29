/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        blue_primary: "#0082da",
        blue_secondary: "#f2f8fd",
        ice_blue: "#dbdee4",
      },
    },
  },
  plugins: [],
};
