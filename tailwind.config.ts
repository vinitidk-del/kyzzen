import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
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
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Kyzzen Brand Colors
        "kyzzen-blue": {
          DEFAULT: "hsl(var(--kyzzen-blue))",
          light: "hsl(var(--kyzzen-blue-light))",
          dark: "hsl(var(--kyzzen-blue-dark))",
        },
        "creator-purple": {
          DEFAULT: "hsl(var(--creator-purple))",
          light: "hsl(var(--creator-purple-light))",
          dark: "hsl(var(--creator-purple-dark))",
        },
        "revenue-green": {
          DEFAULT: "hsl(var(--revenue-green))",
          light: "hsl(var(--revenue-green-light))",
          dark: "hsl(var(--revenue-green-dark))",
        },
        "content-orange": {
          DEFAULT: "hsl(var(--content-orange))",
          light: "hsl(var(--content-orange-light))",
          dark: "hsl(var(--content-orange-dark))",
        },
        "premium-gold": {
          DEFAULT: "hsl(var(--premium-gold))",
          light: "hsl(var(--premium-gold-light))",
          dark: "hsl(var(--premium-gold-dark))",
        },
        "insight-teal": {
          DEFAULT: "hsl(var(--insight-teal))",
          light: "hsl(var(--insight-teal-light))",
          dark: "hsl(var(--insight-teal-dark))",
        },
        // Background layers
        "bg-dark": "hsl(var(--bg-dark))",
        "bg-medium": "hsl(var(--bg-medium))",
        "bg-light": "hsl(var(--bg-light))",
        // Text colors
        "text-light": "hsl(var(--text-light))",
        "text-medium": "hsl(var(--text-medium))",
        "text-muted": "hsl(var(--text-muted))",
        // Semantic colors
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-purple': 'var(--gradient-purple)',
        'gradient-revenue': 'var(--gradient-revenue)',
        'gradient-premium': 'var(--gradient-premium)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-hero': 'var(--gradient-hero)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'primary': 'var(--shadow-primary)',
        'primary-hover': 'var(--shadow-primary-hover)',
        'revenue': 'var(--shadow-revenue)',
        'purple': 'var(--shadow-purple)',
        'gold': 'var(--shadow-gold)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
