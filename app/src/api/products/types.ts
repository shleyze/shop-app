import type {
  AdminResponseSuccessItem,
  AdminResponseSuccessList,
  Category,
  CityStore,
  Product,
} from "@/types";

export type GetProductsApiRequest = {
  storeId: CityStore["id"];
  categoryId?: Category["id"];
  limit?: number;
};
export type GetProductsApiResponseSuccess = AdminResponseSuccessList<Product>;
export type GetProductsApiResponseFailure = {};

export type GetProductApiRequest = {
  productId: Product["id"];
};
export type GetProductApiResponseSuccess = AdminResponseSuccessItem<Product>;
export type GetProductApiResponseFailure = {};
