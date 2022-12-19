/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      primary: '#26408b',
      primaryLight: '#5b6abc',
      primaryDark: '#001b5d',
      secondary: '#81d4fa',
      secondaryLight: '#b6ffff',
      secondaryDark: '#4ba3c7',
      textOnP: '#ffffff',
      textOnS: "#000000",
      error: '#B00020',
      close: '#ef5350',
      background: '#fafafa',
      lineBg: "#E8E8E8",
      hoverBg: '#F5F5F5'
    },
    extend: {
    }
  },
  plugins: [],
}
