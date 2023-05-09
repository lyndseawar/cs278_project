import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";


// Fake user data to be replaced by Supabase data later...
const userData = [
    { id: 1, email: 'user1@example.com', password: 'password1', name: 'User One' },
    { id: 2, email: 'user2@example.com', password: 'password2', name: 'User Two' },
    { id: 3, email: 'user3@example.com', password: 'password3', name: 'User Three' },
  ];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
    const user = userData.find(u => u.email === email && u.password === password);
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        //source={require("./path/to/logo.png")} // Replace with your logo image path
        style={styles.logo}
      /> */}

      {loggedInUser && (
        <Text style={styles.loggedinText}>Logged in as {loggedInUser.name}</Text>
      )}

      <Text style={styles.appName}>Plates</Text>
      <Text style={styles.tagline}>Find your perfect match</Text>
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
