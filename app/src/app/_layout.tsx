import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserLocationModal } from "@/features/UserLocationModal";
import { OrderModal } from "@/features/OrderModal";
import { CartInfo } from "@/features/CartInfo";
import { Header } from "@/components/Header";
import { useUserStore } from "@/hooks/useUser";

const queryClient = new QueryClient();

export default function Layout() {
  const storeId = useUserStore((state) => state.storeId);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={{ flex: 1 }}>
            <UserLocationModal />
            <OrderModal />

            {storeId && (
              <>
                <Header />
                <Slot />
                <CartInfo />
              </>
            )}
          </SafeAreaView>
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  );
}
