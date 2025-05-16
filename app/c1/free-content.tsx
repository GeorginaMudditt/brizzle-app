import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function freeContent() {
  return (
    <View style={styles.container}>
      <Link href="/levels" asChild>
        <Ionicons style={styles.arrowBack} name="arrow-back-circle" />
      </Link>
      <View>
        <Image
          source={require("../../assets/brizzle-fb-cover.png")}
          style={styles.landscapeLogoWithName}
        />
        <Text style={styles.introTextHeader}>
          Le contenu Brizzle C1 arrivera bientôt : prévu pour fevrier 2026
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowBack: {
    fontSize: 40,
    color: theme.colorBlue,
    position: "absolute",
    top: 20,
    left: 20,
  },
  landscapeLogoWithName: {
    width: 250,
    height: 100,
    alignSelf: "center",
  },
  introTextHeader: {
    backgroundColor: theme.colorC1,
    fontSize: 30,
    color: "white",
    textAlign: "center",
    padding: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
});
