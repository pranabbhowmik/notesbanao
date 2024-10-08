/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robotoMono: ['"Roboto Mono"', "monospace"],
        Mochiy: ['"Mochiy Pop One"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
