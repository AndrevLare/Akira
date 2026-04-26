/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        akira: {
          pureWhite: "#ffffff",
          paper: "#f4f2ed",
          darkWhite: "#f0f0ef",
          boxBorder: "#e0e0e0",
          darkPaper: "#9c9789",
          darkText: "#9f9f9f",
          ink: "#141414",
          accent: "#7cb342",
          hard: "#8d6e63",
          good: "#c0ca33",
          easy: "#84c476",
          darkBG: "#0e0e10",
          darkCard: "#1e1e22",
          lightDark: "#1e1d22",
          altLightDark: "#171719",
          boxDarkBorder: "#28272c",
          fire: "#a5401a",
          lightFire: "#ffd1ad",
        },
      },
      fontFamily: {
        sans: ["AK-UI"],
        AK_display: ["AK-display"],
        AK_data: ["AK-data"],
      },
    },
  },
  plugins: [],
};
