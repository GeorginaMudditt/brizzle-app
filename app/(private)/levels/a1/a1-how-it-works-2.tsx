import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

// User is given instructions on how to use the app #2

export default function A1HowItWorks() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/levels/a1/a1-how-it-works-3");
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
      <Text style={styles.headingText}>Et qu'est-ce que je dois faire ?</Text>
      <Text style={styles.largeText}>
        Vous devez réussir 3 défis de vocabulaire dans chaque thème pour gagner
        des icônes pour votre collection.
      </Text>
      <Text style={styles.largeText}>
        <Entypo style={styles.bronzeTrophy} name="trophy" /> Défi bronze : Lire
        et écouter
      </Text>
      <Text style={styles.largeText}>
        <Entypo style={styles.silverTrophy} name="trophy" /> Défi argent :
        Associer les mots
      </Text>
      <Text style={styles.largeText}>
        <Entypo style={styles.goldTrophy} name="trophy" /> Défi or : Écrire les
        mots
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
  bronzeTrophy: {
    fontSize: 40,
    color: theme.colorBronze,
  },
  silverTrophy: {
    fontSize: 40,
    color: theme.colorSilver,
  },
  goldTrophy: {
    fontSize: 40,
    color: theme.colorGold,
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
