import { ScrollView, View } from "react-native";

import { Category } from "@/components/Category";
import { useCategoriesQuery } from "@/hooks/useCategories";
import { Loader } from "@/components/Loader";

export default function Page() {
  const categoriesQuery = useCategoriesQuery();

  return (
    <>
      <Loader loading={categoriesQuery.isLoading} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            gap: 32,
          }}
        >
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
      </ScrollView>
    </>
  );
}
