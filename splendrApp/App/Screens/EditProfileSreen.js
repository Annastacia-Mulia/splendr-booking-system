import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Config from "./config";
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo

const EditProfileScreen = ({ navigation }) => {
  const [userID, setUserID] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  useEffect(() => {
    // Fetch user ID from AsyncStorage
    AsyncStorage.getItem('userID').then((id) => {
      if (id) {
        setUserID(id);
        fetchUserDetails(id);
      }
    });
  }, []);

  const fetchUserDetails = async (userID) => {
    try {
      const response = await fetch(`${Config.API_URL}/api/user-details/${userID}`);
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setEmail(data.email);
      setGender(data.gender);
      // You can also set profileImage if your API returns an image URL or base64 encoded image
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error (show message or retry logic)
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/api/user-details/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          gender,
          // Include profileImage in the request body if needed
        }),
      });
      if (response.ok) {
        // Successfully updated user details
        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack(); // Navigate back to ProfileScreen after saving changes
      } else {
        // Handle error response from server
        const errorData = await response.json();
        Alert.alert('Error', `Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setProfileImage(pickerResult.uri);
        // Handle image upload logic here (e.g., upload to server or display locally)
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert('Error', 'Failed to pick an image. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick Profile Image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#e8ecf4",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#075eec',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePickerText: {
    fontSize: 18,
    color: '#075eec',
    textDecorationLine: 'underline',
  },
});

export default EditProfileScreen;
