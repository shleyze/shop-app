import {
  Text,
  Select,
  SelectItem,
  Button,
  Input,
  Divider,
  Icon,
  IndexPath,
  useTheme,
} from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";

import { groupAndCountProducts } from "@/utils/groupAndCountProducts";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { FormData } from "@/features/Order/types";
import { useUserStore } from "@/hooks/useUser";
import { useCreateOrder } from "@/hooks/useOrders";

import { schema } from "./schema";
import { paymentMethods } from "./data";

export function Order() {
  const [state, setState] = useState<{
    paymentMethodIndex: IndexPath;
  }>({
    paymentMethodIndex: new IndexPath(0),
  });

  const storeId = useUserStore((state) => state.storeId);
  const userOrderInfo = useUserStore((state) => state.userOrderInfo);
  const handleSetUserOrderInfo = useUserStore(
    (state) => state.actions.setUserOrderInfo,
  );

  const cartProducts = useCart((state) => state.products);
  const totalPrice = useCart((state) => state.totalPrice);

  const theme = useTheme();
  const groupedProducts = useMemo(
    () => Object.values(groupAndCountProducts(cartProducts).products),
    [cartProducts],
  );

  const handleAddToCart = useCart((state) => state.actions.addProductToCart);
  const handleRemoveProductFromCart = useCart(
    (state) => state.actions.removeProductFromCart,
  );

  const mutation = useCreateOrder();

  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      phoneNumber: userOrderInfo?.phoneNumber,
      shippingAddress: userOrderInfo?.shippingAddress,
      email: userOrderInfo?.email,
      paymentMethod: paymentMethods[state.paymentMethodIndex.row]?.value,
    },
    disabled: mutation.isPending,
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      handleSetUserOrderInfo(data);

      mutation.mutate({
        ...data,
        store: storeId!,
        items: groupedProducts.map(({ count, product }) => {
          return {
            product: product.id,
            quantity: count,
          };
        }),
      });
    },
    [mutation.mutate],
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, gap: 20 }}>
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
        <Divider style={{ margin: 16 }} />
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
        <Divider style={{ marginHorizontal: 16, marginVertical: 20 }} />
        <View style={{ paddingHorizontal: 16, gap: 20 }}>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value, name, disabled },
              formState,
            }) => (
              <Input
                placeholder="Ваш адрес"
                label="Адрес"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                inputMode="text"
                size="large"
                status={formState.errors?.[name]?.message ? "danger" : "basic"}
                caption={formState.errors?.[name]?.message}
                disabled={disabled}
              />
            )}
            name="shippingAddress"
          />

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value, name, disabled },
              formState,
            }) => (
              <Input
                placeholder="Ваш телефон"
                label="Телефон"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                inputMode="tel"
                size="large"
                status={formState.errors?.[name]?.message ? "danger" : "basic"}
                caption={formState.errors?.[name]?.message}
                disabled={disabled}
              />
            )}
            name="phoneNumber"
          />
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value, name, disabled },
              formState,
            }) => (
              <Input
                placeholder="Ваша email"
                label="Почта"
                value={value}
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                inputMode="email"
                size="large"
                status={formState.errors?.[name]?.message ? "danger" : "basic"}
                caption={formState.errors?.[name]?.message}
                disabled={disabled}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value, name, disabled },
              formState,
            }) => {
              const displayValue = paymentMethods.find(
                (method) => method.value === value,
              )?.label;

              return (
                <Select
                  placeholder="Выберите способ оплаты"
                  label="Способ оплаты"
                  value={displayValue}
                  selectedIndex={state.paymentMethodIndex}
                  onSelect={(paymentMethodIndex) => {
                    if (!Array.isArray(paymentMethodIndex)) {
                      setState((prevState) => ({
                        ...prevState,
                        paymentMethodIndex,
                      }));

                      const selectedOption =
                        paymentMethods[paymentMethodIndex.row];

                      onChange?.(selectedOption.value);
                    }
                  }}
                  onBlur={onBlur}
                  size="large"
                  status={
                    formState.errors?.[name]?.message ? "danger" : "basic"
                  }
                  caption={formState.errors?.[name]?.message}
                  disabled={disabled}
                >
                  {paymentMethods?.map(({ value, label }) => {
                    return <SelectItem key={value} title={label} />;
                  })}
                </Select>
              );
            }}
            name="paymentMethod"
          />

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value, name, disabled },
              formState,
            }) => (
              <Input
                placeholder="Дополнительные комментарии"
                label="Комментарии"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                inputMode="text"
                size="large"
                multiline
                status={formState.errors?.[name]?.message ? "danger" : "basic"}
                caption={formState.errors?.[name]?.message}
                disabled={disabled}
              />
            )}
            name="description"
          />
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: "auto",
          }}
        >
          <Button
            disabled={
              mutation.isPending || Object.keys(formState.errors).length > 0
            }
            onPress={handleSubmit(onSubmit)}
          >
            Оформить заказ
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
