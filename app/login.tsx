import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { theme } from "../theme";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    setUsernameError(false);
    setPasswordError(false);

    try {
      const storedUsername = await SecureStore.getItemAsync("username");
      const storedPassword = await SecureStore.getItemAsync("password");

      if (
        storedUsername === usernameInput &&
        storedPassword === passwordInput
      ) {
        router.replace("/levels");
      } else {
        Alert.alert("Nom d'utilisateur ou mot de passe invalide");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des identifiants", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la connexion - veuillez réessayer"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>
        Entrez vos informations pour vous connecter
      </Text>
      {/* Username Input */}
      <TextInput
        style={[styles.input, usernameError && styles.inputError]}
        placeholder="Username"
        value={usernameInput}
        onChangeText={setUsernameInput}
      />
      {usernameError && <Text style={styles.errorText}>Invalid username</Text>}

      {/* Password Input */}
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={passwordInput}
        onChangeText={setPasswordInput}
      />
      {passwordError && <Text style={styles.errorText}>Invalid password</Text>}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  introText: {
    textAlign: "center",
    fontSize: 20,
    color: theme.colorBlue,
  },
  input: {
    fontSize: 18,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    padding: 10,
    marginVertical: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: theme.colorRed,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
