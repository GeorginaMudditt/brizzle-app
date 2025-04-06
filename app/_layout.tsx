import { Slot } from "expo-router";
import { UserProvider } from "../providers/UserProvider";

const RootLayout = () => {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
};

export default RootLayout;
