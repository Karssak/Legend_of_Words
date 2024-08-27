/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-text': 'linear-gradient(270deg, #FFA500, #C5A300, #dc9004, #FFD700, #FFA500, #FFC700, #FFA500)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      animation: {
        'gradient-animation': 'gradient 5s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
    },
  },
  plugins: [],
};
