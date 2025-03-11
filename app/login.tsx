import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../theme";

export default function Login() {
  return (
    <View>
      <Text style={styles.introText}>This will be the login page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  introText: {
    textAlign: "center",
    fontSize: 20,
    color: theme.colorBlue,
  },
});
