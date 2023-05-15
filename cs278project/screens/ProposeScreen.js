import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProposeScreen = ({ navigation }) => {
    const handlePress = () => {
      navigation.navigate("Matches");
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen</Text>
        <Button title="Go to Matches" onPress={handlePress} />
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
  
  export default ProposeScreen;
  