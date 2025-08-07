import type { Config } from 'tailwindcss'
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
        'short': { 'raw': '(max-height: 500px)' },
      },

    },
  }
}
export default config
