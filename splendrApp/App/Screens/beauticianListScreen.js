import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import Config from './config';

const BeauticianListScreen = () => {
  const [beauticians, setBeauticians] = useState([]);
  const navigation = useNavigation(); // Initialize navigation object

  useEffect(() => {
    fetchBeauticians();
  }, []);

  const fetchBeauticians = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/api/beauticians`);
      setBeauticians(response.data);
    } catch (error) {
      console.error('Error fetching beauticians:', error);
      // Handle error as needed
    }
  };

  const handleBeauticianSelect = (beautician) => {
    // Navigate to AppointmentBookingScreen passing beautician details
    navigation.navigate('AppointmentBookingScreen', { beautician });
  };

  const renderBeauticianItem = ({ item }) => (
    <TouchableOpacity
      style={styles.beauticianItem}
      onPress={() => handleBeauticianSelect(item)}
    >
      <Text style={styles.beauticianName}>{item.name}</Text>
      <Text style={styles.beauticianDetails}>{item.specialty}</Text>
      <Text style={styles.beauticianDetails}>{item.email}</Text>
      <Text style={styles.beauticianDetails}>{item.phone}</Text>
      <Text style={styles.beauticianDetails}>{item.description}</Text>
      {item.image_url && <Image source={{ uri: item.image_url }} style={styles.beauticianImage} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Providers</Text>
      </View>
      <FlatList
        data={beauticians}
        keyExtractor={(item) => (item.beautician_id ? item.beautician_id.toString() : Math.random().toString())}
        renderItem={renderBeauticianItem}
        contentContainerStyle={styles.beauticianList}
      />
    </SafeAreaView>
  );
};

export default BeauticianListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  header: {
    alignItems: 'center',
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  beauticianList: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  beauticianItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  beauticianName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  beauticianDetails: {
    fontSize: 14,
    color: '#929292',
    marginBottom: 6,
  },
  beauticianImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});
