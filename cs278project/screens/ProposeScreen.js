import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import {Picker} from '@react-native-picker/picker';
import Ionicons from "react-native-vector-icons/Ionicons";
// import DatePicker from 'react-native-date-picker'


const ProposeScreen = () => {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);


  const handleDone = () => {
    // Perform action when the "Done" button is pressed
    // You can access the form values here
    console.log('Activity:', activity);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Guests:', guests);
    console.log('Location:', location);
  };

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handlePickerValueChange = (itemValue) => {
    setGuests(itemValue);
    hidePicker();
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <TextInput
          style={styles.input}
          value={activity}
          onChangeText={setActivity}
          placeholder="Add Activity"
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Ionicons name="calendar" size={32} />
          <Text style={styles.sectionTitle}> Date</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Monday, May 15th"
          value={date}
          onChangeText={setDate}
        />
        <View style={styles.sectionTitle}>
          <Ionicons name="time" size={32} />
          <Text style={styles.sectionTitle}> Time</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="12:30pm - 1:30pm"
          value={time}
          onChangeText={setTime}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guests Needed</Text>
        <TouchableOpacity onPress={showPicker} style={styles.pickerContainer}>
          <Text style={styles.pickerText}> {guests}</Text>
        </TouchableOpacity>
        {isPickerVisible && (
          <Picker
            style={styles.picker}
            selectedValue={guests}
            onValueChange={handlePickerValueChange}
          >
             <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            {/* Add more options as needed */}
          </Picker>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Add Location"
        />
      </View>
      <Button title="Done" onPress={handleDone} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "pink",
  },
  section: {
    marginBottom: 16, 
    backgroundColor: "yellow",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: "row",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
});

export default ProposeScreen;