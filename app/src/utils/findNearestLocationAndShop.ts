import { getMatrixDrivingCar } from "@/api/matrixDrivingCar";
import type { City, CityStore, Coordinates, Location } from "@/types";

/**
 * Модуль для работы с геолокацией, поиска ближайших локаций и расчета расстояний.
 * @module location-utils
 */

// Коэффициент извилистости дорог (примерное значение, может варьироваться в зависимости от региона)
const ROAD_CURVATURE_FACTOR = 1.3;
// Радиус Земли в метрах
const RADIUS_OF_EARTH = 6371000;

/**
 * Преобразует градусы в радианы.
 * @param {number} deg - Угол в градусах.
 * @returns {number} Угол в радианах.
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Рассчитывает расстояние между двумя точками на сфере (Земле) с учетом коэффициента извилистости дорог.
 * @param {Coordinates} coord1 - Координаты первой точки.
 * @param {Coordinates} coord2 - Координаты второй точки.
 * @returns {number} Расстояние в метрах.
 */
function calculateHaversineDistance(
  coord1: Coordinates,
  coord2: Coordinates,
): number {
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Применяем коэффициент извилистости
  return RADIUS_OF_EARTH * c * ROAD_CURVATURE_FACTOR;
}

/**
 * Находит N ближайших локаций к заданной точке.
 * @param {Coordinates} userLocation - Координаты пользователя.
 * @param {Location[]} locations - Массив локаций для поиска.
 * @param {number} n - Количество ближайших локаций для возврата.
 * @returns {Location[]} Массив N ближайших локаций.
 */
function findTopNClosest(
  userLocation: Coordinates,
  locations: Location[] = [],
  n: number,
): Location[] {
  return locations
    .map((location) => ({
      ...location,
      estimatedDistance: calculateHaversineDistance(
        userLocation,
        location.coordinates,
      ),
    }))
    .sort((a, b) => a.estimatedDistance - b.estimatedDistance)
    .slice(0, n);
}

/**
 * Рассчитывает матрицу расстояний между точкой отсчета и набором точек назначения.
 * @param {Coordinates} origin - Координаты точки отсчета.
 * @param {Location[]} destinations - Массив точек назначения.
 * @returns {Promise<number[]>} Массив расстояний в метрах.
 */
async function calculateMatrixDistances(
  origin: Coordinates,
  destinations: Location[],
) {
  const coordinates = [
    [origin.longitude, origin.latitude],
    ...destinations.map((dest) => [
      dest.coordinates.longitude,
      dest.coordinates.latitude,
    ]),
  ];

  try {
    const response = await getMatrixDrivingCar({
      locations: coordinates,
      sources: [0],
      destinations: Array.from(
        { length: destinations.length },
        (_, i) => i + 1,
      ),
    });

    return response.data.durations[0];
  } catch (error) {
    console.error("Error calculating matrix distances:", error);
    throw error;
  }
}

/**
 * Проверяет, находится ли точка внутри многоугольника.
 * @param {Coordinates} point - Координаты проверяемой точки.
 * @param {Coordinates[]} polygon - Массив координат, определяющих многоугольник.
 * @returns {boolean} true, если точка находится внутри многоугольника, иначе false.
 */
function isPointInPolygon(point: Coordinates, polygon: Coordinates[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].longitude,
      yi = polygon[i].latitude;
    const xj = polygon[j].longitude,
      yj = polygon[j].latitude;

    const intersect =
      yi > point.latitude !== yj > point.latitude &&
      point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Форматирует расстояние из метров в удобочитаемый формат.
 * @param {number} meters - Расстояние в метрах.
 * @returns {string} Отформатированное расстояние (в км или м).
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} км`;
  }
  return `${meters.toFixed(0)} м`;
}

/**
 * Находит ближайшие локации (город и магазин) относительно заданных координат пользователя.
 * @param {Coordinates} userLocation - Координаты пользователя.
 * @param {City[]} cities - Массив городов.
 * @param {CityStore[]} stores - Массив магазинов.
 * @returns {Promise<Object>} Объект с информацией о ближайших локациях.
 */
export async function findNearestLocations(
  userLocation: Coordinates,
  cities: City[] = [],
  stores: CityStore[] = [],
) {
  const MAX_CANDIDATES = 10;
  const EXTRA_CANDIDATES_FACTOR = 1.5;

  // Предварительная фильтрация
  const closestCities = findTopNClosest(
    userLocation,
    cities,
    Math.ceil(MAX_CANDIDATES * EXTRA_CANDIDATES_FACTOR),
  );
  const closestStores = findTopNClosest(
    userLocation,
    stores,
    Math.ceil(MAX_CANDIDATES * EXTRA_CANDIDATES_FACTOR),
  );

  const candidateLocations = [...closestCities, ...closestStores];

  // Расчет точных расстояний через API
  const distances = await calculateMatrixDistances(
    userLocation,
    candidateLocations,
  );

  let nearestCity: City | null = null;
  let nearestStore: CityStore | null = null;
  let nearestStoreInZone: CityStore | null = null;
  let minCityDistance = Infinity;
  let minStoreDistance = Infinity;
  let minStoreInZoneDistance = Infinity;

  distances.forEach((distance, index) => {
    const location = candidateLocations[index];

    if ("deliveryZone" in location) {
      // Это магазин
      const store = location as CityStore;
      const isInZone = isPointInPolygon(
        userLocation,
        store.deliveryZone.polygon,
      );

      if (distance < minStoreDistance) {
        minStoreDistance = distance;
        nearestStore = store;
      }

      if (isInZone && distance < minStoreInZoneDistance) {
        minStoreInZoneDistance = distance;
        nearestStoreInZone = store;
      }
    } else {
      // Это город
      if (distance < minCityDistance) {
        minCityDistance = distance;
        nearestCity = location as City;
      }
    }
  });

  const isInDeliveryZone = !!nearestStoreInZone;

  // Если есть магазин в зоне доставки, используем его, иначе используем ближайший магазин
  const finalNearestStore = nearestStoreInZone || nearestStore;
  const finalStoreDistance = nearestStoreInZone
    ? minStoreInZoneDistance
    : minStoreDistance;

  return {
    nearestCity,
    cityDistance: minCityDistance,
    nearestStore: finalNearestStore,
    storeDistance: finalStoreDistance,
    isInDeliveryZone,
    nearestStoreOutsideZone: isInDeliveryZone ? nearestStore : null,
    distanceToNearestStoreOutsideZone: isInDeliveryZone
      ? minStoreDistance
      : null,
  };
}
