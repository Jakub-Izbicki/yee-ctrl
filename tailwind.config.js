module.exports = {
  theme: {
    extend: {
      colors: {
        dark: 'rgb(82,80,87)',
        darker: 'rgb(75,72,80)',
        darkest: 'rgba(35,32,40,0.78)',
        highlight: 'rgb(101,101,103)',
        primary: 'rgb(242,242,244)',
        secondary: 'rgb(175,175,177)'
      },
    },
  },
  variants: {
    visibility: ['group-hover'],
  },
  plugins: [
    require('./node_modules/tailwind-percentage-heights-plugin')(),
  ],
}
