import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import Config from './config';

const ServiceListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const navigation = useNavigation(); // Initialize navigation object

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/api/services`);
        const data = await response.json();
        setServiceData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookButtonPress = (item) => {
    // Navigate to BeauticianListScreen passing service details
    navigation.navigate('BeauticianListScreen', { service: item });
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem}>
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceCost}>{item.cost} Ksh</Text>
        <Text style={styles.serviceDuration}>{item.duration} </Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookButtonPress(item)} // Pass item to handleBookButtonPress
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#075eec" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={serviceData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.serviceList}
        />
      )}
    </SafeAreaView>
  );
};

export default ServiceListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  serviceList: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  serviceCost: {
    fontSize: 14,
    color: '#929292',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#929292',
  },
  bookButton: {
    backgroundColor: '#075eec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
