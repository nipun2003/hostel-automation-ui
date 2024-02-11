/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "rgba(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgba(var(--primary))",
          foreground: "rgba(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        divider:{
          DEFAULT: "hsl(var(--divider))",
        },
        gray:{
          DEFAULT: " rgba(var(--gray))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgba(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize:{
        xs: 'calc(var(--text-base) * 0.75)',
        sm: 'calc(var(--text-base)*0.875)',
        base: 'var(--text-base)',
        lg: 'calc(var(--text-base)*1.375)',
        xl: 'calc(var(--text-base)*1.5)',
        '2xl': 'calc(var(--text-base)*1.875)',
        '3xl': 'calc(var(--text-base)*2.125)',
      },
      spacing:{
        xs: 'calc(var(--space-base)*0.25)',
        s : 'calc(var(--space-base)*0.5)',
        sm: 'calc(var(--space-base)*0.75)',
        m: 'var(--space-base)',
        ml: 'calc(var(--space-base)*1.25)',
        l: 'calc(var(--space-base)*1.5)',
        xl: 'calc(var(--space-base)*2)',
        '2xl': 'calc(var(--space-base)*2.75)',
        '3xl': 'calc(var(--space-base)*3)',
        '4xl': 'calc(var(--space-base)*3.5)',
        '5xl': 'calc(var(--space-base)*4.5)',
      },
      boxShadow: {
        DEFAULT: '0px 4px 8px 0px rgba(var(--shadow))',
        lg: '0px 4px 12px 0px rgba(var(--shadow))',
        xl: '0px 16px 16px rgba(var(--shadow))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    }
  },
  plugins: [require("tailwindcss-animate")],
}