import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { theme } from "@theme/theme";
import { isEmail } from "@lib/tools";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase } from "@lib/supabase";

const steps = ["userName", "email", "password", "success"] as const;
type Steps = (typeof steps)[number];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Steps>("userName"); // handle the view

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserNameSubmit = () => {
    if (formValues.firstName && formValues.lastName) {
      setStep("email");
    } else {
      alert("Un nom et un prénom sont requis");
    }
  };

  const handleEmailSubmit = () => {
    if (formValues.email && formValues.confirmEmail) {
      // check if email and confirmEmail are not empty
      if (formValues.email === formValues.confirmEmail) {
        // check if email and confirmEmail are the same
        if (isEmail(formValues.email)) {
          // check if email is valid
          setStep("password");
        } else {
          alert("L'adresse e-mail n'est pas valide");
        }
      } else {
        alert("Les adresses e-mail ne correspondent pas");
      }
    } else {
      alert("Une adresse e-mail est requise");
    }
  };

  const handlePasswordSubmit = () => {
    if (formValues.password && formValues.confirmPassword) {
      // check if password and confirmPassword are not empty
      if (formValues.password === formValues.confirmPassword) {
        // check if password and confirmPassword are the same
        if (formValues.password.length >= 6) {
          // check if password is at least 6 characters long
          signUpWithEmail();
        } else {
          alert("Le mot de passe doit contenir au moins 6 caractères");
        }
      } else {
        alert("Les mots de passe ne correspondent pas");
      }
    } else {
      alert("Un mot de passe est requis");
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formValues.email,
        password: formValues.password,
        options: {
          data: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
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
        setStep("success");
      }
    } catch (err) {
      Alert.alert("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false); // ✅ Spinner stops here too
    }
  };

  return (
    <View style={styles.container}>
      {step === "userName" && (
        <Link href="/login" asChild>
          <Icon name="arrow-back-circle" style={styles.arrowIcon} />
        </Link>
      )}
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Créez votre compte</Text>
      <View style={styles.horizontallySpaced}>
        {/* User Name Step */}
        <TouchableOpacity
          onPress={() => setStep("userName")}
          disabled={step === "userName"}
        >
          <Icon
            name="person"
            size={28}
            color={step === "userName" ? theme.colorRed : theme.colorBlue}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.smallText}>Étape 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Only allow going back, not forward
            if (step === "email" || step === "password" || step === "success")
              setStep("email");
          }}
          disabled={step === "userName"}
        >
          {/* Email Step */}
          <Icon
            name="mail"
            size={28}
            color={step === "email" ? theme.colorRed : theme.colorBlue}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.smallText}>Étape 2</Text>
        </TouchableOpacity>

        {/* Password Step */}
        <View>
          <Icon
            name="lock-closed"
            size={28}
            color={step === "password" ? theme.colorRed : theme.colorBlue}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.smallText}>Étape 3</Text>
        </View>
      </View>

      {/* ============================
          USER FIRSTNAME AND LASTNAME 
         =============================*/}
      <View style={styles.verticallySpaced}>
        {step === "userName" ? (
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormValues({ ...formValues, firstName: text })
              }
              value={formValues.firstName}
              placeholder="Prénom"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormValues({ ...formValues, lastName: text })
              }
              value={formValues.lastName}
              placeholder="Nom"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleUserNameSubmit}
            >
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </>
        ) : step === "email" ? (
          // ====================
          //       EMAIL
          // ====================
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormValues({ ...formValues, email: text })
              }
              value={formValues.email}
              placeholder="Adresse e-mail"
              autoCapitalize={"none"}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormValues({ ...formValues, confirmEmail: text })
              }
              value={formValues.confirmEmail}
              placeholder="Confirmer l'e-mail"
              autoCapitalize={"none"}
            />
            <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </>
        ) : step === "password" ? (
          // ====================
          //       PASSWORD
          // ====================
          loading ? (
            <ActivityIndicator
              size={100}
              color={theme.colorBlue}
              style={{ marginVertical: 30 }}
            />
          ) : (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setFormValues({ ...formValues, password: text })
                  }
                  value={formValues.password}
                  secureTextEntry={!showPassword}
                  placeholder="Mot de passe"
                  autoCapitalize={"none"}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setFormValues({ ...formValues, confirmPassword: text })
                  }
                  value={formValues.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirmer le mot de passe"
                  autoCapitalize={"none"}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handlePasswordSubmit}
              >
                <Text style={styles.buttonText}>Créer mon compte</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          // ====================
          //       SUCCESS
          // ====================
          <>
            <Text style={styles.headingText}>
              Votre compte à bien été créé! 🎉
            </Text>
            <Text style={styles.largeText}>
              Pour confirmer votre adresse e-mail, veuillez consulter votre
              boîte de réception à l'adresse suivante : {formValues.email}
            </Text>
            <Text style={styles.smallText}>
              Si vous ne trouvez pas l'e-mail, vérifiez votre dossier de spam.
              Si vous n'arrivez pas à vous connecter, n'hésitez pas à nous
              contacter à l'adresse suivante : hello@brizzle-english.com
            </Text>
            <Link href="/signin" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Me connecter</Text>
              </TouchableOpacity>
            </Link>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 23,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colorBlue,
    textAlign: "center",
    marginBottom: 20,
  },
  largeText: {
    color: theme.colorBlue,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  smallText: {
    color: theme.colorBlue,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
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
  input: {
    fontSize: 18,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
    paddingVertical: 0,
  },
  passwordContainer: {
    position: "relative",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  horizontallySpaced: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default Signup;
