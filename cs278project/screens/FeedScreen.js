import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Card, Button } from "react-native-elements";
import avatar from "../assets/avatars/avatar1.png";

const feed = [
  {
    id: 1,
    activity: "Basketball game",
    date: "2023-05-24",
    totalAttendees: 5,
    signedUpAttendees: 3,
  },
  {
    id: 2,
    activity: "Movie night",
    date: "2023-05-22",
    totalAttendees: 8,
    signedUpAttendees: 4,
  },
  // More posts...
];

function FeedScreen() {
  const [committedActivities, setCommittedActivities] = useState([]);

  const handleCommit = (activityId) => {
    if (!committedActivities.includes(activityId)) {
      setCommittedActivities([...committedActivities, activityId]);
    }
  };

  const renderFeedItem = (item) => {
    const isCommitted = committedActivities.includes(item.id);

    return (
      <Card key={item.id} containerStyle={styles.card}>
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
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
      {feed.map(renderFeedItem)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
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

export default FeedScreen;
