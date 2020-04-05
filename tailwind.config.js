module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'rgb(113,153,188)',
        backgroundSecondary: 'rgb(239,232,244)',
        backgroundThird: 'rgb(255,255,255)',
        highlight: 'rgb(168,183,198)',
        selected: 'rgb(88,127,162)',
        primary: 'rgb(0,0,0)',
        secondary: 'rgb(95,95,97)',
        focus: 'rgb(113,153,188)',
        accent: 'rgb(186,176,163)',
        ok: 'rgb(115,176,92)',
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
