/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react"); // Import required for the heroui plugin

export default {
  darkMode: ["class"], // Enable class-based dark mode (e.g., class="dark") - using array format from second config
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Combined paths
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Combined paths
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Combined paths
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // From second config
  ],
  theme: {
    extend: {
      //BG Griandent
      backgroundImage: {
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, #d8b4fe, #c4b5fd, #ddd6fe)',
        'conic-gradient-one': 'conic-gradient(at right bottom, rgb(34, 197, 94), rgb(190, 18, 60), rgb(168, 85, 247))',
        'conic-gradient-two': 'conic-gradient(at left top, rgb(20, 83, 45), rgb(21, 128, 61), rgb(101, 163, 13))'
      },
      colors: {
        // Colors from the first config
        brand: {
          primary: '#7c3aed', // violet-600
          'primary-dark': '#6d28d9', // violet-700
          // Added from second config's brand
          background: '#111827', // gray-900
          muted: '#1e293b', // slate-800
          'accent-cool': '#164e63', // cyan-900
          'accent-warm': '#881337', // rose-900
          'text-light': '#f9fafb', // near white
          'text-muted': '#cbd5e1', // slate-300
        },
        light: {
          background: '#f9fafb', // gray-50
          surface: '#f3f4f6', // gray-100
          'violet-tint': '#ede9fe', // violet-100
          'text-primary': '#111827', // gray-900
          'text-muted': '#6b7280', // gray-500
          border: '#d1d5db', // gray-300
        },
        dark: {
          background: '#111827', // gray-900
          surface: '#1e293b', // slate-800
          'violet-glow': '#1e1b4b', // indigo-950
          'text-primary': '#f9fafb', // light text
          'text-muted': '#cbd5e1', // slate-300
          border: '#334155', // slate-600
        },
        emeraldMid: '#8FB7A0', // transitional shade
        emeraldDark: '#1A573F',

        // Colors from the second config (using HSL variables)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
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
        // Default Tailwind colors explicitly included in the second config
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
        // Re-defined semantic colors in the second config (will likely override the first set if not careful, but merging them under extend is generally okay)
        // Note: The second config also defines 'primary', 'secondary', etc. using HSL vars
        // The first config defined 'brand.primary', 'light', and 'dark' with hex codes.
        // Both sets are included here under extend. The HSL var based ones are at the top level of colors within extend,
        // while the hex based ones are nested under 'brand', 'light', and 'dark'.
        // Depending on how you intend to use these, you might need to adjust the structure.
        // For now, I've kept both structures as they were in the original files within extend.

        // Sidebar colors from the second config
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

        //Background gradient color

      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        // Merged keyframes (removed duplicates)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)'
          },
          '50%': {
            transform: 'translateY(-15px) rotate(5deg)'
          },
          '100%': {
            transform: 'translateY(0px) rotate(0deg)'
          }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
      },
      animation: {
        // Merged animations (removed duplicates)
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite'
      },
      fontFamily: {
        fourof: ['Qanelas-soft', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // From second config
    heroui() // From second config
  ],
};