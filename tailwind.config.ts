import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#020617',
        surface: '#0f172a',
        accent: '#6366f1',
        accent2: '#d946ef',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(217,70,239,0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
