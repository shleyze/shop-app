import type { Coordinates } from "@/types";

/**
 * Рассчитывает регион карты для отображения нескольких локаций.
 *
 * @param locations - Массив координат точек
 * @param paddingFactor - Коэффициент отступа (1 = без отступа, >1 = с отступом). По умолчанию 1.1
 * @returns Объект с параметрами региона карты
 */
export function calculateMapRegionForMultipleLocations(
  locations: Coordinates[] = [],
  paddingFactor: number = 1.1,
): {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} {
  // Находим минимальные и максимальные координаты
  const minLat = Math.min(...locations.map((l) => l.latitude));
  const maxLat = Math.max(...locations.map((l) => l.latitude));
  const minLon = Math.min(...locations.map((l) => l.longitude));
  const maxLon = Math.max(...locations.map((l) => l.longitude));

  // Вычисляем центр
  const centerLat = (minLat + maxLat) / 2;
  const centerLon = (minLon + maxLon) / 2;

  // Вычисляем дельты
  let latitudeDelta = (maxLat - minLat) * paddingFactor;
  let longitudeDelta = (maxLon - minLon) * paddingFactor;

  // Корректируем longitudeDelta с учетом широты
  const latitudeCorrection = Math.cos(centerLat * (Math.PI / 180));
  longitudeDelta /= latitudeCorrection;

  // Обеспечиваем минимальный размер области просмотра
  const minDelta = 0.01;
  latitudeDelta = Math.max(latitudeDelta, minDelta);
  longitudeDelta = Math.max(longitudeDelta, minDelta);

  // Обеспечиваем, чтобы область не была слишком вытянутой
  const aspectRatio = 1.5; // Желаемое соотношение сторон (высота / ширина)
  if (latitudeDelta / longitudeDelta > aspectRatio) {
    longitudeDelta = latitudeDelta / aspectRatio;
  } else if (longitudeDelta / latitudeDelta > aspectRatio) {
    latitudeDelta = longitudeDelta / aspectRatio;
  }

  return {
    latitude: centerLat,
    longitude: centerLon,
    latitudeDelta,
    longitudeDelta,
  };
}

/**
 * Рассчитывает регион карты для отображения одной локации.
 *
 * @param location - Координаты центральной точки
 * @param zoomLevel - Уровень зума (чем меньше число, тем больше область). По умолчанию 0.01
 * @returns Объект с параметрами региона карты
 */
export function calculateMapRegionForLocation(
  location: Coordinates,
  zoomLevel: number = 0.01,
) {
  // Убедимся, что zoomLevel не равен нулю
  const zoom = Math.max(zoomLevel, 0.001);

  // Рассчитаем дельты с учетом широты
  const latitudeDelta = zoom;
  const longitudeDelta = zoom * Math.cos(location.latitude * (Math.PI / 180));

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };
}
