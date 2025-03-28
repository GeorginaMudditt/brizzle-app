import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../theme";

const AwardTable = () => {
  return (
    <View>
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

  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    marginTop: 20,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: theme.colorA1,
  },
});
