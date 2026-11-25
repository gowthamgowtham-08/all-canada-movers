/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./services/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        brandRed: {
          DEFAULT: '#ED1C24',
          dark: '#c4161d',
          light: '#fef2f2'
        },
        brandBlue: {
          DEFAULT: '#087FCA',
          dark: '#0668a5',
          light: '#e8f4fd'
        },
        brandNavy: '#0B1F33',
        brandBlack: '#000000',
        brandWhite: '#FFFFFF',
        textDark: '#111827',
        textBody: '#374151',
        textMuted: '#6b7280',
        borderLight: '#f3f4f6',
        bgLight: '#f9fafb'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '1500px',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        xl: '26px'
      },
      boxShadow: {
        subtle: '0 4px 15px rgba(0,0,0,0.05)',
        card: '0 10px 30px rgba(0,0,0,0.07)',
        elevated: '0 20px 45px rgba(0,0,0,0.12)'
      }
    },
  },
  plugins: [],
}

