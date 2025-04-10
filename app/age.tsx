import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams, useRouter } from "expo-router";

// Asks the user how old they are

export default function Age() {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();

  const options = [
    "moins de 8 ans",
    "de 9 à 11 ans",
    "de 12 à 14 ans",
    "de 15 à 17 ans",
    "de 18 à 25 ans",
    "26 ans et plus",
    "Je préfère ne pas dire",
  ];

  const handleContinue = () => {
    router.push("/password");
  };

  const isFormValid = () => {
    return selectedOption !== "";
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={100}
        enableOnAndroid={true}
      >
        <Image
          source={require("../assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={styles.introText}>Quel age avez vous ?</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.option}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
            {selectedOption === option && (
              <Ionicons name="checkmark" size={24} color={theme.colorBlue} />
            )}
          </TouchableOpacity>
        ))}
        {isFormValid() && (
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuez</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  introText: {
    color: theme.colorBlue,
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colorBlue,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: theme.colorBlue,
  },
  optionText: {
    color: theme.colorBlue,
    fontSize: 18,
  },
  input: {
    fontSize: 18,
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: theme.colorBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: theme.colorGrey,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
