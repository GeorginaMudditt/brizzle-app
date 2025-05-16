import React from "react";
import { theme } from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase } from "../../lib/supabase";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

export default function SignupEmail() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/brizzle-insta-square.png")}
        style={styles.logoWithName}
      />
      <View style={[styles.verticallySpaced, styles.inputContainer]}>
        <TextInput
          style={styles.passwordInput}
          // onChangeText={(text) => setPassword(text)}
          // value={password}
          // secureTextEntry={!showPassword}
          placeholder="Mot de passe"
          autoCapitalize={"none"}
        />
        {/* <TouchableOpacity 
        onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.verticallySpaced, styles.inputContainer]}>
        <TextInput
          style={styles.passwordInput}
          //   onChangeText={(text) => setConfirmPassword(text)}
          //   value={confirmPassword}
          //   secureTextEntry={!showConfirmPassword}
          placeholder="Confirmer le mot de passe"
          autoCapitalize={"none"}
        />
        {/* <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.verticallySpaced}>
        <Link href="../dashboard" asChild>
          <TouchableOpacity
            style={styles.button}
            //   disabled={loading}
            //   onPress={() => signUpWithEmail()}
          >
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 150,
    paddingHorizontal: 50,
  },
  logoWithName: {
    width: 180,
    height: 180,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 50,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colorBlue,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 0,
  },
  eyeIcon: {
    marginLeft: 10,
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
