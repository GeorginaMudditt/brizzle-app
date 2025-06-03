import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "@theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { departements, countries } from "./locationList";
import { supabase } from "@lib/supabase";

export default function FirstSignInMarketingForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const [step, setStep] = useState(1);

  const options = [
    "Google Play ou Apple Store",
    "Facebook",
    "Instagram",
    "Amis ou famille",
    "École",
    "Autre",
  ];

  const isFormValid = () => {
    if (selectedOption === "Autre") {
      return otherText.trim().length > 0;
    }
    return selectedOption !== "";
  };

  const handleNext = () => {
    if (step === 1) {
      if (isFormValid()) {
        setStep(2);
      } else {
        alert("Veuillez sélectionner une option ou entrer un texte.");
      }
    } else if (step === 2) {
      // Optionally, you can validate the location selection here
      router.push("/dashboard");
    }
  };

  const handleSubmit = async () => {
    await supabase.from("marketing").insert({
      heard_about: selectedOption === "Autre" ? otherText : selectedOption,
      location: selectedDepartment || selectedCountry,
    });

    router.push("/dashboard");
  };

  return step === 1 ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={100}
        enableOnAndroid={true}
      >
        <Image
          source={require("@assets/brizzle-insta-square.png")}
          style={styles.logoWithName}
        />
        <Text style={styles.headingText}>Une petite question</Text>
        <Text style={styles.largeText}>
          Comment avez-vous entendu parler de Brizzle ?
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
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continuez</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.container}>
      <Image
        source={require("@assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <Text style={styles.headingText}>Une dernière question</Text>
      <Text style={styles.largeText}>Où habitez-vous ?</Text>
      <Text style={styles.largeText}>🇫🇷 France & DOM</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={(itemValue) => {
            setSelectedDepartment(itemValue);
            if (itemValue) setSelectedCountry("");
          }}
        >
          <Picker.Item label="Sélectionnez un département" value="" />
          {departements.map((dep) => (
            <Picker.Item key={dep} label={dep} value={dep} />
          ))}
        </Picker>
      </View>
      <Text style={styles.largeText}>ou</Text>
      <Text style={styles.largeText}>🌏 un autre pays</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => {
            setSelectedCountry(itemValue);
            if (itemValue) setSelectedDepartment("");
          }}
        >
          <Picker.Item label="Sélectionnez un pays" value="" />
          {countries.map((country) => (
            <Picker.Item key={country} label={country} value={country} />
          ))}
        </Picker>
      </View>
      {(!!selectedDepartment || !!selectedCountry) && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continuez</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colorBlue,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
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
    width: "100%",
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
  pickerContainer: {
    borderColor: theme.colorBlue,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
  },
});
