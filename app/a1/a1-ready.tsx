import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { useUser } from "../../providers/UserProvider";

// User is asked if they are ready to start the game

export default function A1Ready() {
  const { username } = useUser();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/a1/a1-awards-table");
  };

  return (
    <View style={styles.container}>
      <View style={styles.howItWorksHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>
        L'objectif est de collecter toutes les icônes et de remplir votre
        tableau des récompenses.
      </Text>
      <Text style={styles.h2}>Allons-y, {username} ?</Text>
      <Video
        source={require("../../assets/Ready-updated.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={true}
        shouldPlay={true}
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
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  howItWorksHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    marginTop: 20,
    textAlign: "center",
  },
  video: {
    width: 300,
    height: 300,
  },
  button: {
    backgroundColor: theme.colorA1,
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
});
