import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";

export function LevelButtons() {
  return (
    <View>
      <TouchableOpacity style={[styles.button, styles.a1Button]}>
        <Text style={styles.buttonText}>A1 : Débutant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.a2Button]}>
        <Text style={styles.buttonText}>A2 : Élémentaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.b1Button]}>
        <Text style={styles.buttonText}>B1 : Intermédiaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.b2Button]}>
        <Text style={styles.buttonText}>B2 : Intermédiaire Plus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.c1Button]}>
        <Text style={styles.buttonText}>C1 : Avancé</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.c2Button]}>
        <Text style={styles.buttonText}>C2 : Expert</Text>
      </TouchableOpacity>
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
