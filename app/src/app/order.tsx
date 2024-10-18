import { View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import { useCart } from "@/hooks/useCart";
import { Order } from "@/features/Order";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { useCreateOrderState } from "@/hooks/useOrders";

export default function OrderPage() {
  const router = useRouter();
  const createOrderState = useCreateOrderState();

  const totalCount = useCart((state) => state.totalCount);

  useEffect(() => {
    if (!totalCount && router.canGoBack()) {
      router.back();
    }
  }, [totalCount, router.canGoBack, router.back]);

  return (
    <>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <Order />
        <Footer hasOffset={false} />
      </View>
      <Loader loading={createOrderState.status === "pending"} />
    </>
  );
}
