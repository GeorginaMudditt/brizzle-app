import React from "react";
import { theme } from "../../theme";
import { supabase } from "../../lib/supabase";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

export default function SignupEmail() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.emailInput}
          //   onChangeText={(text) => setEmail(text)}
          //   value={email}
          placeholder="Adresse e-mail"
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.emailInput}
          //   onChangeText={(text) => setEmail(text)}
          //   value={email}
          placeholder="Confirmer l'e-mail"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Link href="/signuppassword" asChild>
          <TouchableOpacity
            style={styles.button}
            //   disabled={loading}
            //   onPress={() => signUpWithEmail()}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  emailInput: {
    fontSize: 18,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
    paddingVertical: 0,
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
