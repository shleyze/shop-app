import type { GroupedProduct, Product } from "@/types";

export function groupAndCountProducts(
  products: ReadonlyArray<Product>,
): GroupedProduct {
  const initialResult: GroupedProduct = {
    products: {},
  };

  return products.reduce((acc, product) => {
    const existingProduct = acc.products[product.id];

    const updatedProducts = {
      ...acc.products,
      [product.id]: {
        product,
        count: (existingProduct?.count || 0) + 1,
      },
    };

    return {
      products: updatedProducts,
    };
  }, initialResult);
}
