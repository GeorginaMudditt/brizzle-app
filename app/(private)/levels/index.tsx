import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { useRouter, Link } from "expo-router";
import { useUser } from "@providers/UserProvider";

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
          source={require("@assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={styles.headingText}>
          Tu veux essayer quel niveau, {firstName}?
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.a1Button]}
        onPress={() => handleContinue("/levels/a1/a1-how-it-works-1")}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.a2Button]}
        onPress={() => handleContinue("/levels/a2/free-content")}
      >
        <Text style={styles.buttonText}>A2 : Élémentaire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b1Button]}
        onPress={() => handleContinue("/levels/b1/free-content")}
      >
        <Text style={styles.buttonText}>B1 : Intermédiaire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b2Button]}
        onPress={() => handleContinue("/levels/b2/free-content")}
      >
        <Text style={styles.buttonText}>B2 : Intermédiaire Plus</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c1Button]}
        onPress={() => handleContinue("/levels/c1/free-content")}
      >
        <Text style={styles.buttonText}>C1 : Avancé</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c2Button]}
        onPress={() => handleContinue("levels/c2/free-content")}
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
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  logoWithName: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 100,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colorBlue,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  largeText: {
    color: theme.colorBlue,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
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
