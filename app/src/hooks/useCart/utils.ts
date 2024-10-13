import type { Product } from "@/types";
import { Store } from "@/hooks/useCart/types";

export function getMeta(
  products: Product[] = [],
): Pick<Store, "isCartEmpty" | "totalCount" | "totalPrice"> {
  const totalCount = products.length;
  const isCartEmpty = products.length === 0;

  const totalPrice = products.reduce((acc, { price }) => {
    acc += price;
    return acc;
  }, 0);

  return {
    totalCount: totalCount,
    totalPrice: totalPrice,
    isCartEmpty: isCartEmpty,
  };
}
