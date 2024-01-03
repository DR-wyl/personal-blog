module.exports = {
  plugins: {
    // ...
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 1432,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
    },
  },
};
