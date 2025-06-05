import { View } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useUser } from "@providers/UserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "@theme/theme";
import { Menu } from "@components/Menu";

const PrivateLayout = () => {
  const { id } = useUser();
  const router = useRouter();

  // Check if the user is logged in
  if (!id) {
    // Redirect to the login page if not logged in
    router.replace("/login");
    return null; // Render nothing while redirecting
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colorWhite }}
    >
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        <Menu />
      </View>
      <Slot />
    </GestureHandlerRootView>
  );
};

export default PrivateLayout;
