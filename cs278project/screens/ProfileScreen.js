import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { auth } from "../config";

export const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [thisYearPrompt, setThisYearPrompt] = useState("");
  const [showerThoughtPrompt, setShowerThoughtPrompt] = useState("");
  const [nerdiestThingPrompt, setNerdiestThingPrompt] = useState("");

  // useLayoutEffect to update the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: username ? username : "Loading...", // set the header title as userName or Loading... if it's not yet available
    });
  }, [navigation, username]);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useEffect(() => {
    // This function fetches the user's profile data from Firestore
    const fetchUserProfile = async (uid) => {
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUsername(docSnap.data().displayName); // also update the username
        setThisYearPrompt(docSnap.data().thisYear);
        setShowerThoughtPrompt(docSnap.data().showerThought);
        setNerdiestThingPrompt(docSnap.data().nerdiestThing);
      } else {
        console.log("No such document!");
      }
    }

    // This will run when the component mounts and whenever auth state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchUserProfile(user.uid); // Fetch the profile when a user is logged in
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.ScrollView}>
      <View>
        <Text style={styles.header}>Favorite Plate Activities</Text>
        <Text style={styles.plateTime}>meals, sports, dance shows</Text>
      </View>
      <View>
        <Text style={styles.header}>My prompts</Text>
        <Text style={styles.prompt}>This year, I really want to...</Text>
        <Text style={styles.promptAnswer}>{thisYearPrompt ? thisYearPrompt : "Loading..."}</Text>
        <Text style={styles.prompt}>A shower thought I recently had...</Text>
        <Text style={styles.promptAnswer}>{showerThoughtPrompt ? showerThoughtPrompt : "Loading..."}</Text>
        <Text style={styles.prompt}>The nerdiest thing about me is...</Text>
        <Text style={styles.promptAnswer}>{nerdiestThingPrompt ? nerdiestThingPrompt : "Loading..."}</Text>
      </View>
      <View>
        <Text style={styles.header}>Upcoming Plates?</Text>
        <Text style={styles.plateTime}>things this person has comitted to?</Text>
      </View>
      <View>
        <Text style={styles.header}>My Plates</Text>
        <Text style={styles.plateTime}>things this person has planned?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
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
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchText: {
    fontSize: 12,
    flexShrink: 1,
    marginHorizontal: 10,
    color: "#4B0082",
  },
});
