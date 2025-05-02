import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { theme } from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";

import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          Alert.alert("Adresse e-mail ou mot de passe incorrect");
        } else if (
          error.message.toLowerCase().includes("email not confirmed")
        ) {
          Alert.alert(
            "Veuillez vérifier votre adresse e-mail avant de vous connecter."
          );
        } else {
          Alert.alert("Erreur lors de la connexion : " + error.message);
        }
      } else {
        router.push({
          pathname: "/levels",
        });
      }
    } catch (err) {
      Alert.alert("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false); // ✅ Spinner stops here in all cases
    }
  }

  return (
    <View style={styles.container}>
      <Link href="/login" asChild>
        Back
      </Link>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colorBlue}
          style={{ marginBottom: 20 }}
        />
      ) : (
        <>
          <View style={styles.verticallySpaced}>
            <TextInput
              style={styles.emailInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Adresse e-mail"
              autoCapitalize={"none"}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.inputContainer]}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
              placeholder="Mot de passe"
              autoCapitalize={"none"}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#888"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.verticallySpaced}>
            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={() => signInWithEmail()}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
  },

  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 0,
  },

  eyeIcon: {
    marginLeft: 10,
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
