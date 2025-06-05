import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@providers/UserProvider";

// User is asked if they are ready to start the game

export default function A1Ready() {
  const { firstName } = useUser();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/levels/a1/a1-awards-table");
  };

  return (
    <View style={styles.container}>
      <View style={styles.howItWorksHeader}>
        <Image
          source={require("@assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.headingText}>Prêt à commencer ?</Text>
      <Text style={styles.largeText}>
        L'objectif est de collecter toutes les icônes et de remplir votre
        tableau des récompenses.
      </Text>
      <Image source={require("@assets/yes.png")} style={styles.yesCartoon} />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  howItWorksHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colorBlue,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  largeText: {
    color: theme.colorBlue,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  yesCartoon: {
    width: 250,
    height: 250,
    marginTop: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: theme.colorA1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
