import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/icons/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        walkGreen: '#579e5d',
        busColor: '#e60000',
        metroColor: '#e66815',
        tramColor: '#2c53bf',
        airPlaneColor: '#ded52f',
      },
    },
  },
  plugins: [],
};
