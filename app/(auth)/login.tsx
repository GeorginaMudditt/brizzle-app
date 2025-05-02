import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import "react-native-url-polyfill/auto";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Link href="/signup">Créer un compte</Link>
      <Link href="/signin">Se connecter</Link>
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
  logoWithName: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 20,
  },
});
