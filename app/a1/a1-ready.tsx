import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { Link } from "expo-router";
import { Video, ResizeMode } from "expo-av";

export default function A1Ready() {
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
      <Text style={styles.h2}>Êtes-vous prêt ?</Text>
      <Video
        source={require("../../assets/thumbs-up.mp4")}
        style={styles.video}
        useNativeControls={false} // Disable controls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={true} // Loop the video
        shouldPlay={true} // Auto-play the video
      />
      <Link href="a1/a1-awards-table" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuez</Text>
        </TouchableOpacity>
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
