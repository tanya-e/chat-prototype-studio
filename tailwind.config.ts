import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        messenger: {
          base: 'var(--messenger-base)',
          border: 'var(--messenger-border)',
          elevated: 'var(--messenger-elevated)',
          'text-default': 'var(--messenger-text-default)',
          'text-muted': 'var(--messenger-text-muted)',
          'text-muted-extra': 'var(--messenger-text-muted-extra)',
          'icon-muted': 'var(--messenger-icon-muted)',
          'customer-bg': 'var(--messenger-customer-bg)',
          'customer-text': 'var(--messenger-customer-text)',
          'ai-bg': 'var(--messenger-ai-bg)',
          'ai-text': 'var(--messenger-ai-text)',
          'composer-bg': 'var(--messenger-composer-bg)',
          'composer-border': 'var(--messenger-composer-border)',
          'input-base': 'var(--messenger-input-base)',
          'send-button-disabled': 'var(--messenger-send-button-disabled)',
          'send-button-disabled-text': 'var(--messenger-send-button-disabled-text)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
        'pulse-dots': {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'messenger-open': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) translateY(20px)',
            borderRadius: '34px'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            borderRadius: '34px'
          }
        },
        'messenger-close': {
          '0%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            borderRadius: '34px'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.5) translateY(20px)',
            borderRadius: '34px'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-dots': 'pulse-dots 1.4s infinite ease-in-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'messenger-open': 'messenger-open 300ms ease-in-out forwards',
        'messenger-close': 'messenger-close 300ms ease-out forwards'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
