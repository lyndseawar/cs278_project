import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormErrorMessage } from "../components/FormErrorMessage";
import { auth } from "../config";
import { signupValidationSchema } from "../utils";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const createUserDocument = async (user, additionalData) => {
  if (!user) return;
  //get a reference to the place in the database where a user profile might be
  const userRef = doc(db, "users", user.uid);
  //go and fetch a document from that location
  const snapshot = await getDoc(userRef);
  //if there isn't any data there, create it
  if (!snapshot.exists()) {
    const { displayName, 
            joinDate, 
            thisYear, 
            showerThought, 
            nerdiestThing, 
            favoriteActivity 
          } = additionalData;
    try {
      await setDoc(userRef, {
        displayName,
        email: user.email,
        joinDate,
        thisYear,
        showerThought,
        nerdiestThing,
        favoriteActivity,
        //any other data that we want to store
      });
      return getUserDocument(user.uid);
    } catch (error) {
      console.error("Error creating user document", error);
      return null;
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await getDoc(doc(db, "users", uid));
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const { width, height } = Dimensions.get("window");

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const formik = useFormik({
    initialValues: {
      // login data
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",

      //profile data
      thisYear: "",
      showerThought: "",
      nerdiestThing: "",
      favoriteActivity: "",

      // extra data
      joinDate: new Date(), //current data
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => handleSignup(values),
  });

  const handleSignup = async (values) => {
    const { email, 
            password, 
            firstName, 
            lastName, 
            thisYear, 
            showerThought, 
            nerdiestThing, 
            favoriteActivity 
          } = values;
    const displayName = `${firstName} ${lastName}`;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await createUserDocument(user, {
        displayName,
        joinDate: new Date().toDateString(),
        thisYear,
        showerThought,
        nerdiestThing,
        favoriteActivity,
      });
      if (!userDoc) {
        Alert.alert("Error", "Something went wrong signing up");
        setErrorState("Error creating user document");
      }
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* title container */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Platedate</Text>
        <Text style={styles.tagline}>
          the best way to set your next platonic date
        </Text>
      </View>
      {/* signup container */}
      <View style={styles.inputContainer}>
        <ScrollView style={styles.scroll}>
          {/* Input fields */}
          <TextInput
            style={styles.input}
            name="firstName"
            placeholder="First Name"
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            value={formik.values.firstName}
          />
          <FormErrorMessage
            error={formik.errors.firstName}
            visible={formik.touched.firstName}
          />
          <TextInput
            style={styles.input}
            name="lastName"
            placeholder="Last Name"
            autoCapitalize="none"
            onChangeText={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            value={formik.values.lastName}
          />
          <FormErrorMessage
            error={formik.errors.lastName}
            visible={formik.touched.lastName}
          />

          <TextInput
            style={styles.input}
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
          />
          <FormErrorMessage
            error={formik.errors.email}
            visible={formik.touched.email}
          />

          <TextInput
            style={styles.input}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
          />
          <FormErrorMessage
            error={formik.errors.password}
            visible={formik.touched.password}
          />

          <TextInput
            style={styles.input}
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            value={formik.values.confirmPassword}
          />
          <FormErrorMessage
            error={formik.errors.confirmPassword}
            visible={formik.touched.confirmPassword}
          />

          <TextInput
            style={styles.input}
            name="favoriteActivity"
            placeholder="Some of my favorite activities are..."
            autoCapitalize="none"
            onChangeText={formik.handleChange("favoriteActivity")}
            onBlur={formik.handleBlur("favoriteActivity")}
            value={formik.values.favoriteActivity}
          />
          <FormErrorMessage
            error={formik.errors.thisYear}
            visible={formik.touched.thisYear}
          />

          <TextInput
            style={styles.input}
            name="thisYear"
            placeholder="This year I want to ... "
            autoCapitalize="none"
            onChangeText={formik.handleChange("thisYear")}
            onBlur={formik.handleBlur("thisYear")}
            value={formik.values.thisYear}
          />
          <FormErrorMessage
            error={formik.errors.thisYear}
            visible={formik.touched.thisYear}
          />

          <TextInput
            style={styles.input}
            name="showerThought"
            placeholder="A shower thought I recently had ..."
            autoCapitalize="none"
            onChangeText={formik.handleChange("showerThought")}
            onBlur={formik.handleBlur("showerThought")}
            value={formik.values.showerThought}
          />
          <FormErrorMessage
            error={formik.errors.showerThought}
            visible={formik.touched.showerThought}
          />

          <TextInput
            style={styles.input}
            name="nerdiestThing"
            placeholder="The nerdiest thing about me is that ..."
            autoCapitalize="none"
            onChangeText={formik.handleChange("nerdiestThing")}
            onBlur={formik.handleBlur("nerdiestThing")}
            value={formik.values.nerdiestThing}
          />
          <FormErrorMessage
            error={formik.errors.nerdiestThing}
            visible={formik.touched.nerdiestThing}
          />

          {/* These add spacing so that the keybaord doesn't block the text box */}
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>


          {/* Display Screen Error Messages */}
          {errorState !== "" && (
            <FormErrorMessage error={errorState} visible={true} />
          )}
        </ScrollView>

        {/* Signup button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>

        {/* bottom container */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.backButtonText}>
              Already have an account? Login!
            </Text>
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
    height: height * 0.25,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow"
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
  scroll: {
    // backgroundColor: "pink",
    paddingTop: 20,
    width: "100%"
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
    padding: 10,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4B0082",
    marginBottom: 20,
    paddingLeft: 2,
    fontSize: 16,
    width: width * 0.8,
    paddingTop: 10,
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
    // flex: 1,
    height: height * 0.2,
    //justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "cyan"
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
    fontFamily: "Poppins-Regular",
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4B0082",
    marginBottom: 30,
    paddingBottom: 5,
    paddingLeft: 2,
    fontSize: 16,
    width: width * 0.8,
  },
  imageButton: {
    width: width * 0.4,
    backgroundColor: "#4B0082",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 50,
  },
  imageButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

export default SignupScreen;
