import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Config from './config';

const BeauticianListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [beauticianData, setBeauticianData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { service, business } = route.params;

  useEffect(() => {
    const fetchBeauticians = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/api/beauticians`);
        const data = await response.json();
        setBeauticianData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching beauticians:', error);
        setLoading(false);
      }
    };

    fetchBeauticians();
  }, []);

  const handleSelectBeautician = (beautician) => {
    navigation.navigate('AppointmentBookingScreen', { beautician, business, service });
  };

  const renderBeauticianItem = ({ item }) => (
    <TouchableOpacity style={styles.beauticianItem} onPress={() => handleSelectBeautician(item)}>
      <Text style={styles.beauticianName}>{`${item.firstName} ${item.lastName}`}</Text>
      <Text style={styles.beauticianDetails}>{item.email}</Text>
      <Text style={styles.beauticianDetails}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#075eec" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={beauticianData}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderBeauticianItem}
          contentContainerStyle={styles.beauticianList}
        />
      )}
    </SafeAreaView>
  );
};

export default BeauticianListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  beauticianList: {
    paddingHorizontal: 24,
    paddingVertical: 20,
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
    marginBottom: 6,
  },
  beauticianDetails: {
    fontSize: 14,
    color: '#929292',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
