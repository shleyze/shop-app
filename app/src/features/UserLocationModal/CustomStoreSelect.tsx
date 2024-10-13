import { ScrollView, View } from "react-native";
import { useCallback, memo } from "react";
import { Card, Text, List, ListItem } from "@ui-kitten/components";

import type { CityStore } from "@/types";
import { useAvailableCitiesAndStores } from "@/hooks/useAvailableCitiesAndStores";

import type { CustomStoreSelectProps } from "./types";

export const CustomStoreSelect = memo((props: CustomStoreSelectProps) => {
  const { cities } = useAvailableCitiesAndStores();

  const handleSelectStore = useCallback(
    (id: CityStore["id"]) => {
      props?.onStoreSelect?.(id);
    },
    [props?.onStoreSelect],
  );

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <ScrollView>
        {cities?.map(({ id, name, stores }) => {
          return (
            <Card
              key={id}
              header={(props) => (
                <View {...props}>
                  <Text category="h6">{name}</Text>
                </View>
              )}
              appearance="filled"
            >
              <List
                data={stores}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    title={item.name}
                    description={item.address}
                    onPress={() => {
                      handleSelectStore(item.id);
                    }}
                  />
                )}
                scrollEnabled={false}
              />
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
});
