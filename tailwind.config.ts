import type {Config} from 'tailwindcss';
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // ... các keyframes khác
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        // ... các animation khác
      },
    },
  },
};
export default config;
