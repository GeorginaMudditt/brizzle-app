import { useUser } from "@providers/UserProvider";
import { TouchableOpacity } from "react-native";

export function LogOutButton() {
  const { removeUser } = useUser();

  return <TouchableOpacity onPress={removeUser}>Logout</TouchableOpacity>;
}
