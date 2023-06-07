import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
    doc,
    onSnapshot,
    updateDoc,
    deleteField,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase.js";
import { deleteDoc } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";


function PostCard({ item, handleCommit, userId }) {
    //userId  is now a prop passed down from the FeedScreen component
    const [committed, setCommitted] = useState(false);
    const [attendeesCount, setAttendeesCount] = useState(0); //add this state to store the number of attendees
    const [userName, setUserName] = useState(""); //add this state to store the user's display name
    const { activity, name, date, totalAttendeesNeeded, activityCategory, handleDelete } = item;

    const isPostCreatedByUser = item.userId === userId; // Check if the post was made by the logged-in user

    // const handleDeletePost = async () => {
    //     try {
    //         const docRef = doc(db, "feeddata", item.id);
    //         await deleteDoc(docRef);
    //         handleDelete(item.id); // Pass the post ID to the parent component to update the state
    //     } catch (error) {
    //         console.log("Error deleting document: ", error);
    //     }
    // };

    const handleDeletePost = async (postId) => {
        try {
          const docRef = doc(db, "feeddata", postId);
          await deleteDoc(docRef);
          setFeedData(feedData.filter((item) => item.id !== postId));
          handleDelete(item.id);
        } catch (error) {
          console.log("Error deleting document: ", error);
        }
      };

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

    //a function to toggle the user's commitment
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

    //a function to get the users name and display it
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

    return (
        <View style={styles.card}>
            {isPostCreatedByUser && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeletePost}
                >
                    <Ionicons name="trash-outline" color="black" size={25} />
                </TouchableOpacity>
            )}
            <View style={styles.headerContainer}>
                <Text style={styles.name}>{userName}</Text>
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
        top: 5,
        right: 5,
        padding: 5,
    },
});

export default PostCard;
