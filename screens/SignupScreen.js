import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform your sign-up logic here, e.g., save user data to a backend server
    console.log('User signed up with email:', email);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Sign Up</Text> */}
      <Text style={styles.appName}>Plates</Text>
      <Text style={styles.tagline}>Find your perfect match</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontStyle: "italic",
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
    backgroundColor: "plum",
    padding: 16,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkText: {
    fontSize: 14,
    color: "#333",
    textDecorationLine: "underline",
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
});
