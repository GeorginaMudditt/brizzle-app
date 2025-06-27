import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { supabase } from "@lib/supabase";
import { Link } from "expo-router";
import { useUser } from "@providers/UserProvider";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const { id } = useUser();
  type Player = {
    id: string;
    sub_account_name: string;
    // add other fields from your "sub_account" table as needed
  };
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("sub_account")
        .select("*")
        .eq("user_id", id); // Only fetch sub-accounts for this user
      if (!error) setPlayers(data);
    };
    fetchPlayers();
  }, [id]);

  return (
    <View style={styles.container}>
      //{" "}
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Coucou 👋</Text>{" "}
      <Text style={styles.largeText}>Qui joue ?</Text>
      <View style={styles.buttonContainer}>
        {players.map((player) => (
          <TouchableOpacity style={styles.button} key={player.id}>
            <Text style={styles.buttonText}>{player.sub_account_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// const Dashboard = () => {
//   const { firstName, subAccounts } = useUser();
//   const router = useRouter();

//   if (subAccounts?.length === 0) {
//     router.push("/account/sub_account/create");
//     return;
//   }

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
    fontSize: 30,
    fontWeight: "bold",
    color: theme.colorBlue,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
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
    alignItems: "center",
    marginTop: 50,
    flex: 1,
    gap: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  text: {
    color: theme.colorBlue,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
