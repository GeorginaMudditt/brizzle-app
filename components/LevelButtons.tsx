import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";
import { Link } from "expo-router";

export function LevelButtons() {
  return (
    <View>
      <Link
        href="a1/a1-how-it-works"
        asChild
        style={[styles.button, styles.a1Button]}
      >
        <TouchableOpacity>
          <Text style={styles.buttonText}>A1 : Débutant</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="a2/free-content"
        asChild
        style={[styles.button, styles.a2Button]}
      >
        <TouchableOpacity style={[styles.button, styles.a2Button]}>
          <Text style={styles.buttonText}>A2 : Élémentaire</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="b1/free-content"
        asChild
        style={[styles.button, styles.b1Button]}
      >
        <TouchableOpacity style={[styles.button, styles.b1Button]}>
          <Text style={styles.buttonText}>B1 : Intermédiaire</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="b2/free-content"
        asChild
        style={[styles.button, styles.b2Button]}
      >
        <TouchableOpacity style={[styles.button, styles.b2Button]}>
          <Text style={styles.buttonText}>B2 : Intermédiaire Plus</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="c1/free-content"
        asChild
        style={[styles.button, styles.c1Button]}
      >
        <TouchableOpacity style={[styles.button, styles.c1Button]}>
          <Text style={styles.buttonText}>C1 : Avancé</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href="c2/free-content"
        asChild
        style={[styles.button, styles.c2Button]}
      >
        <TouchableOpacity style={[styles.button, styles.c2Button]}>
          <Text style={styles.buttonText}>C2 : Expert</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  a1Button: {
    backgroundColor: theme.colorA1,
  },
  a2Button: {
    backgroundColor: theme.colorA2,
  },
  b1Button: {
    backgroundColor: theme.colorB1,
  },
  b2Button: {
    backgroundColor: theme.colorB2,
  },
  c1Button: {
    backgroundColor: theme.colorC1,
  },
  c2Button: {
    backgroundColor: theme.colorC2,
  },
});
