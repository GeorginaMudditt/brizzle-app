import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Link, useRouter } from "expo-router";
import { useUser } from "../providers/UserProvider";

// Shows the user the username that was generated for them
// Gives them the option to use it or create a new one

export default function GeneratedUsername() {
  const { username, setUsername } = useUser();
  const router = useRouter();

  const handleAcceptGeneratedUsername = () => {
    setUsername(username);
    router.push("/email_address");
  };

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
      <TouchableOpacity
        style={styles.button}
        onPress={handleAcceptGeneratedUsername}
      >
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
      <Link href={"/created_username"} asChild>
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
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
