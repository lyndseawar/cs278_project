import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [preferredDiningHall, setPreferredDiningHall] = useState('');
  const [textBoxValues, setTextBoxValues] = useState(['', '', '']); // for the textboxes at the bottom

  const handleTextBoxChange = (text, index) => {
    const newTextBoxValues = [...textBoxValues];
    newTextBoxValues[index] = text;
    setTextBoxValues(newTextBoxValues);
  };

  const data = [
    {
      name: 'John Doe',
      preferredDiningHall: 'EVGR',
      photos: ['./../assets/chicken.jpeg', './../assets/tacos.jpeg', './../assets/chicken.jpeg'],
      textboxes: ['text box 1', 'text box 2', 'text box 3']
    },
  ]

  return (
    <ScrollView>
      <View>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View>
        <Text>Preferred Dining Hall</Text>
        <TextInput
          value={preferredDiningHall}
          onChangeText={setPreferredDiningHall}
        />
      </View>

      <View>
        <Text>My Photos</Text>
        <ScrollView horizontal>
          {/* Replace these URLs with the URLs of your images */}
          <Image source={require('./../assets/chicken.jpeg')} style={{width: 100, height: 100}} />
          <Image source={require('./../assets/tacos.jpeg')} style={{width: 100, height: 100}} />
          <Image source={require('./../assets/chicken.jpeg')} style={{width: 100, height: 100}} />
          {/* Add more images as needed */}
        </ScrollView>
      </View>

      <View>
        {/* Add more text boxes as needed */}
        {textBoxValues.map((value, index) => (
          <View key={index}>
            <Text>Text Box {index + 1}</Text>
            <TextInput
              value={value}
              onChangeText={(text) => handleTextBoxChange(text, index)}
            />
          </View>
        ))}
      </View>
      <View>
        <Button title="Go To Feed" onPress={() => navigation.navigate("Feed")} />
        <Button title="Go To Propose" onPress={() => navigation.navigate("Propose")} />
      </View>
    </ScrollView>
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
