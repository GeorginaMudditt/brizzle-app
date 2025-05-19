import React from "react";
import { useUser } from "@providers/UserProvider";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { Link, useRouter } from "expo-router";

// Welcome screen for the app
export default function App() {
  const { id } = useUser();
  const router = useRouter();

  // If the user is logged in, redirect to the home page
  if (id) {
    router.replace("/dashboard");
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("@assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          Bienvenue sur Brizzle
        </Text>
        <Text style={styles.introText}>
          Une application de vocabulaire où vous pouvez progresser en anglais à
          votre rythme et en vous amusant !
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Allons-y !</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 150,
    paddingHorizontal: 50,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
  introText: {
    textAlign: "center",
    color: theme.colorBlue,
    fontSize: 30,
  },
  introTextHeader: {
    fontSize: 40,
    color: theme.colorBlue,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
