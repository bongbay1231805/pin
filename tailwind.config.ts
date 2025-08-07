import type { Config } from 'tailwindcss'
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'short': { 'raw': '(max-height: 800px)' },
      },

    },
  }
}
export default config
