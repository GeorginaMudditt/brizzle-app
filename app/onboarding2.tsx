import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Link } from "expo-router";

export default function Onboarding2() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>Quel est votre prénom ?</Text>
      <Text style={styles.introText}>Quel est votre nom de famille ?</Text>
      <Link href="/onboarding3" asChild>
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
    paddingVertical: 50,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  introText: {
    textAlign: "center",
    color: theme.colorBlue,
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: theme.colorRed,
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
