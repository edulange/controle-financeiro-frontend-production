/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#62B6CB',
				secondary: '#CDC7E5',
				tertiary: '#fff',
				forth: 'rgba(0, 212, 255, 1)',
				primaryHover: '#245D6B',
				secondaryHover: '#382D62',
				forthHover: '#00778F',
				cancel: '#DE2B37',
				cancelHover: '#B01C25'
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'], // Define a fonte padrão como Roboto
			},
		},
	},
	plugins: [],
}
