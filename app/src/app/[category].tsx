import { ScrollView, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";

import { Products } from "@/components/Products";
import { useProductsQuery } from "@/hooks/useProducts";
import { useUserStore } from "@/hooks/useUser";
import { useCategoriesQuery } from "@/hooks/useCategories";
import { useMemo } from "react";

export default function CategoryPage() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoriesQuery = useCategoriesQuery();
  const storeId = useUserStore((state) => state.storeId);

  const productsQuery = useProductsQuery({
    storeId: storeId!,
    categoryId: category!,
    limit: 100,
  });

  const currentCategory = useMemo(() => {
    return categoriesQuery.data?.docs.find((item) => item.id === category);
  }, [categoriesQuery.data, category]);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <View style={{ gap: 8 }}>
          <Text category="h2">{currentCategory?.name}</Text>
          <Text category="s1" appearance="hint">
            {currentCategory?.description}
          </Text>
        </View>
        <Products products={productsQuery.data?.docs} />
      </View>
    </ScrollView>
  );
}
