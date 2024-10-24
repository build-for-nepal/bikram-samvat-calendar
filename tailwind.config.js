/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontSize:{
        'md':"15px"
      },
      colors:{
        'muted':'#f0efeb',
        'primary':"#90be6d"
      }
    },
  },
  plugins: [],
}

