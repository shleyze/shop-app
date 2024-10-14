import { createPersistStore } from "@/store";

import type { Store } from "./types";
import { getMeta } from "@/hooks/useCart/utils";

export const useCart = createPersistStore<Store, Pick<Store, "products">>(
  "cart",
  (setState, getState, store) => {
    return {
      products: [],
      isCartEmpty: true,
      totalCount: 0,
      totalPrice: 0,
      actions: {
        addProductToCart(product) {
          setState(
            (prevState) => {
              const nextProducts = [...prevState.products, product];

              return { products: nextProducts, ...getMeta(nextProducts) };
            },
            false,
            "addProductToCart",
          );
        },

        removeProductFromCart(product) {
          setState(
            (prevState) => {
              const firstIndex = prevState.products.findIndex(
                (item) => item.id === product.id,
              );
              const nextProducts = prevState.products.filter(
                (_, index) => index !== firstIndex,
              );
              return {
                products: nextProducts,
                ...getMeta(nextProducts),
              };
            },
            false,
            "removeProductFromCart",
          );
        },

        resetCart() {
          const initialState = store.getInitialState();

          setState(initialState, false, "resetCart");
        },
      },
    };
  },
  {
    partialize(state) {
      return {
        products: state.products,
        isCartEmpty: state.isCartEmpty,
        totalCount: state.totalCount,
        totalPrice: state.totalPrice,
      };
    },
  },
);
