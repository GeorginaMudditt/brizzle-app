import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "../theme";
import { useRouter } from "expo-router";
import { capitaliseFirstLetter, removePunctuation } from "../lib/tools";
import { useUser } from "../providers/UserProvider";

// Asks the user for their first and last name
// Navigates to the next onboarding screen where username is created from this information

export default function FirstLastNames() {
  const { setUsername } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();

  const handleContinue = () => {
    const formattedFirstName = capitaliseFirstLetter(
      removePunctuation(firstName.trim())
    );
    const formattedLastName = capitaliseFirstLetter(
      removePunctuation(lastName.trim())
    );

    const username = `${formattedFirstName}_${formattedLastName}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9_-]/g, "");

    setUsername(username);

    router.push("/generated_username");
  };

  const isFormValid = () => {
    return firstName.trim().length >= 2 && lastName.trim().length >= 2;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>Quel est votre prénom ?</Text>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.introText}>Quel est votre nom de famille ?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de famille"
        value={lastName}
        onChangeText={setLastName}
      />
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
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
  input: {
    fontSize: 20,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colorBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: theme.colorGrey,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
