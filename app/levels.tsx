import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { useLocalSearchParams, useRouter } from "expo-router";

// User selects level

export default function Levels() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleContinue = () => {
    router.push({
      pathname: "/a1/a1-how-it-works",
      params: { username },
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
          À quel niveau souhaitez-vous vous entraîner, {username}?
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.a1Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.a2Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b1Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.b2Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c1Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.c2Button]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <Text style={styles.cecrLevels}>
        Plus d'informations sur les niveaux du CECR de A1 à C2
      </Text>
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
    paddingVertical: 30,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
