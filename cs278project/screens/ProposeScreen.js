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
    
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Activity:</Text>
        <Button title="Go to Matches" onPress={handlePress} />
      </View>
    </SafeAreaView>
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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },  
  });
  
  export default ProposeScreen;
  