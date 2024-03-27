module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      "react-native-reanimated/plugin",
      'expo-router/babel',
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            assets: "./src/assets",
          },
        },
      ],

    ],
  };
};
