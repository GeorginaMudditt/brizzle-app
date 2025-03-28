import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

export function HowItWorks() {
  return (
    <View style={styles.container}>
      <Text style={styles.p}>
        Pour chaque niveau (A1-C2), il y a au moins 20 thèmes différents, et
        vous verrez une icône pour chaque théme à gauche de votre tableau des
        récompenses. Par exemple, pour la catégorie "nourriture", vous pourriez
        voir{" "}
        <Image
          source={require("../assets/apple-original.png")}
          style={styles.icon}
        />
        .
      </Text>
      <Text style={styles.p}>
        Chaque thème comprend 3 défis pour apprendre le vocabulaire :
      </Text>
      <Text style={styles.pTrophy}>
        <Entypo style={styles.bronzeTrophy} name="trophy" /> Défi bronze : Lire
        et écouter
      </Text>
      <Text style={styles.pTrophy}>
        <Entypo style={styles.silverTrophy} name="trophy" /> Défi argent :
        Associer les mots
      </Text>
      <Text style={styles.pTrophy}>
        <Entypo style={styles.goldTrophy} name="trophy" /> Défi or : Écrire les
        mots
      </Text>
      <Text style={styles.p}>
        Lorsque vous aurez réussi chaque défi, une autre icône apparaîtra sur
        votre tableau des récompenses. Par exemple, lorsque vous aurez complété
        les défis bronze, argent et or pour la catégorie "nourriture", vous
        verrez{" "}
        <Image
          source={require("../assets/apple-bronze.png")}
          style={styles.icon}
        />
        <Image
          source={require("../assets/apple-silver.png")}
          style={styles.icon}
        />
        <Image
          source={require("../assets/apple-gold.png")}
          style={styles.icon}
        />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  h2: {
    fontSize: 20,
    textAlign: "center",
  },
  p: {
    color: theme.colorBlue,
    fontSize: 16,
    lineHeight: 30,
    textAlign: "justify",
    marginTop: 10,
  },
  icon: {
    fontSize: 10,
    width: 20,
    height: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  pTrophy: {
    lineHeight: 30,
    fontSize: 16,
    textAlign: "justify",
    color: theme.colorBlue,
  },
  bronzeTrophy: {
    fontSize: 20,
    color: theme.colorBronze,
  },
  silverTrophy: {
    fontSize: 20,
    color: theme.colorSilver,
  },
  goldTrophy: {
    fontSize: 20,
    color: theme.colorGold,
  },
});
