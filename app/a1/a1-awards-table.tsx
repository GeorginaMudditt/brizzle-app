import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

interface IconRow {
  icon: string;
}

export default function AwardsTable() {
  const { username } = useLocalSearchParams();
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const { data, error } = await supabase.rpc("raw_sql", {
        sql: `SELECT icon FROM "Brizzle_A1_icons"`,
      });

      if (error) {
        console.error("Error fetching icons:", error);
        return;
      }

      console.log("Raw Supabase response:", data);
      if (data.length === 0) {
        console.warn("No data returned from Supabase.");
      }

      setIcons(data.map((row: IconRow) => row.icon));
    };

    fetchIcons();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>Récompenses de {username}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Topic</Text>
        <Text style={styles.tableHeaderText}>Bronze</Text>
        <Text style={styles.tableHeaderText}>Silver</Text>
        <Text style={styles.tableHeaderText}>Gold</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {icons.length > 0 ? (
          icons.map((iconUrl, index) => (
            <View key={index} style={styles.iconRow}>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
            </View>
          ))
        ) : (
          <Text style={styles.introTextHeader}>No icons available</Text>
        )}
      </ScrollView>
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
  tableHeader: {
    backgroundColor: theme.colorA1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    borderRadius: 5,
  },
  tableHeaderText: {
    color: "white",
    fontSize: 16,
    padding: 10,
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
  scrollView: {
    width: "90%",
    marginTop: 20,
  },
  iconRow: {
    marginBottom: 10,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
