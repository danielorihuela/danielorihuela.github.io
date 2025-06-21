/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				royalPurple: 'var(--royal-purple)',
				primary: {
					DEFAULT: 'var(--electric-blue)',
				}
			},
		}
	},
	plugins: [],
}
