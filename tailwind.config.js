/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - Deep Ocean Blue
        primary: {
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CFFF',
          300: '#66B7FF',
          400: '#339FFF',
          500: '#0087FF', // Main brand color
          600: '#006CD1',
          700: '#0051A3',
          800: '#003675',
          900: '#001B47',
        },
        // Secondary accent colors - Vibrant Coral
        accent: {
          50: '#FFF1EE',
          100: '#FFE4DD',
          200: '#FFC9BB',
          300: '#FFAE99',
          400: '#FF9377',
          500: '#FF7855', // Main accent
          600: '#D15E44',
          700: '#A34533',
          800: '#752C22',
          900: '#471311',
        },
        // Tertiary colors - Teal
        tertiary: {
          50: '#E6FFF9',
          100: '#B3FFF0',
          200: '#80FFE6',
          300: '#4DFFDC',
          400: '#1AFFD3',
          500: '#00E6B8', // Main tertiary
          600: '#00B392',
          700: '#00806B',
          800: '#004D40',
          900: '#001A15',
        },
        // Neutral tones - Slate
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // System feedback colors
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Background gradients
        gradient: {
          start: '#001B47',
          middle: '#003675',
          end: '#0051A3',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};