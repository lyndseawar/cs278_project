import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

//You'll need to install the following packages:
//expo install react-navigation react-navigation-stack
//react - navigation - tabs react - native - gesture - handler react - native - reanimated react - native - screens react - native - safe - area - context @react-native - community / masked - view

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Your login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 8,
    margin: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
