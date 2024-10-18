import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserLocationModal } from "@/features/UserLocationModal";
import { CartInfo } from "@/features/CartInfo";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Slot />
          <CartInfo />
          {/*<UserLocationModal />*/}
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaView>
  );
}
