import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

/**
 * Запрашивает разрешение на доступ к геолокации и возвращает текущее местоположение устройства.
 *
 * @async
 * @function getCurrentLocation
 * @returns {Promise<LocationObject>} Объект с информацией о текущем местоположении.
 * @throws {Error} Если доступ к геолокации не предоставлен пользователем.
 *
 */

export async function getCurrentLocation() {
  const { status } = await requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return Promise.reject("Доступ к локации ограничен");
  }

  return getCurrentPositionAsync();
}
