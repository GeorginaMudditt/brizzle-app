import { useState } from "react";
import { supabase } from "@lib/supabase";
import { theme } from "@theme/theme";
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
import { useUser } from "@providers/UserProvider";
import { useAsyncStorage } from "@hooks/use-async-storage";

// User can sign in with email and password

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const { setItem } = useAsyncStorage();

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
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
        const jsonValue = JSON.stringify(data.session);
        await setItem("session", jsonValue);

        const subAccount = (
          await supabase
            .from("sub_account")
            .select("*")
            .eq("user_id", data?.user?.id)
        ).data;

        const formattedSubAccount = subAccount?.map((sub) => ({
          id: sub.id,
          subAccountName: sub.sub_account_name,
        }));

        if (data?.user) {
          setUser({
            id: data.user.id,
            firstName: data.user.user_metadata.first_name,
            lastName: data.user.user_metadata.last_name,
            email: data.user.user_metadata.email,
            subAccounts: formattedSubAccount,
          });

          const marketing = await supabase
            .from("marketing")
            .select("*")
            .eq("user_id", data.user.id);
          if (
            !subAccount ||
            (Array.isArray(subAccount) && subAccount.length === 0)
          ) {
            router.push("/account/sub_account/create");
          } else if (marketing?.data?.length === 0) {
            router.push("/marketing/firstSignInForm");
          } else {
            router.push("/dashboard");
          }
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
      <Link href="/login" asChild>
        <Icon name="arrow-back-circle" style={styles.arrowIcon} />
      </Link>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
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
          <Text>TO DO: forgotten your password link</Text>
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
    paddingVertical: 150,
    paddingHorizontal: 50,
  },
  logoWithName: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 30,
  },
  arrowIcon: {
    position: "absolute",
    top: 80,
    left: 50,
    fontSize: 40,
    color: theme.colorBlue,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    // marginVertical: 10,
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
    marginTop: 50,
    flex: 1,
    // gap: 20,
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
