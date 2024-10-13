import { View } from "react-native";

import { useProductsQuery } from "@/hooks/useProducts";
import { useUserStore } from "@/hooks/useUser";

import { Product } from "./Product";
import { ProductsProps } from "./types";

export function Products({ products = [] }: ProductsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flex: 1,
        marginHorizontal: -8,
        rowGap: 16,
      }}
    >
      {products.map((product) => {
        return (
          <View key={product.id} style={{ width: "50%" }}>
            <View style={{ paddingHorizontal: 8 }}>
              <Product product={product} />
            </View>
          </View>
        );
      })}
    </View>
  );
}
