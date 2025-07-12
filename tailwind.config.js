/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
     colors:{
       primary:'#FF6B35',
       secondary:'#FF8C42',
       background: '#fcf7f1',
       gray:{
         50:  '#FAFAFA',
         100: '#E5E5E5',
         200: '#D4D4D4',
         300: '#A3A3A3',
         400: '#8A8A8A',
         500: '#767676',
         600: '#525252',
         700: '#3F3F3F',
         800: '#262626',
         900: '#0A0A0A'
       }
     }
    },
  },
  plugins: [],
}

