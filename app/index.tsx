import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { HowItWorks } from "../components/HowItWorks";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          Bienvenue sur Brizzle{" "}
        </Text>
        <Text style={styles.introText}>
          Une application de vocabulaire où vous pouvez progresser en anglais à
          votre rythme et en vous amusant !
        </Text>
      </View>
      <HowItWorks />
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
});
