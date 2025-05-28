/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: '#ffff00', // Bright yellow from the logo
          dark: '#e6e600',    // Slightly darker yellow
          light: '#ffff66',   // Lighter yellow
        },
        accent: '#000000',    // Black
      },
      backgroundColor: {
        'yellow-gradient': 'linear-gradient(to right, #ffff00, #ffff66)',
      },
      boxShadow: {
        'yellow': '0 4px 14px 0 rgba(255, 255, 0, 0.3)',
        'yellow-lg': '0 10px 25px -5px rgba(255, 255, 0, 0.4)',
      }
    },
  },
  plugins: [],
} 