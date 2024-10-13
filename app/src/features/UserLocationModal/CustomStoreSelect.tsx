import { ScrollView, View } from "react-native";
import { useCallback, memo, useMemo } from "react";
import { Card, Text, List, ListItem } from "@ui-kitten/components";

import type { CityStore } from "@/types";
import { useStoresQuery } from "@/hooks/useStores";
import { groupStoresByCity } from "@/utils/groupStoresByCity";

import type { CustomStoreSelectProps } from "./types";

export const CustomStoreSelect = memo((props: CustomStoreSelectProps) => {
  const storesQuery = useStoresQuery();
  const groups = useMemo(
    () => Object.values(groupStoresByCity(storesQuery.data?.docs)),
    [storesQuery.data?.docs],
  );

  const handleSelectStore = useCallback(
    (id: CityStore["id"]) => {
      props?.onStoreSelect?.(id);
    },
    [props?.onStoreSelect],
  );

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <ScrollView>
        {groups.map(({ city, stores }) => {
          return (
            <Card
              key={city.id}
              header={(props) => (
                <View {...props}>
                  <Text category="h6">{city.name}</Text>
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
