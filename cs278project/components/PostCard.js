import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import avatar from "../assets/avatars/avatar1.png";

function PostCard({ item, isCommitted, handleCommit }) {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>
        <View style={styles.titleContainer}>
          <Image source={avatar} style={styles.avatar} />
          <Text>{"John D."}</Text>
        </View>
      </Card.Title>
      <Card.Divider />
      <Text style={styles.activity}>{item.activity}</Text>
      <Text>
        {item.signedUpAttendees} out of {item.totalAttendees} have signed up
      </Text>
      <Button
        title={isCommitted ? "Committed" : "Want to commit"}
        onPress={() => handleCommit(item.id)}
        disabled={isCommitted}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  activity: {
    marginBottom: 10,
  },
});

export default PostCard;
