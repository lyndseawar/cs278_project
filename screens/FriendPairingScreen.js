import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FriendPairingScreen() {
  return (
    <View style={styles.container}>
      <Text>Friend Pairing Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
