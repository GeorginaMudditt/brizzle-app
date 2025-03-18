import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// User enters password and confirms password

export default function Onboarding5() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError("");
  };

  const handleContinue = () => {
    if (!isPasswordValid(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    router.push("/levels");
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
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      {passwordError !== "" && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      <Text style={styles.introText}>Confirmez votre mot de passe :</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmez le mot de passe"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      {confirmPasswordError !== "" && (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      )}
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
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
