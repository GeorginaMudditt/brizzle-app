import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Link } from "expo-router";

interface IconRow {
  icon: string;
  topic_page: string;
}

export default function AwardsTable() {
  const { username } = useLocalSearchParams();
  const [icons, setIcons] = useState<IconRow[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const { data, error } = await supabase
          .from("Brizzle_A1_icons")
          .select("icon, topic_page")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching icons:", error);
          return;
        }

        console.log("Raw Supabase response:", data);

        if (!data || data.length === 0) {
          console.warn("No data returned from Supabase.");
        }

        setIcons(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchIcons();
  }, []);

  const renderRow = ({ item }: { item: IconRow }) => {
    console.log("Rendering row for icon and topic:", item);
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
        </View>
        <View style={styles.cell}>
          <Link
            href={{
              pathname: "/a1/a1-topic-details",
              params: { topic: item.topic_page }, // Pass the topic as a parameter
            }}
            style={styles.topicLink}
          >
            {item.topic_page}
          </Link>
        </View>
        <View style={styles.cell} />
        <View style={styles.cell} />
        <View style={styles.cell} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>Name : {username}</Text>
      <Text style={styles.h3}>Progress : Progress bar</Text>
      <FlatList
        data={icons}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.grid}
      />
      <Text style={styles.h3}>Share</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  awardsHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
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
  grid: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 50,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: theme.colorA1,
    height: 50,
    alignItems: "center",
  },
  cell: {
    width: "20%",
  },
  icon: {
    width: 40,
    height: 40,
  },
  topicLink: {
    fontSize: 12,
    color: theme.colorBlue,
    textDecorationLine: "underline",
  },
});
