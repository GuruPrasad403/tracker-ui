/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-image': "url('./src/assets/BG.png')",
      },
      scrollbar: {
        hide: {
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none", /* IE 10+ */
          "scrollbar-width": "none",   /* Firefox */
        },
      },
    },
  },
  plugins: [],
}