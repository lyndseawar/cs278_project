import React from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProposeScreen = ({ navigation }) => {
    const handlePress = () => {
      navigation.navigate("Matches");
    };
    const [number, onChangeNumber] = React.useState('');
    
  
    return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Activity:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text style={styles.title}>Date & Time:</Text>
      <Ionicons name="calendar-number" size={32} />
      <Button title="Done (Go to Matches)" onPress={handlePress} />
    </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "pink",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },  
  });
  
  export default ProposeScreen;
  