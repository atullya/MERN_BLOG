/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px 3px rgba(31, 30, 72, 0.6)", // Default glow
        glowHover: "0 0 25px 5px rgba(31, 30, 72, 0.8)", // Stronger glow on hover
      },
    },
  },
  plugins: [],
};
