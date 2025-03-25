import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../theme";
import { LevelButtons } from "../components/LevelButtons";
import { useLocalSearchParams } from "expo-router";

export default function Levels() {
  const { username } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          À quel niveau souhaitez-vous vous entraîner ?
        </Text>
      </View>
      <LevelButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowBack: {
    fontSize: 40,
    color: theme.colorBlue,
    position: "absolute",
    top: 20,
    left: 20,
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
});
