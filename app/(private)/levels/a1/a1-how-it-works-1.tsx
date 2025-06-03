import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { useLocalSearchParams, useRouter } from "expo-router";

// User is given instructions on how to use the app #1

export default function A1HowItWorks() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("levels/a1/a1-how-it-works-2");
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
      <Text style={styles.headingText}>Comment ça marche ?</Text>
      <Text style={styles.largeText}>
        Pour chaque niveau (A1-C2), il y a au moins 20 thèmes différents, et
        vous verrez une icône pour chaque théme à gauche de votre tableau des
        récompenses.
      </Text>
      <Text style={styles.largeText}>
        {" "}
        Par exemple, pour la catégorie "nourriture", vous pourriez voir{" "}
        <Image
          source={require("@assets/apple-original.png")}
          style={styles.icon}
        />
        .
      </Text>
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
    justifyContent: "center",
    flexDirection: "row",
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
  smallText: {
    color: theme.colorBlue,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 10,
    width: 20,
    height: 20,
  },
  // h2: {
  //   fontSize: 30,
  //   color: theme.colorBlue,
  // },
  // p: {
  //   fontSize: 16,
  //   padding: 10,
  //   textAlign: "center",
  // },
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
