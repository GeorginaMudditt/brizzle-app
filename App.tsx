import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "./theme";
import { LevelButtons } from "./components/levelButtons";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("./assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={styles.introText}>
          Bienvenue sur Brizzle{" "}
          <Fontisto name="hot-air-balloon" size={20} color="black" />
        </Text>
        <Text style={styles.introText}>
          Une application de vocabulaire où vous pouvez progresser en anglais à
          votre rythme et en vous amusant !
        </Text>
      </View>
      <LevelButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorLightPink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWithName: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 100,
  },
  introText: {
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
