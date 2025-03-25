import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import AwardTable from "../../components/AwardTable";

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
        <Text style={styles.introTextHeader}>Bienvenue sur Brizzle A1</Text>
      </View>
      <View></View>
      <AwardTable />
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
    width: 200,
    height: 75,
    alignSelf: "center",
  },
  introTextHeader: {
    backgroundColor: theme.colorA1,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  p: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});
