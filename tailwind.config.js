module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.js'],
  },
  theme: {
    extend: {
      colors: {
        primary: '#EB643F',
        primaryLight: '#FF9678',
        primaryDisable: '#FFC7B8',
        secondary: '#3F79EB',
        secondaryDisable: '#CCDDFF',
        success: '#46D65D',
        failed: '#FB5555',
      },
    },
  },
  variants: {
    textColor: ({ after }) => after(['disabled']),
    resize: ({ after }) => after(['disabled']),
    opacity: ({ after }) => after(['disabled']),
    cursor: ({ after }) => after(['disabled']),
    backgroundColor: ({ after }) => after(['disabled']),
  },
  plugins: [],
}
