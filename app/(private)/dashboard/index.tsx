import { useState } from "react";
import {
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { supabase } from "@lib/supabase";
import { theme } from "@theme/theme";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  const onSubmit = async () => {
    const { error } = await supabase
      .from("sub_account")
      .insert({ user_name: userName });

    if (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.userInput}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Nom d'utilisateur 1"
          autoCapitalize={"none"}
        />
      </View>
      <Icon name="add-circle-outline" style={styles.plusIcon} />
      <Link href="/dashboard/whichuser" asChild>
        <TouchableOpacity
          style={styles.button}
          // disabled={loading}
          // onPress={() => signUpWithEmail()}
        >
          <Text style={styles.buttonText}>Confirmer utilisateur(s)</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Dashboard;

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
    marginBottom: 50,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  plusIcon: {
    fontSize: 40,
    color: theme.colorBlue,
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
  userInput: {
    fontSize: 18,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
    paddingVertical: 0,
  },
});
