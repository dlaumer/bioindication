module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
          backgroundgray: '#e9e9e9',
          navyblue: '#001C6A',
          hoverblue: '#0045FF',
          basegreen: '#023E00',
          hovergreen: '#0F8600',
          hovergreenLight: '#14AF00',
          winered: '#580000',
          backgroundblue: '#C9ECFF',
          lightgrey: '#a8a8a8',
          midgrey: '#e9e9e9',
          darkergrey: '#d5d5d5',
          infoPanel: '#ffd900',
          headerwhite: '#ffffff55',
          headergreen: '#0b99ff55',
          projectgreen: '#0b99ff',
          activeBlue: '#6c93ff8b',
          whiteTransparent: '#ffffffaa',
          evendarkergrey: "#5b5b5b"
      },
  },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
