/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        "9v": "9vh",
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "91v": "91vh",
        "100v": "100vh",
      },

      colors: {
        primary: "#685BFF",
        "primary-light": "#EFEFFF",
        lightbackground: "#FAFAFB",
        darkbackground: "#161616",
        cardcolor: "#212121",
        darkgrey: "#888888",
        grey: "#848D9D",
        forminput: "#F5F5F6",
        error: "#D11A2A",
        success: "#3A974C",
        warning: "#FF9129",
        iconblue: "#4285F4",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
