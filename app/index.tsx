import { useState, useEffect } from "react";
import { useUser } from "@providers/UserProvider";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { Link, useRouter } from "expo-router";
import { useAsyncStorage } from "@hooks/use-async-storage";
import { supabase } from "@lib/supabase";

// Welcome screen for the app
export default function App() {
  const { getItem } = useAsyncStorage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const session = await getItem("session");
        console.log("Session from AsyncStorage:", session);

        if (!session) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const sessionObj = JSON.parse(session);
        const { error } = await supabase.auth.getUser(sessionObj.access_token);

        if (error) {
          console.error("Error fetching user:", error);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          // Redirection immédiate si authentifié
          router.replace("/dashboard");
          return; // Important : on sort de la fonction pour éviter de mettre isLoading à false
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, [getItem, router]);

  // Affichage d'un loading pendant la vérification
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.introText}>Chargement...</Text>
      </View>
    );
  }

  // Si authentifié, on ne devrait pas arriver ici car on a déjà redirigé
  // Mais on peut afficher un loading au cas où
  if (isAuthenticated) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.introText}>Redirection...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("@assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={[styles.introText, styles.introTextHeader]}>
          Bienvenue sur Brizzle
        </Text>
        <Text style={styles.introText}>
          Une application de vocabulaire où vous pouvez progresser en anglais à
          votre rythme et en vous amusant !
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Allons-y !</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
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
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
  introText: {
    textAlign: "center",
    color: theme.colorBlue,
    fontSize: 30,
  },
  introTextHeader: {
    fontSize: 40,
    color: theme.colorBlue,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
