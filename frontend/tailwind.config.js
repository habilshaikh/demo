/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Outfit', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                // Premium Navy Blue + Royal Gold Theme (Mascot-Matched)
                vault: {
                    navy: '#22304F',
                    'navy-deep': '#1A2540',
                    'navy-light': '#2D3D5F',
                    'navy-soft': '#384A6E',
                },
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#E3B82A',
                    dark: '#B8941F',
                    muted: '#C9A227',
                    royal: '#D4AF37',
                    glow: 'rgba(212, 175, 55, 0.3)',
                },
                silver: {
                    DEFAULT: '#C8D0DC',
                    light: '#F2F2F2',
                    soft: '#E8EDF4',
                    platinum: '#FFFFFF',
                },
                cream: {
                    DEFAULT: '#F8F6F0',
                    soft: '#FFFEF9',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                'xl': '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'gold': '0 0 30px rgba(212, 175, 55, 0.25)',
                'gold-lg': '0 0 50px rgba(212, 175, 55, 0.35)',
                'gold-glow': '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
                'navy': '0 0 30px rgba(34, 48, 79, 0.3)',
                'navy-lg': '0 0 50px rgba(34, 48, 79, 0.4)',
                'inner-gold': 'inset 0 1px 0 rgba(212, 175, 55, 0.2)',
                'luxury': '0 25px 50px -12px rgba(26, 37, 64, 0.6)',
                'card-luxury': '0 4px 30px rgba(26, 37, 64, 0.4), 0 0 1px rgba(212, 175, 55, 0.15)',
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 50%, #B8941F 100%)',
                'gold-gradient-hover': 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 50%, #D4AF37 100%)',
                'navy-gradient': 'linear-gradient(180deg, #22304F 0%, #1A2540 50%, #22304F 100%)',
                'navy-light-gradient': 'linear-gradient(135deg, #2D3D5F 0%, #22304F 50%, #1A2540 100%)',
                'silver-gradient': 'linear-gradient(135deg, #F2F2F2 0%, #C8D0DC 50%, #E8EDF4 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                'gold-shine': 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'shine': {
                    from: { backgroundPosition: '-200% center' },
                    to: { backgroundPosition: '200% center' }
                },
                'gold-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-in-up': 'fade-in-up 0.5s ease-out',
                'shine': 'shine 2s ease-in-out infinite',
                'gold-pulse': 'gold-pulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            backdropBlur: {
                xs: '2px',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};