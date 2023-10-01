/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text": "var(--color-text)",
        "background": "var(--color-background)"
      },
    },
  },
  plugins: [],
}

