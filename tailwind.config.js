import { Inter_600SemiBold } from '@expo-google-fonts/inter';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        primary: "#F7F5F8",
        prePrimary: "#FFFFFF",
        buttonColor: "#9406F9",
        hTextColor: "#000000",
        contentText: "#334155"

      },

      fontFamily: {
        inter: ["Inter_400Regular"],
        interMedium: ["Inter_500Medium"],
        interSemiBold : ["Inter_600SemiBold"],
        interBold: ["Inter_700Bold"]
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl" : "30px"
      }
    },
  },
  plugins: [],
}

