import { useQuery } from "@tanstack/react-query";

import { getProduct, type GetProductApiRequest } from "@/api/products";

/**
 * Хук для получения списка продуктов с использованием React Query.
 *
 * @param {Object} params - Параметры запроса продуктов.
 * @param {string} params.productId - Id продукта.
 *
 * @returns {UseQueryResult} Результат выполнения запроса, включая данные, статус загрузки и ошибки.
 *
 * @example
 * const { data, isLoading, error } = useProductQuery({ productId: '123' });
 *
 * @remarks
 * - Запрос выполняется только если предоставлен storeId (enabled: !!productId).
 * - Кэш запроса инвалидируется при изменении storeId, categoryId или limit.
 */
export function useProductQuery({ productId }: GetProductApiRequest) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct({ productId }),
    enabled: !!productId,
  });
}
