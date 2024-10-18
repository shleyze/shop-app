import type { GenericAbortSignal } from "axios";

import { client } from "@/api";

import type {
  GetProductsApiRequest,
  GetProductsApiResponseSuccess,
  GetProductsApiResponseFailure,
  GetProductApiRequest,
  GetProductApiResponseSuccess,
  GetProductApiResponseFailure,
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

export async function getProduct(
  { productId }: GetProductApiRequest,
  signal?: GenericAbortSignal,
) {
  return client.get<GetProductApiResponseFailure, GetProductApiResponseSuccess>(
    `products/${productId}`,
    {
      signal,
    },
  );
}
