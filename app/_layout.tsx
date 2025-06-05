import React from "react";
import { Slot } from "expo-router";
import { UserProvider } from "@providers/UserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "@theme/theme";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colorWhite }}
        edges={["top", "left", "right"]}
      >
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: theme.colorWhite }}
        >
          <UserProvider>
            <Slot />
          </UserProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
