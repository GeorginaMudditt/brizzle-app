import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { theme } from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../providers/UserProvider";

// User can sign in with email and password

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();

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
        const supabaseUser = (await supabase.auth.getUser()).data.user;

        if (supabaseUser) {
          console.log("User data:", supabaseUser.user_metadata);
          setUser({
            id: supabaseUser.id,
            firstName: supabaseUser.user_metadata.first_name,
            lastName: supabaseUser.user_metadata.last_name,
            email: supabaseUser.user_metadata.email,
          });
          router.push("/dashboard/whichuser");
        } else {
          Alert.alert(
            "Erreur lors de la récupération des informations utilisateur."
          );
        }
      }
    } catch (err) {
      Alert.alert("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false); // ✅ Spinner stops here in all cases
    }
  }

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Icon name="arrow-back-circle" style={styles.arrowIcon} />
      </Link>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
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

          <View style={styles.buttonContainer}>
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
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 150,
    paddingHorizontal: 50,
  },
  arrowIcon: {
    position: "absolute",
    top: 80,
    left: 50,
    fontSize: 40,
    color: theme.colorBlue,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 50,
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
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 20,
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
