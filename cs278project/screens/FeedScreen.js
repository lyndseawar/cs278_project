import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PostCard from "../components/PostCard";
const feed = [
  {
    id: 1,
    activity: "Basketball game",
    totalAttendees: 5,
    signedUpAttendees: 3,
  },
  { id: 2, activity: "Movie night", totalAttendees: 8, signedUpAttendees: 4 },
  // More posts...
];

function FeedScreen() {
  const [committedActivities, setCommittedActivities] = useState([]);

  const handleCommit = (activityId) => {
    if (!committedActivities.includes(activityId)) {
      setCommittedActivities([...committedActivities, activityId]);
    }
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FeedScreen;
