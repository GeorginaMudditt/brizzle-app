import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// User enters password and confirms password

// TO DO - code is supposedly set up to support strong password suggestions, but need to test on real device

export default function password() {
  const { username } = useLocalSearchParams();
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(!isPasswordValid(text));

    if (confirmPassword) {
      setConfirmPasswordError(text !== confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(password !== text);
  };

  const handleContinue = async () => {
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    const validUsername = Array.isArray(username) ? username[0] : username;

    if (typeof validUsername === "string") {
      await SecureStore.setItemAsync("username", validUsername);
      await SecureStore.setItemAsync("password", password);
      alert("Votre compte a été créé avec succès !");
    }

    router.replace({
      pathname: "/levels",
      params: { username },
    });
  };

  const isFormValid = () => {
    return isPasswordValid(password) && password === confirmPassword;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>Choisissez un mot de passe :</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
          textContentType="newPassword" // Suggest strong password (iOS)
          importantForAutofill="yes" // Autofill (Android)
          autoComplete="password-new" // Autofill for new password (Android)
          keyboardType="default" // Ensures proper behavior
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      {passwordError && (
        <Text style={styles.errorText}>
          Le mot de passe doit contenir au moins 8 caractères, avec au moins 1
          chiffre et 1 caractère spécial
        </Text>
      )}
      <Text style={styles.introText}>Confirmez votre mot de passe :</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmez le mot de passe"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          textContentType="newPassword"
          importantForAutofill="yes"
          autoComplete="password-new"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      {confirmPasswordError && (
        <Text style={styles.errorText}>
          Les mots de passe ne correspondent pas
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
        onPress={() => {
          handleContinue();
        }}
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
    pointerEvents: "auto",
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    margin: 40,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 20,
  },
  errorText: {
    fontSize: 15,
    color: theme.colorRed,
    textAlign: "center",
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
  buttonDisabled: {
    backgroundColor: theme.colorGrey,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
