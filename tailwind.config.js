/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'], /* Mantido caso queira um tema light no futuro */
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./index.html',
	],
	theme: {
		container: {
			center: true,
			padding: '1.5rem', 
			screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
				xl: '1280px',
        '2xl': '1536px', /* Aumentado para telas maiores */
			},
		},
		extend: {
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'Montserrat', 'sans-serif'], 
        heading: ['Montserrat', 'sans-serif'],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
        accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' }, /* Efeito mais sutil */
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))' },
          '50%': { boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-in forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'pulse-neon': 'pulse-neon 2s infinite ease-in-out',
			},
      boxShadow: {
        'neon-sm': '0 0 3px hsl(var(--primary)/0.8), 0 0 6px hsl(var(--primary)/0.6)',
        'neon-md': '0 0 8px hsl(var(--primary)/0.8), 0 0 15px hsl(var(--primary)/0.6)',
        'neon-lg': '0 0 15px hsl(var(--primary)/0.9), 0 0 30px hsl(var(--primary)/0.7)',
        'inner-neon': 'inset 0 0 10px hsl(var(--primary)/0.5)',
      }
		},
	},
	plugins: [require('tailwindcss-animate')],
};