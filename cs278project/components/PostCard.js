import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  doc,
  onSnapshot,
  updateDoc,
  deleteField,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";
import { deleteDoc } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

//PostCard component
function PostCard({ item, handleCommit, handleDelete, userId }) {
  //State management
  const [committed, setCommitted] = useState(false);
  const [attendeesCount, setAttendeesCount] = useState(0); //add this state to store the number of attendees
  const [userName, setUserName] = useState(""); //add this state to store the user's display name
  //Post information that is passed in as props
  const { activity, date, totalAttendeesNeeded } = item;
  //check if the post was created by the logged in user
  const isPostCreatedByUser = item.userId === userId; // Check if the post was made by the logged-in user

  //Deletes a post from the database
  const handleDeletePost = () => {
    console.log("Delete button was pressed");
    try {
      console.log("This should be the postId being deleted", item.id);
      handleDelete(item.id);
      const docRef = doc(db, "feeddata", item.id);
      deleteDoc(docRef);
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  //Retrieves the number of attendees
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

  //Toggle the user's commitment
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
  //Get the user's name and display firstname last initial
  const getDisplayName = (fullName) => {
    if (fullName) {
      const nameArray = fullName.split(" ");
      if (nameArray.length === 2) {
        const firstName = nameArray[0];
        const lastInitial = nameArray[1].charAt(0);
        return `${firstName} ${lastInitial}.`;
      }
    }
    return fullName;
  };
  //Fetch the user's name
  useEffect(() => {
    const fetchUserName = async () => {
      const userRef = doc(db, "users", item.userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const fullName = userSnap.data().displayName;
        const nameArr = fullName.split(" ");
        const displayName = `${nameArr[0]} ${nameArr[1].charAt(0)}.`;
        setUserName(displayName);
      } else {
        console.log("No such user!");
      }
    };
    fetchUserName();
  }, [item.userId]);
  //Post Card View
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{userName}</Text>
        {isPostCreatedByUser && (
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 30, right: 15 }}
            style={styles.deleteButton}
            onPress={handleDeletePost}
          >
            <Ionicons name="trash-outline" color="black" size={25} />
          </TouchableOpacity>
        )}
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
    justifyContent: "space-between",
    marginBottom: 15,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
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
    backgroundColor: "#AC8FC7",
    borderRadius: 20,
    padding: 9,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    borderRadius: 20,
    top: 5,
    right: 5,
    padding: 10,
  },
});

export default PostCard;
