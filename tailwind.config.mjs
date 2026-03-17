/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				cyber: {
					black: '#08090e',
					dark: '#0c0d14',
					panel: '#11131c',
					border: '#1c2035',
				},
				accent: '#00d4ff',
				'accent-dim': '#0098b8',
				magenta: '#ff003c',
				terminal: {
					text: '#b0bec5',
					bright: '#e0e6ed',
					dim: '#525e78',
				},
			},
			fontFamily: {
				display: ['"Share Tech Mono"', 'monospace'],
				body: ['"IBM Plex Mono"', 'monospace'],
			},
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				glitch: {
					'0%, 100%': { clipPath: 'inset(0 0 0 0)' },
					'20%': { clipPath: 'inset(20% 0 60% 0)' },
					'40%': { clipPath: 'inset(60% 0 10% 0)' },
					'60%': { clipPath: 'inset(40% 0 40% 0)' },
					'80%': { clipPath: 'inset(10% 0 80% 0)' },
				},
				flicker: {
					'0%, 100%': { opacity: '1' },
					'92%': { opacity: '1' },
					'93%': { opacity: '0.8' },
					'94%': { opacity: '1' },
					'96%': { opacity: '0.9' },
					'97%': { opacity: '1' },
				},
				sweepLine: {
					'0%': { top: '-2px' },
					'100%': { top: '100%' },
				},
				gridPulse: {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '0.6' },
				},
			},
			animation: {
				blink: 'blink 1s step-end infinite',
				glitch: 'glitch 0.3s ease-in-out',
				flicker: 'flicker 4s linear infinite',
				'sweep-line': 'sweepLine 3s ease-in-out infinite',
				'grid-pulse': 'gridPulse 6s ease-in-out infinite',
			},
		},
	},
	plugins: [],
}
