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
  { id: 2, activity: "movie night", totalAttendees: 8, signedUpAttendees: 4 },
  {
    id: 3,
    activity: "study group @ EVGR",
    totalAttendees: 3,
    signedUpAttendees: 2,
  },
  {
    id: 4,
    activity: "dinner @ stern",
    totalAttendees: 4,
    signedUpAttendees: 1,
  },
  {
    id: 5,
    activity: "basketball game",
    totalAttendees: 5,
    signedUpAttendees: 3,
  },
];

function FeedScreen() {
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

export default FeedScreen;
