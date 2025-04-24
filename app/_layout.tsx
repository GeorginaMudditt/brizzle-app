import React from "react";
import { Slot } from "expo-router";
import { UserProvider } from "../providers/UserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
