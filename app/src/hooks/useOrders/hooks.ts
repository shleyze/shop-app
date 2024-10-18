import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

import {
  createOrder,
  getOrders,
  type CreateOrderApiRequest,
  type CreateOrderApiResponseSuccess,
  type CreateOrderApiResponseFailure,
  type GetOrderApiRequest,
} from "@/api/order";
import { useCart } from "@/hooks/useCart";

import { useOrdersStore } from "./store";

const mutationKey = ["createOrder"];

export function useCreateOrder() {
  return useMutation<
    CreateOrderApiResponseSuccess,
    CreateOrderApiResponseFailure,
    CreateOrderApiRequest
  >({
    mutationKey,
    mutationFn: (order) => {
      return createOrder(order);
    },
    onError() {
      Alert.alert(
        "Что-то пошло не так",
        `Пожалуйста, попробуйте оформить заказ позже.`,
        [
          {
            text: "Хорошо",
          },
        ],
      );
    },
    onSuccess(data) {
      const { orderNumber } = data.doc;

      Alert.alert(
        "Заказ успешно создан",
        `Номер вашего заказа #${orderNumber} Подробности прислали вам на почту`,
        [
          {
            text: "Спасибо",
            onPress: () => useCart.getState().actions.resetCart(),
          },
        ],
      );

      useOrdersStore.getState().actions.addOrder(orderNumber);
    },
  });
}

export function useCreateOrderState() {
  const state = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state,
  });

  return state[state.length - 1];
}

export function useOrdersQuery({ orderNumbers }: GetOrderApiRequest) {
  return useQuery({
    queryKey: ["orders", orderNumbers],
    queryFn() {
      return getOrders({ orderNumbers });
    },
    enabled: !!orderNumbers.length,
  });
}
