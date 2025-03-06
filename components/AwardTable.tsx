import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../theme";

const AwardTable = () => {
  return (
    <View>
      <Text style={styles.tableHeaderTitle}>Récompenses de "Name" :</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Topic</Text>
        <Text style={styles.tableHeaderText}>Bronze</Text>
        <Text style={styles.tableHeaderText}>Silver</Text>
        <Text style={styles.tableHeaderText}>Gold</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
      <View style={styles.tableRow}>
        <Text>icon</Text>
        <Text>*</Text>
        <Text>*</Text>
        <Text>*</Text>
      </View>
    </View>
  );
};

export default AwardTable;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tableHeader: {
    backgroundColor: theme.colorA1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  tableHeaderTitle: {
    fontSize: 16,
    color: "white",
    backgroundColor: theme.colorA1,
    textAlign: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: theme.colorA1,
  },
  tableHeaderText: {
    color: "white",
    fontSize: 16,
    padding: 10,
  },
});
