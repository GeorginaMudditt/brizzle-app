import { useState } from "react";
import {
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { theme } from "../../theme";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const WhichUser = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.introText}>Qui joue aujourd'hui?</Text>
      <Link href="../levels" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default WhichUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 150,
    paddingHorizontal: 50,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 50,
  },
  introText: {
    textAlign: "center",
    color: theme.colorBlue,
    fontSize: 30,
  },
  button: {
    backgroundColor: theme.colorBlue,
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
});
