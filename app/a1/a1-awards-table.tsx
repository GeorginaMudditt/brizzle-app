import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import AwardTable from "../../components/AwardTable";

export default function AwardsTable() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

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
      <AwardTable />
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
});
