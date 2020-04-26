module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'rgb(122,163,188)',
        backgroundReversed: 'rgb(95,95,97)',
        backgroundSecondary: 'rgb(239,232,244)',
        backgroundThird: 'rgb(255,255,255)',
        highlight: 'rgb(168,183,198)',
        selected: 'rgb(140,189,218)',
        primary: 'rgb(0,0,0)',
        primaryReversed: 'rgb(255,255,255)',
        secondary: 'rgb(95,95,97)',
        secondaryReversed: 'rgb(203,196,208)',
        focus: 'rgb(113,153,188)',
        ok: 'rgb(115,176,92)',
        warn: 'rgb(244,137,150)',
        toast: 'rgb(95,95,97)',
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
