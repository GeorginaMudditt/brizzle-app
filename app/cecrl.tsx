import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Cecrl() {
  return (
    <View style={styles.container}>
      <Link href="/levels" asChild>
        <Ionicons style={styles.arrowBack} name="arrow-back-circle" />
      </Link>
      <Image
        source={require("../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.h2}>CECR, Conseil de l'Europe</Text>
      <Text style={styles.introText}>
        Le Cadre européen commun de référence pour les langues (CECRL) offre une
        base commune pour l’élaboration de programmes de langues vivantes, de
        référentiels, d’examens, de manuels, etc. en Europe. Il décrit aussi
        complètement que possible ce que les apprenants d’une langue doivent
        apprendre afin de l’utiliser dans le but de communiquer ; il énumère
        également les connaissances et les habiletés qu’ils doivent acquérir
        afin d’avoir un comportement langagier efficace. La description englobe
        aussi le contexte culturel qui soutient la langue. Enfin, le Cadre de
        référence définit les niveaux de compétence qui permettent de mesurer le
        progrès de l’apprenant à chaque étape de l’apprentissage et à tout
        moment de la vie. Les six niveaux de langue sont A1, A2, B1, B2, C1 et
        C2 (avec A1 étant débutant et C2 étant expert).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    marginBottom: 20,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    marginTop: 20,
    textAlign: "center",
  },
  introText: {
    textAlign: "center",
    fontSize: 20,
    color: theme.colorBlue,
  },
});
