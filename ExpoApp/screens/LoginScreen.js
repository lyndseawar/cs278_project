import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Your login logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        //source={require("./path/to/logo.png")} // Replace with your logo image path
        style={styles.logo}
      /> */}
      <Text style={styles.heading}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account yet?</Text>
        <TouchableOpacity>
          <Text style={styles.signupText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  signupText: {
    fontSize: 14,
    color: "#333",
    textDecorationLine: "underline",
  },
});
