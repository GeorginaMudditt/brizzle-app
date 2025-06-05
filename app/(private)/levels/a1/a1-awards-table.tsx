import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { theme } from "@theme/theme";
import { supabase } from "@lib/supabase";
import { Link } from "expo-router";
import { useUser } from "@providers/UserProvider";
import { LinearGradient } from "expo-linear-gradient";

interface IconRow {
  icon: string;
  topic_page: string;
  icon_bronze?: string; // Optional property for bronze icon
}

export default function AwardsTable() {
  const { firstName } = useUser();
  const [icons, setIcons] = useState<IconRow[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const { data, error } = await supabase
          .from("Brizzle_A1_icons")
          .select("icon, topic_page, icon_bronze")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching icons:", error);
          return;
        }

        // console.log("Raw Supabase response:", data);

        // if (!data || data.length === 0) {
        //   console.warn("No data returned from Supabase.");
        // }

        setIcons(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchIcons();
  }, []);

  const renderRow = ({ item }: { item: IconRow }) => {
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
        </View>
        <View style={styles.cell}>
          <Link
            href={{
              pathname: "/levels/a1/a1-topic-details",
              params: { topic: item.topic_page }, // Pass the topic as a parameter
            }}
            style={styles.topicLink}
          >
            {item.topic_page}
          </Link>
        </View>
        <View style={styles.cell}>
          {item.icon_bronze ? (
            <Image source={{ uri: item.icon_bronze }} style={styles.icon} />
          ) : null}
        </View>
        <View style={styles.cell} />
        <View style={styles.cell} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("@assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>Name : {firstName}</Text>
      <Text style={styles.h4}>Progress : Progress bar</Text>

      <FlatList
        data={icons}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.grid}
      />
      <LinearGradient
        colors={["transparent", theme.colorBlue]}
        style={styles.gradient}
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
    marginTop: 20,
  },
  awardsHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
    marginTop: 20,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    textAlign: "center",
  },
  h3: {
    fontSize: 24,
    color: theme.colorBlue,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  h4: {
    color: theme.colorA1,
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    marginBottom: 50,
  },
});
