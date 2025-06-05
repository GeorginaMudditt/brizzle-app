import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme/theme";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { supabase } from "@lib/supabase";

interface TopicDetails {
  icon_bronze: string;
  icon_silver: string;
  icon_gold: string;
  topic_french: string;
}

export default function TopicDetails() {
  const { topic } = useLocalSearchParams();
  const router = useRouter();
  const [icons, setIcons] = useState<TopicDetails | null>(null);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const { data, error } = await supabase
          .from("Brizzle_A1_icons")
          .select("icon_bronze, icon_silver, icon_gold, topic_french")
          .eq("topic_page", topic) // Filter by the topic
          .single(); // Fetch a single row

        if (error) {
          console.error("Error fetching topic details:", error);
          return;
        }

        setIcons(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchIcons();
  }, [topic]);

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("@assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.headingText}>Bienvenue dans le thème "{topic}"</Text>
      <Text style={styles.largeText}>
        Vous allez apprendre du vocabulaire lié à "{topic}" (
        <Text style={styles.italic}>{icons?.topic_french}</Text>)
      </Text>
      <Text style={styles.smallText}>
        Lorsque vous terminez les 3 défis, vous serez récompensé avec ces icônes
        sur votre tableau des récompenses:
      </Text>
      {icons && (
        <View style={styles.iconsContainer}>
          <Image source={{ uri: icons.icon_bronze }} style={styles.icon} />
          <Image source={{ uri: icons.icon_silver }} style={styles.icon} />
          <Image source={{ uri: icons.icon_gold }} style={styles.icon} />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: "/levels/a1/a1-bronze",
            params: { topic },
          });
        }}
      >
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
      <Link href="./a1-awards-table" asChild>
        <Text style={styles.backToAwards}>
          Retour au tableau des récompenses A1
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  awardsHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
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
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    marginTop: 20,
    textAlign: "center",
  },
  h3: {
    fontSize: 24,
    color: theme.colorBlue,
    margin: 20,
    textAlign: "center",
  },
  italic: {
    fontStyle: "italic",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: theme.colorA1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  backToAwards: {
    padding: 30,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
