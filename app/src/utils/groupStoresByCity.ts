import type { CityStore, GroupedStores } from "@/types";

export function groupStoresByCity(stores: CityStore[] = []): GroupedStores {
  const groupedStores: GroupedStores = {};

  stores.forEach((store) => {
    const cityId = store.city.id;
    if (!groupedStores[cityId]) {
      groupedStores[cityId] = {
        city: store.city,
        stores: [],
      };
    }

    groupedStores[cityId].stores.push(store);
  });
  return groupedStores;
}
