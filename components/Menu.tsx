import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogOutButton } from "./LogoutButton";

export const Menu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    {
      name: "Create sub Account",
      path: "/account/sub_account/create",
    },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Levels", path: "/levels" },
  ];

  return (
    <View style={{ position: "relative", padding: 10 }}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          display: isOpen ? "flex" : "none",
          position: "absolute",
          top: 50,
          left: -200,
          zIndex: 1000,
          right: 0,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          borderColor: "red",
          borderWidth: 1,
        }}
      >
        {pages.map((page) => (
          <TouchableOpacity
            key={page.name}
            onPress={() => {
              console.log(`Navigating to ${page.name}`);
              router.push(page.path);
              setIsOpen(false);
            }}
            style={{ padding: 10 }}
          >
            <Text>{page.name}</Text>
          </TouchableOpacity>
        ))}
        <LogOutButton />
      </View>
    </View>
  );
};
