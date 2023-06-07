import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const { width, height } = Dimensions.get("window");

export const ProposeScreen = ({ navigation }) => {
  const [activity, setActivity] = useState("");
  const [activityCategory, setActivityCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [totalAttendeesNeeded, setTotalAttendeesNeeded] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isActivityPickerVisible, setActivityPickerVisible] = useState(false);
  const [isGuestsPickerVisible, setGuestsPickerVisible] = useState(false);

  const handleDone = async () => {
    if (
      activity === "" ||
      activityCategory === "" ||
      date === "" ||
      time === "" ||
      totalAttendeesNeeded === "" ||
      location === ""
    ) {
      Alert.alert("Error", "Please fill out all the fields");
      return;
    }
  
    try {
      // Get the current user's ID
      const userId = auth.currentUser?.uid || "unknown";
      // If there is no signed-in user, don't proceed
      if (!userId) {
        console.error("No user signed in");
        return;
      }
  
      // Create a new document in the 'feeddata' collection
      const docData = {
        userId,
        activity,
        activityCategory,
        date,
        time,
        totalAttendeesNeeded,
        location,
        notes
      };
  
      const docRef = await addDoc(collection(db, "feeddata"), docData);
  
      console.log("Document written with ID: ", docRef.id);
  
      // Reset the form values
      setActivity("");
      setActivityCategory("");
      setDate("");
      setTime("");
      setTotalAttendeesNeeded("");
      setLocation("");
      setNotes("");
  
      // Navigate to the desired screen
      navigation.navigate("Feed");
  
      // Display a success message or perform additional actions if needed
    } catch (error) {
      console.error("Error adding document: ", error);
      // Display an error message or handle the error gracefully
    }
  };
  

  const showPicker = (pickerType) => {
    if (pickerType === "activity") {
      setActivityPickerVisible(true);
    } else if (pickerType === "guests") {
      setGuestsPickerVisible(true);
    }
  };

  const hidePicker = (pickerType) => {
    if (pickerType === "activity") {
      setActivityPickerVisible(false);
    } else if (pickerType === "guests") {
      setGuestsPickerVisible(false);
    }
  };

  const handlePickerValueChange = (itemValue) => {
    setTotalAttendeesNeeded(itemValue);
    hidePicker();
  };

  const handleActivityPickerValueChange = (activityValue) => {
    setActivityCategory(activityValue);
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
            <Text style={styles.sectionTitle}>Activity Category</Text>
            <TouchableOpacity
              onPress={() => showPicker("activity")}
              style={styles.pickerContainer}
            >
              <Text style={styles.pickerText}>{activityCategory}</Text>
            </TouchableOpacity>
            {isActivityPickerVisible && (
              <Picker
                style={styles.picker}
                selectedValue={activityCategory}
                onValueChange={(value) => {
                  handleActivityPickerValueChange(value);
                  hidePicker("activity");
                }}
              >
                <Picker.Item label="food" value="food" />
                <Picker.Item label="sports" value="sports" />
                <Picker.Item label="study date" value="study date" />
                <Picker.Item label="arts" value="arts" />
                <Picker.Item label="adventure" value="adventure" />
                <Picker.Item label="games" value="games" />
                <Picker.Item label="volunteering" value="volunteering" />
                <Picker.Item label="fitness" value="fitness" />
                <Picker.Item label="book club" value="book club" />
                <Picker.Item label="other" value="other" />
              </Picker>
            )}
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
            <TouchableOpacity
              onPress={() => showPicker("guests")}
              style={styles.pickerContainer}
            >
              <Text style={styles.pickerText}>{totalAttendeesNeeded}</Text>
            </TouchableOpacity>
            {isGuestsPickerVisible && (
              <Picker
                style={styles.picker}
                selectedValue={totalAttendeesNeeded}
                onValueChange={(value) => {
                  handlePickerValueChange(value);
                  hidePicker("guests");
                }}
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
              disabled={!(activity && activityCategory && date && time && totalAttendeesNeeded && location)}
            >
              <Text style={styles.DoneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
                    <View>
                        {/* These are just here to add spacing for the scrollview */}
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
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
        backgroundColor: "white",
        shadowColor: "#000",
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
        fontWeight: "bold",
        marginBottom: 6,
        flexDirection: "row",
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 8,
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
    },
    picker: {
        backgroundColor: "white"
    },
    pickerContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    pickerText: {
        fontSize: 20,
    },
    DoneButton: {
        width: width * 0.4,
        backgroundColor: "#4B0082",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignSelf: "center",
        marginTop: 5,
    },
    DoneButtonText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Poppins-Regular",
    },
});
