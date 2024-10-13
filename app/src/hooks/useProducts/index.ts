import { useQuery } from "@tanstack/react-query";

import { getProducts, type GetProductsApiRequest } from "@/api/products";

export function useProductsQuery({
  storeId,
  categoryId,
  limit,
}: GetProductsApiRequest) {
  return useQuery({
    queryKey: ["products", storeId, categoryId, limit],
    queryFn: () => getProducts({ storeId, categoryId, limit }),
    enabled: !!storeId && !!categoryId,
  });
}
