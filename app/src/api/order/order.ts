import { client } from "@/api";

import type {
  CreateOrderApiRequest,
  CreateOrderApiResponseFailure,
  CreateOrderApiResponseSuccess,
} from "./types";

export async function createOrder(data: CreateOrderApiRequest) {
  return client.post<
    CreateOrderApiResponseFailure,
    CreateOrderApiResponseSuccess
  >("orders", data);
}
