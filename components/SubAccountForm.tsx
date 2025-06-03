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

// TODO: use supabase types generator
export type subAccount = {
  id: string;
  sub_account_name: string;
};

export const SubAccountForm = () => {
  const maxSubAccounts = 3; // TODO: make this within supabase
  const router = useRouter();
  const { id } = useUser();

  const [subAccounts, setSubAccounts] = useState<subAccount[]>([
    {
      id: "new-1",
      sub_account_name: "",
    },
    {
      id: "new-2",
      sub_account_name: "",
    },
    {
      id: "new-3",
      sub_account_name: "",
    },
  ]);

  const retrieveSubAccountsFromSupabase = async () => {
    const { data, error } = await supabase
      .from("sub_account")
      .select("id, sub_account_name")
      .eq("user_id", id);
    if (error) {
      console.error("Error retrieving sub accounts:", error);
      return [];
    }
    return data as subAccount[];
  };

  const updateSubAccount = async (subAccountId: string, name: string) => {
    setSubAccounts((prev: any) =>
      prev.map((subAccount: subAccount) =>
        subAccount.id === subAccountId
          ? { ...subAccount, sub_account_name: name }
          : subAccount
      )
    );
  };

  const submitSubAccount = async () => {
    // if subaccounts have id "new-1", "new-2", "new-3", then we need to insert them
    const newSubAccounts = subAccounts.filter((subAccount) =>
      subAccount.id.startsWith("new-")
    );

    if (newSubAccounts.length > maxSubAccounts) {
      console.error(
        `You can only create up to ${maxSubAccounts} sub accounts.`
      );
      return;
    }

    try {
      // Insert new sub accounts
      const { data, error } = await supabase.from("sub_account").insert(
        newSubAccounts.map((subAccount) => ({
          sub_account_name: subAccount.sub_account_name,
        }))
      );
      await supabase.from("sub_account").update(subAccounts);

      router.push("/dashboard");
    } catch (error) {
      // TODO: handle error
      console.error("Error inserting sub accounts:", error);
    }
  };

  useEffect(() => {
    const fetchSubAccounts = async () => {
      const subAccounts = await retrieveSubAccountsFromSupabase();
      if (subAccounts.length > 0) {
        setSubAccounts(subAccounts);
      } else {
        console.log("No sub accounts found for this user.");
      }
    };

    fetchSubAccounts();
  }, [id]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Créez jusqu'à 3 profils 👍</Text>

      <View style={styles.verticallySpaced}>
        {subAccounts.map((subAccount, index) => (
          <View key={index} style={styles.verticallySpaced}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => updateSubAccount(subAccount.id, text)}
              value={subAccounts[index]?.sub_account_name || ""}
              placeholder={`Nom du profil ${index + 1}`}
              autoCapitalize={"none"}
            />
          </View>
        ))}
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
