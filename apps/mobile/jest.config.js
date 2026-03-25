module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(.pnpm/.*/)?(react-native|@react-native|expo|@expo|react-navigation|@react-navigation|@shopify|native-base|react-native-svg|jest-expo))",
  ],
  testMatch: ["**/__tests__/components/**/*.test.tsx"],
};
