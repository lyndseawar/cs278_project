import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { FormErrorMessage } from "../components/FormErrorMessage";
import { auth } from '../config';
import { loginValidationSchema } from '../utils';


const { width, height } = Dimensions.get("window");

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const handleLogin = values => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
  };

  return (
    <View style={styles.container}>
      
      {/* top title container */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Platedate</Text>
        <Text style={styles.tagline}>
          the best way to set your next platonic date
        </Text>
      </View>

      {/* login container */}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={values => handleLogin(values)}
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
              style={styles.input}
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
            <FormErrorMessage
              error={errors.email}
              visible={touched.email}
            />
            <TextInput
              style={styles.input}
              name='password'
              leftIconName='key-variant'
              placeholder='Enter password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <FormErrorMessage
              error={errors.password}
              visible={touched.password}
            />
            {/* Display Screen Error Mesages */}
            {errorState !== '' ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            {/* Login button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* New code block */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={styles.backButtonText}>
                  Don't have an account? Sign Up!{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
    padding: 5, 
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
    paddingBottom: 5,
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
    fontFamily: "Poppins-Regular",
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
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingBottom: height / 5,
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
});
