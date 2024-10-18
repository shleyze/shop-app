import { client } from "@/api";

import type {
  CreateOrderApiRequest,
  CreateOrderApiResponseFailure,
  CreateOrderApiResponseSuccess,
  GetOrderApiRequest,
  GetOrderApiResponseSuccess,
  GetOrderApiResponseFailure,
} from "./types";

export async function createOrder(data: CreateOrderApiRequest) {
  return client.post<
    CreateOrderApiResponseFailure,
    CreateOrderApiResponseSuccess
  >("orders", data);
}

export async function getOrders({ orderNumbers }: GetOrderApiRequest) {
  return client.get<GetOrderApiResponseFailure, GetOrderApiResponseSuccess>(
    "orders",
    {
      params: {
        where: {
          orderNumber: {
            in: orderNumbers,
          },
        },
      },
    },
  );
}
