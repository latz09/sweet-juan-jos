/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    fontFamily: {
			oswald: ['Oswald', 'sans-serif'],
			// amatic: ['Amatic SC', 'sans-serif'],
			amatic: ['Dancing Script', 'cursive'],
		},
  },
  plugins: [],
};
