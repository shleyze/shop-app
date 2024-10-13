import type { Product } from "@/types";

export type Store = {
  products: Product[];
  isCartEmpty: boolean;
  totalCount: number;
  totalPrice: number;
  actions: {
    addProductToCart: (product: Product) => void;
    removeProductFromCart: (product: Product) => void;
    resetCart: () => void;
  };
};
