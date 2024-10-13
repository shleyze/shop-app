import type { GenericAbortSignal } from "axios";

import { client } from "@/api";

import type {
  GetProductsApiRequest,
  GetProductsApiResponseSuccess,
  GetProductsApiResponseFailure,
} from "./types";

export async function getProducts(
  { storeId, categoryId, limit }: GetProductsApiRequest,
  signal?: GenericAbortSignal,
) {
  return client.get<
    GetProductsApiResponseFailure,
    GetProductsApiResponseSuccess
  >("products", {
    signal,
    params: {
      where: {
        stores: {
          contains: storeId,
        },
        category: {
          equals: categoryId,
        },
      },
      limit,
    },
  });
}
