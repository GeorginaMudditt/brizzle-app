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

export const SubAccountForm = () => {
  const router = useRouter();

  const [subAccountName1, setSubAccountName1] = useState("");
  const [subAccountName2, setSubAccountName2] = useState("");
  const [subAccountName3, setSubAccountName3] = useState("");

  const submitSubAccount = async () => {
    const subAccountsToCreate = () => {
      const subAccounts = [];
      if (subAccountName1)
        subAccounts.push({
          sub_account_name: subAccountName1,
        });
      if (subAccountName2)
        subAccounts.push({
          sub_account_name: subAccountName2,
        });
      if (subAccountName3)
        subAccounts.push({
          sub_account_name: subAccountName3,
        });

      return subAccounts;
    };

    const subAccounts = subAccountsToCreate();

    console.log("Sub accounts to create:", subAccounts);

    try {
      await supabase.from("sub_account").insert(subAccounts);

      router.push("/dashboard");
    } catch (error) {
      // TODO: handle error
      console.error("Error inserting sub accounts:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Créez jusqu'à 3 profils 👍</Text>

      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSubAccountName1(text)}
          value={subAccountName1}
          placeholder="Nom du profil 1"
          autoCapitalize={"none"}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setSubAccountName2(text)}
          value={subAccountName2}
          placeholder="Nom du profil 2"
          autoCapitalize={"none"}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setSubAccountName3(text)}
          value={subAccountName3}
          placeholder="Nom du profil 3"
          autoCapitalize={"none"}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submitSubAccount}>
            <Text style={styles.buttonText}>Créer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/levels")}
          >
            <Text style={styles.buttonText}>Go to levels (temp)</Text>
          </TouchableOpacity>
        </View>
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
