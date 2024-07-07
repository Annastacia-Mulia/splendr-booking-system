import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function BeauticianHomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const userID = await AsyncStorage.getItem('userID');
        const response = await axios.get(`${Config.API_URL}/api/appointments`, {
          params: { beauticianID: userID },
        });
        if (response.status === 200) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load appointments.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.appointmentText}>Client: {item.clientName}</Text>
      <Text style={styles.appointmentText}>Date: {item.date}</Text>
      <Text style={styles.appointmentText}>Time: {item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, Beautician</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ManageServices')}
        >
          <Text style={styles.actionButtonText}>Manage Services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('BeauticianProfile')}
        >
          <Text style={styles.actionButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#075eec" />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noAppointments}>No upcoming appointments</Text>}
        />
      )}


<View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ClientHomeScreen')}>
          <Icon name="home" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('AppointmentBookingScreen')}>
          <Icon name="calendar" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ClientProfile')}>
          <Icon name="user" size={24} color="#075eec" />
          <Text style={styles.footerIconText}>Profile</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2A32',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: '#075eec',
    padding: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D2A32',
    marginBottom: 12,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderColor: '#C9D3DB',
    borderWidth: 1,
  },
  appointmentText: {
    fontSize: 16,
    color: '#1D2A32',
  },
  noAppointments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#929292',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e8ecf4',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerIconText: {
    fontSize: 12,
    color: '#075eec',
  },

});
