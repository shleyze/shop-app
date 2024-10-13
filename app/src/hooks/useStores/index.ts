import { useQuery } from "@tanstack/react-query";

import { getStores } from "@/api/stores";

export function useStoresQuery() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });
}
