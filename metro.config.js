// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // Sometimes, explicitly adding this can fix import resolution issues
    extraNodeModules: {
      // Add any custom paths if necessary
    },
  },
};
