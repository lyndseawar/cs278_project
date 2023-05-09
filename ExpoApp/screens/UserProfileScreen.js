import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>User Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfileScreen;
