import "ts-node/register";

import type { ExpoConfig } from "expo/config";

export default {
  name: "ShopApp",
  slug: "ShopApp",
  scheme: "shop-app-scheme",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.shleyze.shopapp",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.shleyze.shopapp",
    permissions: ["LOCATION"],
  },
  locales: {
    ru: "ru",
  },
  plugins: [
    "expo-router",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Разрешите использовать ваше местоположение",
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          minSdkVersion: 26,
        },
      },
    ],
    // [
    //   "expo-dev-launcher",
    //   {
    //     launchMode: "most-recent",
    //   },
    // ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "24521f04-05d2-4401-9c28-4511d33a9355",
    },
  },
} satisfies ExpoConfig;
