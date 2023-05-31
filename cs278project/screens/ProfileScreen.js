import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const ProfileScreen = ({ navigation }) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // TODO username should change dynamically with username in backend
  const [username, setUsername] = useState("Nicole"); 

  // useLayoutEffect to update the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: username, // set the header title as userName
    });
  }, [navigation, username]);

  const handleNameChange = (text) => {
    setUsername(text);
  }

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.nameView} />
      <View>
        <Text style={styles.diningHallTitle}>Preferred Dining Hall</Text>
        <TextInput style={styles.diningHall}>Stern</TextInput>
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
        <TextInput style={styles.plateTime}>Lunch</TextInput>
      </View>

      <View style={styles.switchParent}>
          <Text style={styles.header}>Open Invites</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>I like to get to know people 1 on 1</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#4B0082" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="lightgray"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.switchText}>The more people the merrier</Text>
          </View>
          
        </View>

      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* this bullshit is here so we can scroll to the bottom better */}
        <Text></Text>
        <Text></Text>
        <Text></Text>
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
  },
  diningHall: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    paddingBottom: 10,
    color: "#4B0082",
  },
  diningHallTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  plateTime: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    paddingBottom: 10,
    color: "#4B0082",
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    fontSize: 12, 
    flexShrink: 1,
    marginHorizontal: 10, 
    color: "#4B0082",
  },
});


export default ProfileScreen;
