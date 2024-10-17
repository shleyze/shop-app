import type { FormData } from "@/features/Order/types";
import type { CityStore, Product } from "@/types";

export type CreateOrderApiRequest = FormData &
  {
    store: CityStore["id"];
    items: {
      product: Product["id"];
      quantity: number;
    };
  }[];
export type CreateOrderApiResponseFailure = {};
export type CreateOrderApiResponseSuccess = {
  doc: {
    orderNumber: "0WUTO9";
  };
};
