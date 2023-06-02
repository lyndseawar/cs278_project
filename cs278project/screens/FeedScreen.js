import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { sortByDate, filterByCategory } from '../utils';
import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export function FeedScreen() {
  const [committedActivities, setCommittedActivities] = useState([]);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  const [feedData, setFeedData] = useState([]);

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

  const fetchFeedData = async () => {
    const querySnapshot = await getDocs(collection(db, "feeddata"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setFeedData(data);
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  let filteredFeed = feedData;
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
          <View key={item.id} style={styles.postCard}>
            {/* Render the content of each post card */}
            <Text>{item.activity}</Text>
            <Text>Total Attendees: {item.totalAttendees}</Text>

            {/* we need to make logic for how to account for sign ups and people who uncommit */}

            {/* <Text>Signed Up Attendees: {item.totalAttendees}</Text> */}
            {/* we need to figure out how to get the name to sync */}
            <Text>Name: {item.name}</Text>
            {/* Render more properties as needed */}
          </View>
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
  },
  postCard: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});
