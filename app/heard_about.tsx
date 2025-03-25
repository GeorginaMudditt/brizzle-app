import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams, useRouter } from "expo-router";

// Asks the user how they heard about the app

//UNRESOLVED ISSUE: If the user types in the "autre" textbox, they have to press the "Continuez" button twice before moving to onboarding2

export default function heard_about() {
  const { username } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const router = useRouter();

  const options = [
    "Carte de visite promotionnelle",
    "Amis ou famille",
    "Cours avec Georgina",
    "École",
    "Moteur de recherche",
    "Google Play ou Apple Store",
    "Autre",
  ];

  const isFormValid = () => {
    if (selectedOption === "Autre") {
      return otherText.trim().length > 0;
    }
    return selectedOption !== "";
  };

  const handleContinue = () => {
    router.push({
      pathname: "/ready",
      params: { username },
    });
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
        <Text style={styles.introText}>
          Une dernière question. Comment avez-vous entendu parler de Brizzle ?
        </Text>
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
        {selectedOption === "Autre" && (
          <TextInput
            style={styles.input}
            placeholder="Veuillez préciser"
            value={otherText}
            onChangeText={setOtherText}
          />
        )}
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
