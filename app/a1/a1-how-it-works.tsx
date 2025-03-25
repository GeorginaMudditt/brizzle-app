import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { Link } from "expo-router";
import { HowItWorks } from "../../components/HowItWorks";

export default function A1HowItWorks() {
  return (
    <View style={styles.container}>
      <View style={styles.howItWorksHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>Comment ça marche ?</Text>
      <HowItWorks />
      <Text style={styles.p}>
        Cliquez sur les icônes des sujets à gauche pour accéder à vos défis. Il
        y a 3 défis pour chaque sujet : "Bronze" (bronze), "Silver" (argent) et
        "Gold" (or).
      </Text>
      <Link href="a1/a1-awards-table" asChild>
        <TouchableOpacity>
          <Text style={styles.introTextHeader}>Continuez</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  howItWorksHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    margin: 40,
  },
  p: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  a1Button: {
    backgroundColor: theme.colorA1,
  },
});
