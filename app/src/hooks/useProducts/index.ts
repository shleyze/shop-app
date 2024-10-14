import { useQuery } from "@tanstack/react-query";

import { getProducts, type GetProductsApiRequest } from "@/api/products";

/**
 * Хук для получения списка продуктов с использованием React Query.
 *
 * @param {Object} params - Параметры запроса продуктов.
 * @param {string} params.storeId - ID магазина, для которого запрашиваются продукты.
 * @param {string} [params.categoryId] - ID категории для фильтрации продуктов (опционально).
 * @param {number} [params.limit] - Ограничение количества возвращаемых продуктов (опционально).
 *
 * @returns {UseQueryResult} Результат выполнения запроса, включая данные, статус загрузки и ошибки.
 *
 * @example
 * const { data, isLoading, error } = useProductsQuery({ storeId: '123', categoryId: '456', limit: 10 });
 *
 * @remarks
 * - Запрос выполняется только если предоставлен storeId (enabled: !!storeId).
 * - Кэш запроса инвалидируется при изменении storeId, categoryId или limit.
 */
export function useProductsQuery({
  storeId,
  categoryId,
  limit,
}: GetProductsApiRequest) {
  return useQuery({
    queryKey: ["products", storeId, categoryId, limit],
    queryFn: () => getProducts({ storeId, categoryId, limit }),
    enabled: !!storeId,
  });
}
