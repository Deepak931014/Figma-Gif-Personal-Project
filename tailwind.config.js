module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"], // Add Open Sans
        quintessential: ['Quintessential', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        'abril-fatface': ['"Abril Fatface"', 'serif'],
      },
      animation: {
        'fade-in-out': 'fadeInOut 12s ease-in-out infinite',
        'border-grow': 'borderGrow 2s infinite ease-in-out',
        'slide-left': 'slideLeft 8s linear infinite', // Increased duration for smoother loop
      },
      keyframes: {
        borderGrow: {
          '0%, 100%': {
            borderWidth: '2px',
          },
          '50%': {
            borderWidth: '8px',
          },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '25%': { opacity: '1' },
          '50%': { opacity: '0' },
          '75%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)' }, // Start from the original position
          '100%': { transform: 'translateX(-180%)' }, // Default for mobile
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
