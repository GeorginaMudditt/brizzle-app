import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

export function HowItWorks() {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>À propos de l'application</Text>
      <Text style={styles.p}>
        Il y a 6 niveaux en accord avec le Cadre européen commun de référence
        pour les langues (CECR) : A1, A2, B1, B2, C1 et C2.
      </Text>
      <Text style={styles.p}>
        Pour chaque niveau, il y a au moins 20 thèmes différents (par exemple,
        "nourriture" ou "verbes"), et chaque thème comprend 3 défis pour
        apprendre le vocabulaire :
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
      <Link href="/levels" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Allons-y !</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorBlue,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  h2: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  p: {
    fontSize: 15,
    color: "white",
    lineHeight: 30,
    textAlign: "justify",
  },
  pTrophy: {
    lineHeight: 30,
    color: "white",
    fontSize: 15,
    textAlign: "justify",
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
