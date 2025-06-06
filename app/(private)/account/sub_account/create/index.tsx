import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "@theme/theme";
import { supabase } from "@lib/supabase";
import { useRouter } from "expo-router";
import { useUser } from "@providers/UserProvider";

const SubAccountCreateForm = () => {
  const MAX_SUBACCOUNT = 3; // TODO: make this within supabase
  const router = useRouter();
  const { id, subAccounts } = useUser();
  const [newSubAccountNames, setNewSubAccountNames] = useState<string[]>([]);
  const subAcountLess = MAX_SUBACCOUNT - (subAccounts?.length || 0);

  const updateSubAccount = async (key: number, name: string) => {
    setNewSubAccountNames((prev) => {
      const updatedNames = [...prev];
      updatedNames[key] = name;
      return updatedNames;
    });
  };

  const submitSubAccount = async () => {
    try {
      // Insert new sub accounts
      const { data, error } = await supabase
        .from("sub_account")
        .insert(
          newSubAccountNames.map((name) => ({
            sub_account_name: name,
          }))
        )
        .select();

      router.push("/dashboard");
    } catch (error) {
      // TODO: handle errors
      console.error("Error inserting sub accounts:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Ajoutez des joueur(s)</Text>
      <Text style={styles.largeText}>
        Vous pouvez avoir jusqu’à 3 joueurs par compte
      </Text>
      <View style={styles.verticallySpaced}>
        {Array.from({ length: subAcountLess }, (_, index) => (
          <View key={index} style={styles.verticallySpaced}>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                updateSubAccount(index, text.trim().length > 0 ? text : "")
              }
              value={newSubAccountNames[index] || ""}
              placeholder="Joueur"
              autoCapitalize={"none"}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submitSubAccount}>
            <Text style={styles.buttonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubAccountCreateForm;

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
  headingText: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colorBlue,
    textAlign: "center",
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
    marginBottom: 20,
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
    marginTop: 30,
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
