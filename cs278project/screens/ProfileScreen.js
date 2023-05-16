import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Feed");
  };

  const handleProposePress = () => {
    navigation.navigate("Propose");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Go To Feed" onPress={handlePress} />
      <Button title="Go To Propose" onPress={handleProposePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProfileScreen;
