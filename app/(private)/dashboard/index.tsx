import { Image, Text, View, StyleSheet } from "react-native";
import { theme } from "@theme/theme";
import { useUser } from "@providers/UserProvider";
import { SubAccountForm } from "@components/SubAccountForm";

const Dashboard = () => {
  const { firstName, subAccounts } = useUser();

  if (subAccounts?.length === 0) {
    return <SubAccountForm />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Bienvenue {firstName} 👋</Text>{" "}
      <Text style={styles.largeText}>Qui joue ?</Text>
      <View style={styles.buttonContainer}>
        {subAccounts?.map((account) => (
          <View key={account.id}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{account.subAccountName}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Dashboard;

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
    // gap: 20,
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
