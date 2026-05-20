/* This code snippet is a configuration file for Tailwind CSS. It defines
custom colors under the `akira` and `decks` sections, custom font
families, and extends the default theme with these customizations. The
`content` property specifies the files where Tailwind CSS should look
for classes to extract, and the `presets` property includes a preset
from `nativewind`. The code is written in JavaScript and is exporting an
object that represents the Tailwind CSS configuration. */

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
          whiteVoid: "#eae9e4",
          lightGrey: "#f2f2f2",
          grey: "#8a8a8a",
          translucentWhite: "#eae8e3",
          darkGrey: "#2b2b2f",
          ink: "#141414",
          accent: "#7cb342",
          lightGreen: "#daf4d4",
          green: "#83c575",
          darkGreen: "#22441a",
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
          blue: "#43afc1",
          red: "#de4e4b",
          lightRed: "#ffe2de",
        },
        decks: {
          red: "#c8978f",
          gold: "#b3a379",
          green: "#91ae8b",
          cyan: "#77afb9",
          blue: "#88a8c9",
          purple: "#b699bc",
          pink: "#c495a6",
          grey: "#69737d",
        },
      },
      fontFamily: {
        sans: ["AK-UI"],
        AK_display: ["AK-display"],
        AK_data: ["AK-data"],
        AK_jp: ["AK-notoJP"],
        AK_ch: ["AK-notoCH"],
        AK_kr: ["AK-notoKO"],
      },
    },
  },
  plugins: [],
};
