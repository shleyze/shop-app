import { ScrollView, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import { Products } from "@/components/Products";
import { useProductsQuery } from "@/hooks/useProducts";
import { useUserStore } from "@/hooks/useUser";
import { useCategoriesQuery } from "@/hooks/useCategories";
import { Footer } from "@/components/Footer";

export default function CategoryPage() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoriesQuery = useCategoriesQuery();
  const storeId = useUserStore((state) => state.storeId);
  const isRecommendations = category === "recommendations";

  const productsQuery = useProductsQuery({
    storeId: storeId!,
    categoryId: isRecommendations ? undefined : category,
    limit: 100,
  });

  const currentCategory = useMemo(() => {
    return categoriesQuery.data?.docs.find((item) => item.id === category);
  }, [categoriesQuery.data, category]);

  return (
    <View style={{ flex: 1, flexGrow: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            paddingHorizontal: 16,
            gap: 16,
          }}
        >
          <View style={{ gap: 8 }}>
            <Text category="h2">
              {isRecommendations ? "Рекомендации" : currentCategory?.name}
            </Text>
            <Text category="s1" appearance="hint">
              {isRecommendations
                ? "Мы собрали для вас самые популярные блюда"
                : currentCategory?.description}
            </Text>
          </View>

          <Products products={productsQuery.data?.docs} />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
