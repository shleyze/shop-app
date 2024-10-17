import { View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import { Product } from "./Product";
import { ProductsProps } from "./types";

export function Products({ products = [] }: ProductsProps) {
  const isPlaceholder = products?.length === 0;
  const theme = useTheme();

  return (
    <View>
      {isPlaceholder ? (
        <View
          style={{
            flexGrow: 1,
            width: "100%",
            gap: 16,
            flexDirection: "row",
          }}
        >
          {[1, 2].map((i) => {
            return (
              <View
                style={{
                  flexGrow: 1,
                }}
                key={i}
              >
                <View
                  style={{
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                    backgroundColor: theme["color-basic-300"],
                    borderRadius: 16,
                  }}
                />
                <View style={{ paddingTop: 8, gap: 4 }}>
                  <View
                    style={{
                      height: 20,
                      width: "70%",
                      backgroundColor: theme["color-basic-400"],
                      borderRadius: 8,
                    }}
                  />
                  <View
                    style={{
                      height: 18,
                      width: "40%",
                      backgroundColor: theme["color-basic-400"],
                      borderRadius: 8,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      ) : (
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
      )}
    </View>
  );
}
