import { useStore } from "./store";
import { useMemo } from "react";

export function useAvailableCitiesAndStores() {
  const cities = useStore((state) => state.cities);

  const stores = useMemo(() => {
    return cities.map((city) => city.stores).flat();
  }, [cities]);

  return { cities, stores };
}
