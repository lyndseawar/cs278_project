import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  doc,
  onSnapshot,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase.js";

function PostCard({ item, handleCommit, userId }) {
  //userId  is now a prop passed down from the FeedScreen component
  const [committed, setCommitted] = useState(false);
  const [attendeesCount, setAttendeesCount] = useState(0); //add this state to store the number of attendees
  const { activity, name, avatar, date, totalAttendeesNeeded, activityCategory } =
    item;

  useEffect(() => {
    const docRef = doc(db, "activityAttendees", item.id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        //count the number of attendees (ignoring fields that are not user IDs)
        const attendees = Object.keys(doc.data()).length;
        setAttendeesCount(attendees); //update the state with the number of attendees
        //now you can use totalAttendees to determine if the current user is committed
        if (doc.data()[userId]) {
          setCommitted(true);
        } else {
          setCommitted(false);
        }
      }
    });
    return unsubscribe;
  }, [item.id, userId]);

  const toggleCommit = async () => {
    try {
      const docRef = doc(db, "activityAttendees", item.id);
      if (!committed) {
        await setDoc(docRef, { [userId]: true }, { merge: true });
      } else {
        await updateDoc(docRef, { [userId]: deleteField() });
      }
      handleCommit(item.id);
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.activity}>{activity}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.commitmentContainer}>
          <Text style={styles.bold}>{attendeesCount} have committed </Text>
          <Text style={styles.text}>{totalAttendeesNeeded} needed </Text>
        </View>
        <TouchableOpacity
          style={committed ? styles.committedButton : styles.button}
          onPress={toggleCommit}
        >
          <Text style={styles.buttonText}>
            {committed ? "Committed" : "Commit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 17,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: "90%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  activity: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commitmentContainer: {
    flexDirection: "column",
  },
  bold: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#4B0082",
    borderRadius: 20,
    padding: 9,
  },
  committedButton: {
    backgroundColor: "#999",
    borderRadius: 20,
    padding: 9,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "center",
  },
});

export default PostCard;
