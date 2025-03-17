import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Link, useLocalSearchParams } from "expo-router";

// Shows the user the username that was generated for them
// Gives them the option to use it or create a new one
// Navigates to the next onboarding screen

export default function Onboarding3() {
  const { firstName, lastName } = useLocalSearchParams() as {
    firstName: string;
    lastName: string;
  };
  const username = `${firstName}_${lastName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9_-]/g, "")}`;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>
        Nous avons généré le nom d'utilisateur suivant pour vous :
      </Text>
      <Text style={styles.usernameText}>{username}</Text>
      <Text style={styles.introText}>
        Ce sera le nom affiché à côté de vos récompenses en anglais !
      </Text>
      <Text style={styles.introText}>
        Souhaitez-vous utiliser ce nom d'utilisateur ?
      </Text>
      <Link href={{ pathname: "/onboarding4", params: { username } }} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Oui ☑️ Continuez</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/onboarding3b" asChild>
        <Text style={styles.differentUsername}>
          Choisissez un nom d'utilisateur différent
        </Text>
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
  usernameText: {
    textAlign: "center",
    color: theme.colorRed,
    fontSize: 20,
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
  differentUsername: {
    paddingVertical: 30,
    color: theme.colorBlue,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
