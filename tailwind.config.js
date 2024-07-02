/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Extending the tailwind class properties
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
        forminput: "#F5F5F6",
        error: "#D11A2A",
      },
    },
  },
  plugins: [],
};
