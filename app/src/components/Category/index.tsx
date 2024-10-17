import { Text, Button } from "@ui-kitten/components";
import { View } from "react-native";
import { Link } from "expo-router";

import { Products } from "@/components/Products";
import { useUserStore } from "@/hooks/useUser";
import { useProductsQuery } from "@/hooks/useProducts";

import type { CategoryProps } from "./types";
import { PRODUCTS_LIMIT } from "./constants";

export function Category({ id, title, limit = PRODUCTS_LIMIT }: CategoryProps) {
  const storeId = useUserStore((state) => state.storeId);
  const productsQuery = useProductsQuery({
    storeId: storeId!,
    categoryId: id,
    limit,
  });

  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Text category="h6">{title}</Text>
        {productsQuery.data?.totalDocs &&
        productsQuery.data?.totalDocs > PRODUCTS_LIMIT ? (
          <Link
            href={{
              pathname: "/[category]",
              params: { category: id || "recommendations" },
            }}
            asChild
          >
            <Button size="tiny" appearance="outline" status={"primary"}>
              Посмотреть все
            </Button>
          </Link>
        ) : null}
      </View>
      <View>
        <Products products={productsQuery.data?.docs} />
      </View>
    </View>
  );
}
