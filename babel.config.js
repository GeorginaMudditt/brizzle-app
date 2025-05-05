module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    overrides: [
      {
        test: /node_modules[\\/]@expo[\\/]metro-runtime/,
        presets: ["module:metro-react-native-babel-preset"],
      },
    ],
  };
};
