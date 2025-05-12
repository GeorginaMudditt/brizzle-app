import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { useRouter, Link } from "expo-router";
import { useUser } from "../providers/UserProvider";

// User selects level

export default function Levels() {
  const { firstName } = useUser();
  const router = useRouter();

  const handleContinue = (pathname: string) => {
    router.push({
      pathname,
      params: { firstName },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          À quel niveau souhaitez-vous vous entraîner, {firstName}?
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.a1Button]}
        onPress={() => handleContinue("/a1/a1-how-it-works")}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.a2Button]}
        onPress={() => handleContinue("/a2/free-content")}
      >
        <Text style={styles.buttonText}>A2 : Élémentaire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b1Button]}
        onPress={() => handleContinue("/b1/free-content")}
      >
        <Text style={styles.buttonText}>B1 : Intermédiaire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b2Button]}
        onPress={() => handleContinue("/b2/free-content")}
      >
        <Text style={styles.buttonText}>B2 : Intermédiaire Plus</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c1Button]}
        onPress={() => handleContinue("/c1/free-content")}
      >
        <Text style={styles.buttonText}>C1 : Avancé</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c2Button]}
        onPress={() => handleContinue("/c2/free-content")}
      >
        <Text style={styles.buttonText}>C2 : Expert</Text>
      </TouchableOpacity>
      <Link href="/cecrl" asChild>
        <Text style={styles.cecrLevels}>
          Plus d'informations sur les niveaux du CECRL de A1 à C2
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
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  introTextHeader: {
    fontSize: 30,
    color: theme.colorBlue,
  },
  introText: {
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button: {
    width: 250,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  a1Button: {
    backgroundColor: theme.colorA1,
  },
  a2Button: {
    backgroundColor: theme.colorA2,
  },
  b1Button: {
    backgroundColor: theme.colorB1,
  },
  b2Button: {
    backgroundColor: theme.colorB2,
  },
  c1Button: {
    backgroundColor: theme.colorC1,
  },
  c2Button: {
    backgroundColor: theme.colorC2,
  },
  cecrLevels: {
    padding: 30,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
