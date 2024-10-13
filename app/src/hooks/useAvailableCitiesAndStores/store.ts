import { createPersistStore } from "@/store";

import type { Store } from "./types";

export const useStore = createPersistStore<Store, Pick<Store, "cities">>(
  "auth",
  (setState, getState, store) => {
    return {
      cities: [
        {
          name: "Москва",
          coordinates: {
            latitude: 55.7558,
            longitude: 37.6173,
          },
          id: 1,
          stores: [
            {
              name: "ГУМ",
              address: "Красная площадь, 3",
              coordinates: { latitude: 55.7546, longitude: 37.6215 },
              deliveryZone: {
                polygon: [
                  { latitude: 55.751, longitude: 37.613 },
                  { latitude: 55.768, longitude: 37.613 },
                  { latitude: 55.77, longitude: 37.63 },
                  { latitude: 55.763, longitude: 37.65 },
                  { latitude: 55.754, longitude: 37.66 },
                  { latitude: 55.746, longitude: 37.65 },
                  { latitude: 55.743, longitude: 37.63 },
                ],
              },
              id: 1,
            },
            {
              name: "Универмаг «Цветной»",
              address: "Цветной бульвар, 15с1",
              coordinates: { latitude: 55.7714, longitude: 37.6208 },
              deliveryZone: {
                polygon: [
                  { latitude: 55.768, longitude: 37.613 },
                  { latitude: 55.785, longitude: 37.62 },
                  { latitude: 55.79, longitude: 37.64 },
                  { latitude: 55.785, longitude: 37.66 },
                  { latitude: 55.77, longitude: 37.665 },
                  { latitude: 55.763, longitude: 37.65 },
                  { latitude: 55.77, longitude: 37.63 },
                ],
              },
              id: 2,
            },
            {
              name: "Елисеевский магазин",
              address: "ул. Тверская, 14",
              coordinates: { latitude: 55.7599, longitude: 37.6096 },
              deliveryZone: {
                polygon: [
                  { latitude: 55.751, longitude: 37.59 },
                  { latitude: 55.768, longitude: 37.613 },
                  { latitude: 55.751, longitude: 37.613 },
                  { latitude: 55.743, longitude: 37.63 },
                  { latitude: 55.735, longitude: 37.61 },
                ],
              },
              id: 3,
            },
            {
              name: "Магазин «Перекресток»",
              address: "ул. Профсоюзная, 126, корп. 3",
              coordinates: { latitude: 55.6245, longitude: 37.5142 },
              deliveryZone: {
                polygon: [
                  { latitude: 55.64, longitude: 37.5 },
                  { latitude: 55.65, longitude: 37.52 },
                  { latitude: 55.64, longitude: 37.54 },
                  { latitude: 55.62, longitude: 37.54 },
                  { latitude: 55.61, longitude: 37.52 },
                  { latitude: 55.62, longitude: 37.5 },
                ],
              },
              id: 4,
            },
            {
              name: "ТЦ «Золотой Вавилон»",
              address: "пр-т Мира, 211, корп. 2",
              coordinates: { latitude: 55.8449, longitude: 37.6656 },
              deliveryZone: {
                polygon: [
                  { latitude: 55.86, longitude: 37.65 },
                  { latitude: 55.87, longitude: 37.67 },
                  { latitude: 55.86, longitude: 37.69 },
                  { latitude: 55.84, longitude: 37.69 },
                  { latitude: 55.83, longitude: 37.67 },
                  { latitude: 55.84, longitude: 37.65 },
                ],
              },
              id: 5,
            },
          ],
        },
      ],
    };
  },
  {
    partialize(state) {
      return {
        cities: state.cities,
      };
    },
  },
);
