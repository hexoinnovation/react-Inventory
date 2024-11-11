/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'x-small': '320px',
   

      'small': '576px',
    

      'medium': '768px',
    
      "large" : "992px",
      "extra-large":"1200px",
      "xx-large":"1400px"
    },
    extend: {
      fontFamily: {
        label: ["Host Grotesk", "sans-serif"], 
      
    },
  },
  plugins: [],
}
}

