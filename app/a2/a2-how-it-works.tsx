import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { HowItWorks } from "../../components/HowItWorks";

// User is given instructions on how to use the app

export default function A2HowItWorks() {
  return (
    <View style={styles.container}>
      <View style={styles.howItWorksHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A2</Text>
      </View>
      <Text style={styles.h2}>Comment ça marche ?</Text>
      <HowItWorks />
      <Link href="a1/a1-ready" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuez</Text>
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
    color: theme.colorA2,
    fontSize: 30,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
  },
  p: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colorA2,
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
