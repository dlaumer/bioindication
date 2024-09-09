module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        projectcolor: '#0b99ff',
        activecolor: '#0b99ff55',
        hovergrey: '#f9f9f9',
        backgroundgray: '#e9e9e9',
        darkgrey: "#5b5b5b",
        headerwhite: '#ffffff55',
        whiteTransparent: '#ffffffaa',
        grayedOut: '#939393'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
