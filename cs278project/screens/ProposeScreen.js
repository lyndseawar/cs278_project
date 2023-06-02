import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const { width, height } = Dimensions.get('window');

export const ProposeScreen = ({ navigation }) => {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalAttendees, setTotalAttendees] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleDone = async () => {
    try {
      // Create a new document in the 'proposals' collection
      const docRef = await addDoc(collection(db, 'feeddata'), {
        activity,
        date,
        time,
        totalAttendees,
        // totalAttendees,
        location,
        notes
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset the form values
      setActivity('');
      setDate('');
      setTime('');
      setTotalAttendees('');
      setLocation('');
      setNotes('');

      // Navigate to the desired screen
      navigation.navigate('Feed');

      // Display a success message or perform additional actions if needed
    } catch (error) {
      console.error('Error adding document: ', error);
      // Display an error message or handle the error gracefully
    }
  };

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handlePickerValueChange = (itemValue) => {
    setTotalAttendees(itemValue);
    hidePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <ScrollView>
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
          </View>
          <View style={styles.section}>
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
              <Text style={styles.pickerText}> {totalAttendees}</Text>
            </TouchableOpacity>
            {isPickerVisible && (
              <Picker
                style={styles.picker}
                selectedValue={totalAttendees}
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
              placeholder="Optional Notes"
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.DoneButton}
              onPress={() => {
                handleDone();
              }}
            >
              <Text style={styles.DoneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* These are just here to add spacing for the scrollview */}
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 6,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  pickerContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  pickerText: {
    fontSize: 28,
  },
  DoneButton: {
    width: width * 0.4,
    backgroundColor: '#4B0082',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
    marginTop: 5,
  },
  DoneButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});


