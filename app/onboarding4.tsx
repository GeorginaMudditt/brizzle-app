import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { theme } from "../theme";
import { Link, useLocalSearchParams } from "expo-router";
import { supabase } from "../supabaseClient";

export default function Onboarding4() {
  const { username } = useLocalSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleContinue = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password }]);
    if (error) {
      Alert.alert("Erreur", error.message);
    } else {
      Alert.alert("Succès", "Utilisateur créé avec succès !");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>Bienvenue, {username} 😊</Text>
      <Text style={styles.introText}>
        Veuillez saisir votre adresse e-mail :
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.introText}>Choisissez un mot de passe :</Text>
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
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
