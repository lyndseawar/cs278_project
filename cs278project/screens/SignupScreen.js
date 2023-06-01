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
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { FormErrorMessage } from "../components/FormErrorMessage";
import { auth } from "../config";
import { signupValidationSchema } from "../utils";

const { width, height } = Dimensions.get("window");

export const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorState, setErrorState] = useState('');

  const handleSignup = async values => {
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
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
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={signupValidationSchema}
        onSubmit={values => handleSignup(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur
        }) => (
          <>
            {/* Input fields */}
            <TextInput
              name='email'
              leftIconName='email'
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoFocus={true}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            <TextInput
              name='password'
              leftIconName='key-variant'
              placeholder='Enter password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='newPassword'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <FormErrorMessage
              error={errors.password}
              visible={touched.password}
            />
            <TextInput
              name='confirmPassword'
              leftIconName='key-variant'
              placeholder='Enter password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            <FormErrorMessage
              error={errors.confirmPassword}
              visible={touched.confirmPassword}
            />
            {/* Display Screen Error Mesages */}
            {errorState !== '' ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            {/* Signup button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* bottom container */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backButtonText}>Already have an account? Login!</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height / 8,
  },
});
