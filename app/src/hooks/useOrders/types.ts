import type { Order } from "@/types";

export type Store = {
  orders: Order["orderNumber"][];

  actions: {
    addOrder: (orderNumber: Order["orderNumber"]) => void;
  };
};
