/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			primary: '#29B2AC',
			secondary: '',
			dark: '#012623',
			light: '#F0FFFE',
			invalid: '#CBFFFD',
		},
	},
	plugins: [],
};
