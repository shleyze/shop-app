import { ScrollView, View } from "react-native";

import { Category } from "@/components/Category";
import { useCategoriesQuery } from "@/hooks/useCategories";
import { Loader } from "@/components/Loader";
import { Footer } from "@/components/Footer";

export default function Page() {
  const categoriesQuery = useCategoriesQuery();

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
            gap: 32,
          }}
        >
          <Category title="Рекомендации" />
          {categoriesQuery.data?.docs.map((category) => {
            return (
              <Category
                key={category.id}
                id={category.id}
                title={category.name}
              />
            );
          })}
        </View>
        <Footer />
      </ScrollView>
      <Loader loading={categoriesQuery.isLoading} />
    </View>
  );
}
