import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import "react-native-url-polyfill/auto";
import { Link } from "expo-router";
import { theme } from "../../theme";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />

      <View style={styles.buttonContainer}>
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Créer un compte !</Text>
          </TouchableOpacity>
        </Link>

        <Text style={styles.or}>ou</Text>

        <Link href="/signin" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 20,
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
    gap: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  or: {
    textAlign: "center",
    fontSize: 20,
  },
});
