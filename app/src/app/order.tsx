import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme, Divider, Button } from "@ui-kitten/components";
import { useMemo } from "react";

import { useCart } from "@/hooks/useCart";
import { groupAndCountProducts } from "@/utils/groupAndCountProducts";
import { formatPrice } from "@/utils/formatPrice";
import { useOrderModal } from "@/features/OrderModal";

export default function Page() {
  const theme = useTheme();

  const cartProducts = useCart((state) => state.products);
  const totalPrice = useCart((state) => state.totalPrice);

  const groupedProducts = useMemo(
    () => Object.values(groupAndCountProducts(cartProducts).products),
    [cartProducts],
  );

  const handleAddToCart = useCart((state) => state.actions.addProductToCart);
  const handleRemoveProductFromCart = useCart(
    (state) => state.actions.removeProductFromCart,
  );

  const handleOrderModalOpen = useOrderModal(
    (state) => state.actions.setModalOpen,
  );

  return (
    <>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 16 }}>
          {groupedProducts?.map(({ product, count }) => {
            return (
              <View
                key={product.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text category="s1">{product.name}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (count === 1) {
                        Alert.alert(
                          `Вы действительно хотите удалить "${product.name}" из корзины?`,
                          undefined,
                          [
                            {
                              text: "Удалить",
                              onPress: () =>
                                handleRemoveProductFromCart(product),
                            },
                            {
                              text: "Отмена",
                            },
                          ],
                        );
                      } else {
                        handleRemoveProductFromCart(product);
                      }
                    }}
                  >
                    <Icon
                      name="minus-outline"
                      fill={theme["color-primary-600"]}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                  <Text>{count}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddToCart(product);
                    }}
                  >
                    <Icon
                      name="plus-outline"
                      fill={theme["color-primary-600"]}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ minWidth: 100, textAlign: "right" }}>
                    {formatPrice(product.price * count)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <Divider style={{ marginVertical: 16 }} />
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "flex-end",
            alignItems: "baseline",
            paddingHorizontal: 16,
          }}
        >
          <Text category="s1">Итого:</Text>
          <Text category="h6">{formatPrice(totalPrice)}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: "auto",
        }}
      >
        <Button onPress={handleOrderModalOpen}>Оформить заказ</Button>
      </View>
    </>
  );
}
