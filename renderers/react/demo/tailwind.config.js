/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../src/**/*.{js,ts,jsx,tsx}",
    "../dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    'disabled:bg-slate-50',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
