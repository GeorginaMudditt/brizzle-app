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

// User can create a different username
// Username is checked against other usernames in the database
// Navigates to the next onboarding screen

export default function CreatedUsername() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const offensivePattern =
    /(m[eé]rde|con(nard|nasse)?|put[ai]in|bordel|salaud|salope|encul[ée]|ta\s?gueule|fils\s?de\s?pute|nique(r|ta\sm[eè]re)?|b[1i]t[3e]|couilles|chatte|branleur|branleuse|p[eé]d[ée]|n[eé]gr[eé]|bougnoule|chinet[oi]que|feuj|youpin|sodomie|fuck|shit|bitch|cunt|asshole|bullshit|bastard|wanker|wanking|wank|dickhead|prick|motherfucker|slut|whore|nigger|chink|spic|kike|faggot|tranny|retard|piss off|cock|twat|bollocks|bugger|tosser|jerkoff|dipshit|damn|bloody hell|goddamn|cracker|coon|gook|redneck|wetback|homo|dyke|skank|slag|sod off|arsehole|douchebag|bellend|paki|beaner|spastic|mongoloid|nigga|rape|child molester|pedo|paedo)/i;

  const containsOffensiveWord = (str: string): boolean => {
    return offensivePattern.test(str.toLowerCase());
  };

  const containsInvalidCharacters = (str: string): boolean => {
    return /[^a-zA-Z0-9_]/.test(str);
  };

  const hasMinimumThreeLetters = (str: string): boolean => {
    return (str.match(/[a-zA-Z]/g) || []).length >= 3;
  };

  const isUsernameValid = (str: string): boolean => {
    return (
      !containsOffensiveWord(str) &&
      !containsInvalidCharacters(str) &&
      hasMinimumThreeLetters(str)
    );
  };

  const handleContinue = () => {
    router.push({
      pathname: "/email_address",
      params: { username },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>
        Entrez le nom d'utilisateur que vous souhaitez utiliser :
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />

      {username.length > 0 &&
      (containsOffensiveWord(username) ||
        containsInvalidCharacters(username)) ? (
        <Text style={styles.errorText}>
          Ce nom d'utilisateur n'est pas disponible - veuillez en choisir un
          autre
        </Text>
      ) : username.length > 0 && !hasMinimumThreeLetters(username) ? (
        <Text style={styles.successText}>
          Le nom d'utilisateur doit contenir au moins 3 lettres
        </Text>
      ) : isUsernameValid(username) ? (
        <Text style={styles.successText}>
          Ce nom d'utilisateur est disponible
        </Text>
      ) : null}

      {isUsernameValid(username) && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuez</Text>
        </TouchableOpacity>
      )}
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
    color: theme.colorRed,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  successText: {
    color: theme.colorBlue,
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
  differentUsername: {
    paddingVertical: 30,
    color: theme.colorBlue,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
