import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Touchable } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.nameView}>
        <TextInput style={styles.name}>Nicole</TextInput>
        {/* this name should be in the header to replace the text: 'profile' */}
      </View>
      
      <View>
        <Text style={styles.header}>Preferred Dining Hall</Text>
        <TextInput>Stern</TextInput>
      </View>

      <View>
        <Text style={styles.header}>My Photos</Text>
        <ScrollView horizontal>
          {/* Replace these URLs with the URLs of your images */}
          <Image source={require('./../assets/chicken.jpeg')} style={styles.image} />
          <Image source={require('./../assets/tacos.jpeg')} style={styles.image} />
          <Image source={require('./../assets/chicken.jpeg')} style={styles.image} />
          {/* Add more images as needed */}
        </ScrollView>
        <Text style={styles.reorder}>Drag to reorder</Text>
      </View>

      <View>
        <Text style={styles.header}>My prompts</Text>

        <Text style={styles.prompt}>This year, I really want to...</Text>
        <TextInput style={styles.promptAnswer}>try skydiving</TextInput>

        <Text style={styles.prompt}>A shower thought I recently had...</Text>
        <TextInput style={styles.promptAnswer}>why do we have shower thoughts</TextInput>

        <Text style={styles.prompt}>The nerdiest thing about me is...</Text>
        <TextInput style={styles.promptAnswer}>how I prefer terminal in my VSCode window</TextInput>
      </View>

      <View> 
        <Text style={styles.header}>Preferred Plate Time</Text>
        <TextInput>Lunch</TextInput>
      </View>

      <View>
        <Text style={styles.header}>Open Invites</Text>
        {/* add switch from figma here */}
      </View>

      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  prompt: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  promptAnswer: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingBottom: 10,
    color: "#4B0082",
    // marginBottom: 5,
  },
  ScrollView: {
    padding: 20,
    backgroundColor: "#fff",
  },
  nameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logoutButton: {

    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15, // Adjust this value to get the desired rounding effect
    marginRight: 7,
  },
  reorder: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "right",
    marginTop: 5,
  }
});


export default ProfileScreen;
