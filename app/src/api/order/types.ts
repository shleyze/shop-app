import type { FormData } from "@/features/Order/types";
import type {
  CityStore,
  Order,
  Product,
  AdminResponseSuccessList,
} from "@/types";

export type CreateOrderApiRequest = FormData & {
  store: CityStore["id"];
  items: {
    product: Product["id"];
    quantity: number;
  }[];
};
export type CreateOrderApiResponseFailure = {};
export type CreateOrderApiResponseSuccess = {
  doc: Order;
};

export type GetOrderApiRequest = {
  orderNumbers: Order["orderNumber"][];
};
export type GetOrderApiResponseSuccess = AdminResponseSuccessList<Order>;
export type GetOrderApiResponseFailure = {};
