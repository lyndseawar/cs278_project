import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email address");
      return;
    }

    // Add your logic for creating a new account here
    console.log("Email:", email);
    console.log("Password:", password);

    // If account creation is successful, navigate to the profile screen
    navigation.navigate("Profile");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Platedate</Text>
        <Text style={styles.tagline}>
          the best way to set your next platonic date
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          placeholder="Confirm your password"
          placeholderTextColor="#aaa"
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backButtonText}>Already have an account? Login!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  titleContainer: {
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontFamily: "Poppins-Bold",
  },
  tagline: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    padding: 10,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: width * 0.1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4B0082",
    marginBottom: 30,
    paddingLeft: 2,
    fontSize: 16,
    width: width * 0.8,
  },
  loginButton: {
    width: width * 0.4,
    backgroundColor: "#4B0082",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 50,
  },
  loginButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  backButtonText: {
    fontSize: 16,
    color: "#4B0082",
    marginTop: 12,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height / 8,
  },
});

export default SignupScreen;
