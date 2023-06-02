import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import PostCard from "../components/PostCard";
import { sortByDate, filterByCategory } from '../utils';
import Ionicons from "react-native-vector-icons/Ionicons";

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
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);

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

  let filteredFeed = feed;
  if (filter) {
    filteredFeed = filterByCategory(filteredFeed, filter);
  }
  if (sort) {
    filteredFeed = sortByDate(filteredFeed, sort);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => handleFilter('option1')}>
            <Text style={styles.buttonTextStyle}>Filter Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => handleFilter('option2')}>
            <Text style={styles.buttonTextStyle}>Filter Option 2</Text>
          </TouchableOpacity>
          {/* Add more filter buttons as needed */}
        </View>
        <View style={styles.sortContainer}>
          <TouchableOpacity style={styles.sortStyle} onPress={() => handleSort('option1')}>
            <Ionicons name="filter" color="white" size={32} />
          </TouchableOpacity>

          {/* Add more sort buttons as needed */}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredFeed.map((item) => (
          <PostCard
            key={item.id}
            item={item}
            isCommitted={committedActivities.includes(item.id)}
            handleCommit={handleCommit}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    flexDirection: "row",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sortContainer: {
    justifyContent: "flex-end",
    backgroundColor: "pink",
  },
  buttonStyle: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    backgroundColor: "#4B0082",
    borderRadius: 20,
    padding: 9,
  },
  buttonTextStyle: {
    color: "white",
  },
  sortStyle: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 9,
  }
});