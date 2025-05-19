import React from "react";
import { Slot } from "expo-router";
import { UserProvider } from "@providers/UserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "@theme/theme";

const RootLayout = () => {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colorWhite }}
    >
      <UserProvider>
        <Slot />
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
