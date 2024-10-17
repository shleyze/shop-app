import { Text, Divider } from "@ui-kitten/components";
import { View } from "react-native";

import type { FooterProps } from "./types";

export function Footer({ hasOffset = true }: FooterProps) {
  return (
    <View style={{ padding: 16 }}>
      <Divider style={{ marginBottom: 16 }} />
      <View style={{ paddingRight: hasOffset ? 150 : 0 }}>
        <Text category="c1" appearance="hint">
          Зона, время, товары и предложения доставки ограничены.
        </Text>
        <Text category="c1" appearance="hint">
          Организатор, продавец ООО «Рога и Копыта» ОГРН 112233445566, 123456,
          Москва, ул. Барклая, д. 8.
        </Text>
      </View>
    </View>
  );
}
