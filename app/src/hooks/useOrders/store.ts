import { createPersistStore } from "@/store";

import type { Store } from "./types";

export const useOrdersStore = createPersistStore<Store, Pick<Store, "orders">>(
  "orders",
  (setState, getState, store) => {
    return {
      orders: [],
      actions: {
        addOrder(orderId) {
          setState(
            (prevState) => {
              const nextOrders = [orderId, ...prevState.orders];

              return { orders: nextOrders };
            },
            false,
            "addOrder",
          );
        },
      },
    };
  },
  {
    partialize(state) {
      return {
        orders: state.orders,
      };
    },
  },
);
