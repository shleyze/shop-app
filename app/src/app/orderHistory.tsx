import { ScrollView, View } from "react-native";
import { Text, Divider, useTheme } from "@ui-kitten/components";
import { Fragment } from "react";

import { useOrdersQuery, useOrdersStore } from "@/hooks/useOrders";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  getStatusLabel,
} from "@/utils/getLabel";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderHistoryPage() {
  const orders = useOrdersStore((state) => state.orders);

  const ordersQuery = useOrdersQuery({ orderNumbers: orders });

  return (
    <>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <ScrollView>
          <View style={{ padding: 16, gap: 36 }}>
            {ordersQuery.data?.docs?.map((order, index) => {
              return (
                <Fragment key={order.id}>
                  {index > 0 && <Divider />}
                  <View style={{ gap: 8 }}>
                    <Text category="h5">#{order.orderNumber}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <Text category="s1">Статус</Text>
                      <Text>{getStatusLabel(order.status)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <Text category="s1">Статус оплаты</Text>
                      <Text>{getPaymentStatusLabel(order.paymentStatus)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <Text category="s1">Способ оплаты</Text>
                      <Text>{getPaymentMethodLabel(order.paymentMethod)}</Text>
                    </View>
                    <Divider
                      style={{
                        width: "50%",
                        marginHorizontal: "auto",
                        marginVertical: 8,
                      }}
                    />
                    <View style={{ gap: 12 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        <Text category="s1">Магазин:</Text>
                        <Text>
                          <Text>{order.store.name}, </Text>
                          <Text appearance="hint">{order.store.name}</Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 4,
                        }}
                      >
                        <Text category="s1">Адрес доставки:</Text>
                        <Text>{order.shippingAddress}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        <Text category="s1">Номер телефона:</Text>
                        <Text>{order.phoneNumber}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        <Text category="s1">Почта:</Text>
                        <Text>{order.email}</Text>
                      </View>
                    </View>
                    <Divider
                      style={{
                        width: "50%",
                        marginHorizontal: "auto",
                        marginVertical: 8,
                      }}
                    />
                    <View style={{ gap: 8 }}>
                      {order?.items?.map(({ id, quantity, product }) => {
                        return (
                          <View
                            key={id}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Text>{product.name}</Text>
                            <View style={{ flexDirection: "row", gap: 16 }}>
                              <Text>{quantity}</Text>
                              <Text
                                style={{ minWidth: 70, textAlign: "right" }}
                              >
                                {formatPrice(product?.price)}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        justifyContent: "flex-end",
                        alignItems: "baseline",
                        paddingTop: 8,
                      }}
                    >
                      <Text category="s1">Итого:</Text>
                      <Text category="h6">{formatPrice(order?.total)}</Text>
                    </View>
                  </View>
                </Fragment>
              );
            })}
          </View>
        </ScrollView>
        <Footer hasOffset={false} />
      </View>
      <Loader loading={ordersQuery.isLoading} />
    </>
  );
}
