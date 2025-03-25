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
import { useLocalSearchParams, useRouter } from "expo-router";

// User enters email address

export default function email_address() {
  const { username } = useLocalSearchParams();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(false);
  };

  const handleContinue = () => {
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }
    router.push({
      pathname: "/heard_about",
      params: { username },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.h2}>Bienvenue, {username}</Text>
      <Text style={styles.introText}>
        Veuillez saisir votre adresse e-mail :
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && (
        <Text style={styles.errorText}>Adresse e-mail invalide</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
