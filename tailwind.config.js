module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.html','./src/**/*.js'],
  },
  theme: {
    extend: {
      colors: {
        'primary': '#FF974B',
      }
    }
  },
  variants: {},
  plugins: []
}
