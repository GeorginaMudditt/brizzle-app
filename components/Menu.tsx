import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogOutButton } from "./LogoutButton";

export const Menu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

  const pages: { name: string; path: string; icon: IoniconName }[] = [
    { name: "Accueil", path: "/", icon: "home-outline" },
    { name: "Joueurs", path: "/dashboard", icon: "people-outline" },
    {
      name: "Ajouter un joueur",
      path: "/account/sub_account/create",
      icon: "add-circle-outline",
    },
    { name: "Niveaux", path: "/levels", icon: "trophy-outline" },
  ];

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Ionicons name="menu-outline" style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={[styles.menuBox, { display: isOpen ? "flex" : "none" }]}>
        {pages.map((page) => (
          <TouchableOpacity
            key={page.name}
            onPress={() => {
              console.log(`Navigating to ${page.name}`);
              router.push(page.path);
              setIsOpen(false);
            }}
            style={styles.menuOption}
          >
            <View style={styles.optionContent}>
              <Ionicons name={page.icon} style={styles.menuOptionIcon} />
              <Text style={styles.menuText}>{page.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <LogOutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "relative",
    padding: 10,
  },
  menuIcon: {
    fontSize: 40,
    color: theme.colorBlue,
    top: 10,
    right: 20,
  },
  menuBox: {
    position: "absolute",
    top: 60,
    left: -250,
    zIndex: 1001,
    width: 250,
    backgroundColor: theme.colorWhite,
    padding: 20,
    borderRadius: 5,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
  },
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
