/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors:{
        "color_1": "#040711",
        "color_2": "#394150",
        "color_3": "#4D5562",
        "color_4": "#CDD5E0",
        "color_5": "#F9FAFB",
        "color_6": "#3662E3",
        "color_7": "#7CA9F3",
        "color_8": "#212936cc",
        "color_9": "#121826cc",
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

