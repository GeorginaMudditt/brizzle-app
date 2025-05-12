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

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);

    if (password !== confirmPassword) {
      Alert.alert("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    if (firstName === "" || lastName === "") {
      Alert.alert("Nom et Prénom sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
          Alert.alert(
            "Cette adresse e-mail est déjà associée à un compte. Veuillez vous connecter."
          );
        } else if (error.message.toLowerCase().includes("invalid email")) {
          Alert.alert(
            "Nous n'avons pas pu envoyer un e-mail à cette adresse. Veuillez saisir une adresse e-mail valide."
          );
        } else {
          Alert.alert(
            "Erreur lors de la création du compte : " + error.message
          );
        }
      } else {
        Alert.alert(
          "Félicitations ! Votre compte a été créé avec succès.",
          "Un e-mail de confirmation a été envoyé à " + email,
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/signin");
              },
            },
          ]
        );
      }
    } catch (err) {
      Alert.alert("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false); // ✅ Spinner stops here too
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

          <View style={styles.verticallySpaced}>
            <TextInput
              style={styles.emailInput}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              placeholder="Prénom"
            />
          </View>

          <View style={styles.verticallySpaced}>
            <TextInput
              style={styles.emailInput}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              placeholder="Nom"
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

          <View style={[styles.verticallySpaced, styles.inputContainer]}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirmer le mot de passe"
              autoCapitalize={"none"}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? "eye-off" : "eye"}
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
              onPress={() => signUpWithEmail()}
            >
              <Text style={styles.buttonText}>Créer un compte</Text>
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
