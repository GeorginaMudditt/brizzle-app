import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "@providers/UserProvider";
import { theme } from "@theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export function LogOutButton() {
  const { removeUser } = useUser();

  return (
    <TouchableOpacity onPress={removeUser} style={styles.menuOption}>
      <View style={styles.optionContent}>
        <Ionicons name="log-out-outline" style={styles.menuOptionIcon} />
        <Text style={styles.menuText}>Se déconnecter</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    padding: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    color: theme.colorBlue,
  },
  menuOptionIcon: {
    color: theme.colorBlue,
    fontSize: 18,
    marginRight: 10,
  },
});
