module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'rgb(29, 161, 242)', // Màu chính
        secondary: '#14171A', // Màu phụ
        accent: '#F5A623', // Màu nhấn
        zinc: '#EEEDEB',
        binc: '#C7C8CC',
        green: '#059212',
        red: '#FF0000',
        blue: '#3DC2EC',
        blue100: '#4B70F5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
