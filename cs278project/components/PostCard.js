import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import avatar from "../assets/avatars/avatar1.png";

function PostCard({ item, isCommitted, handleCommit }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{"John D."}</Text>
      </View>
      <Text style={styles.activity}>{item.activity}</Text>
      <Text style={styles.date}>date goes here</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.commitmentContainer}>
          <Text style={styles.bold}>
            {item.signedUpAttendees} have committed{" "}
          </Text>
          <Text styles={styles.text}>{item.totalAttendees} needed </Text>
        </View>
        <TouchableOpacity
          style={isCommitted ? styles.committedButton : styles.button}
          onPress={() => handleCommit(item.id)}
          disabled={isCommitted}
        >
          <Text style={styles.buttonText}>
            {isCommitted ? "committed" : "want to commit"}
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
