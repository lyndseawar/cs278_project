import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const matches = [
  {
    id: 1,
    avatar: require("../assets/avatars/avatar1.png"),
    firstName: "John",
    lastName: "D",
  },
  {
    id: 2,
    avatar: require("../assets/avatars/avatar2.png"),
    firstName: "Jane",
    lastName: "S",
  },
  {
    id: 3,
    avatar: require("../assets/avatars/avatar3.png"),
    firstName: "Alex",
    lastName: "F",
  },
  {
    id: 4,
    avatar: require("../assets/avatars/avatar4.png"),
    firstName: "Olivia",
    lastName: "L",
  },
  {
    id: 5,
    avatar: require("../assets/avatars/avatar5.png"),
    firstName: "Mike",
    lastName: "B",
  },
];

const MatchesScreen = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
      </View>
      <View style={styles.matchesContainer}>
        {matches.map((match) => (
          <View style={styles.match} key={match.id}>
            <Image source={match.avatar} style={styles.avatar} />
            <View style={styles.matchInfo}>
              <Text
                style={styles.name}
              >{`${match.firstName} ${match.lastName}`}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Action</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="chatbubbles-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  matchesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  match: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  matchInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#4B0082",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  tabButton: {
    paddingVertical: 20,
  },
});

export default MatchesScreen;
