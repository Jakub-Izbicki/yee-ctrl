module.exports = {
  theme: {
    extend: {
      colors: {
        dark: 'rgb(72,70,77)',
        darker: 'rgb(53,50,58)',
        darkest: 'rgb(41,37,47)',
        highlight: 'rgb(101,101,103)',
        selected: 'rgb(171,171,173)',
        primary: 'rgb(242,242,244)',
        secondary: 'rgb(196,196,198)',
        focus: 'rgb(244,221,102)',
        accent: 'rgb(127,117,105)',
        ok: 'rgb(157,224,134)',
        warn: 'rgb(244,137,150)',
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
