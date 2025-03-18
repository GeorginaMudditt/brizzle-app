import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          Bienvenue sur Brizzle{" "}
        </Text>
        <Text style={styles.introText}>
          Une application de vocabulaire où vous pouvez progresser en anglais à
          votre rythme et en vous amusant !
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/onboarding1" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Allons-y !</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Text style={styles.loginText}>
          Êtes-vous déjà inscrit auprès de Brizzle ?
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <Text style={styles.loginTextLink}>Connectez-vous</Text>
          </Link>
        </View>
      </View>
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
  introTextHeader: {
    fontSize: 40,
    color: theme.colorBlue,
  },
  introText: {
    textAlign: "center",
    fontSize: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: theme.colorBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  loginText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 15,
  },
  loginTextLink: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
});
