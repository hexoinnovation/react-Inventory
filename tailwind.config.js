/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'x-small': '320px',
      // => @media (min-width: 640px) { ... }

      'small': '576px',
      // => @media (min-width: 1024px) { ... }

      'medium': '768px',
      // => @media (min-width: 1280px) { ... }
      "large" : "992px",
      "extra-large":"1200px",
      "xx-large":"1400px"
    },
    extend: {},
  },
  plugins: [],
}

