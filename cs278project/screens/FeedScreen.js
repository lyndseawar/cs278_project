import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Button} from "react-native";
import PostCard from "../components/PostCard";
import { sortByDate, filterByCategory } from '../utils';

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
  const [filter, setFilter] = useState(null); // state to store the selected filter option
  const [sort, setSort] = useState(null); // state to store the selected sort option

  const handleCommit = (activityId) => {
    if (!committedActivities.includes(activityId)) {
      setCommittedActivities([...committedActivities, activityId]);
    }
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const handleSort = (option) => {
    setSort(option);
  };

  // Apply sorting and filtering to the feed based on the selected options
  let filteredFeed = feed;
  if (filter) {
    filteredFeed = filterByCategory(filteredFeed, filter);
  }
  if (sort) {
    filteredFeed = sortByDate(filteredFeed, sort);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.filterContainer}>
        <Button title="Filter Option 1" onPress={() => handleFilter('option1')} />
        <Button title="Filter Option 2" onPress={() => handleFilter('option2')} />
        {/* Add more filter buttons as needed */}
      </View>
      <View style={styles.sortContainer}>
        <Button title="Sort Option 1" onPress={() => handleSort('option1')} />
        <Button title="Sort Option 2" onPress={() => handleSort('option2')} />
        {/* Add more sort buttons as needed */}
      </View>
      {filteredFeed.map((item) => (
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
    backgroundColor: "pink"
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "yellow"
  }, 
  sortContainer: {
    flexDirection: "column",
    backgroundColor: "red"
  }
});
