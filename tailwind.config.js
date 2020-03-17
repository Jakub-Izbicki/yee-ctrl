module.exports = {
  theme: {
    extend: {
      colors: {
        dark: 'rgb(82,80,87)',
        darker: 'rgb(75,72,80)',
        darkest: 'rgba(35,32,40,0.78)',
        highlight: 'rgb(101,101,103)',
        selected: 'rgb(171,171,173)',
        primary: 'rgb(242,242,244)',
        secondary: 'rgb(175,175,177)',
        focus: 'rgb(244,200,148)'
      },
    },
  },
  variants: {
    visibility: ['group-hover'],
    backgroundColor: ['hover', 'active'],
    scale: ['active'],
    transitionProperty: ['hover', 'focus']
  },
  plugins: [
    require('./node_modules/tailwind-percentage-heights-plugin')(),
  ],
}
