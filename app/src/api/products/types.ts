import type {
  AdminResponseSuccess,
  Category,
  CityStore,
  Product,
} from "@/types";

export type GetProductsApiRequest = {
  storeId: CityStore["id"];
  categoryId?: Category["id"];
  limit?: number;
};
export type GetProductsApiResponseSuccess = AdminResponseSuccess<Product>;
export type GetProductsApiResponseFailure = {};
