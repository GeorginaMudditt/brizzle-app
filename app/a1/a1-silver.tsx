import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Silver() {
  const { topic } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>
        {topic} : Silver (<Text style={styles.italic}>Argent</Text>)
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
      <Link href="./a1-awards-table" asChild>
        <Text style={styles.backToAwards}>
          Retour au tableau des récompenses A1
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
    padding: 25,
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  awardsHeader: {
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
  h3: {
    fontSize: 24,
    color: theme.colorBlue,
    margin: 20,
    textAlign: "center",
  },
  italic: {
    fontStyle: "italic",
  },
  button: {
    backgroundColor: theme.colorA1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  backToAwards: {
    padding: 30,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
