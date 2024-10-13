import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export async function getCurrentLocation() {
  const { status } = await requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return Promise.reject("Доступ к локации ограничен");
  }

  return getCurrentPositionAsync();
}
