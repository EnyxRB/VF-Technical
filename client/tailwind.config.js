/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      colors: {
        "vf-primary": "#7837EB",
        "vf-secondary": "#F5FAFA",
        "vf-text": "#0D0D0E",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
