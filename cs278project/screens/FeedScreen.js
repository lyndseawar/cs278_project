import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PostCard from "../components/PostCard";

const feed = [
  {
    id: 1,
    activity: "women's basketball game @ Maples",
    totalAttendees: 5,
    signedUpAttendees: 3,
    name: "John D.",
    avatar: require("../assets/avatars/avatar1.png"),
    date: "2023-05-22",
  },
  {
    id: 2,
    activity: "movie night",
    totalAttendees: 8,
    signedUpAttendees: 4,
    name: "John D.",
    avatar: require("../assets/avatars/avatar1.png"),
    date: "2023-05-22",
  },
  {
    id: 3,
    activity: "study group @ EVGR",
    totalAttendees: 3,
    signedUpAttendees: 2,
    name: "Conner F.",
    avatar: require("../assets/avatars/avatar2.png"),
    date: "2023-05-23",
  },
  {
    id: 4,
    activity: "dinner @ stern",
    totalAttendees: 4,
    signedUpAttendees: 1,
    name: "Jane D.",
    avatar: require("../assets/avatars/avatar3.png"),
    date: "2023-05-24",
  },
  {
    id: 5,
    activity: "basketball game",
    totalAttendees: 5,
    signedUpAttendees: 3,
    name: "Lauren G.",
    avatar: require("../assets/avatars/avatar4.png"),
    date: "2023-05-25",
  },
  {
    id: 6,
    activity: "drawing class",
    totalAttendees: 5,
    signedUpAttendees: 3,
    name: "David H.",
    avatar: require("../assets/avatars/avatar5.png"),
    date: "2023-05-26",
  },
];

export function FeedScreen() {
  const [committedActivities, setCommittedActivities] = useState([]);

  const handleCommit = (activityId) => {
    if (!committedActivities.includes(activityId)) {
      setCommittedActivities([...committedActivities, activityId]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {feed.map((item) => (
        <PostCard
          key={item.id}
          item={item}
          isCommitted={committedActivities.includes(item.id)}
          handleCommit={handleCommit}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
