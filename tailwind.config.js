/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141B3E",
        white: "#FFFFFF",
        grey_white: "#F3F3F3",
        mouse_gray: "#2E2E2E",
        gray_footer: "#979999",
        gray_rectangle: "#F9F9FB",
        gray_sidebar: "#f9f9fb",
      },
    },
    height: {
      150: "600px",
      20: "80px",
      25: "100px",
      40: "160px",
      full: "100%",
      img_landing: "568px",
    },
    minWidth: {
      100: "100px",
      150: "150px",
      200: "200px",
      300: "300px",
      400: "400px",
    },
  },
  variants: {
    extends: {},
  },
  plugins: [require("@vueform/slider/tailwind")],
};
