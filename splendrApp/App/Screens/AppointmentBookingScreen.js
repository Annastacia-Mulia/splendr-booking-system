import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentBookingScreen = ({ route }) => {
  const { beautician, business, service } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    navigateToConfirmation();
  };

  const navigateToConfirmation = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('AppointmentConfirmationScreen', {
        beautician,
        business,
        service,
        date: selectedDate.toISOString(),
        time: selectedTime,
      });
    }
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startTime = 8;
    const endTime = 17;
    for (let hour = startTime; hour < endTime; hour++) {
      const time12hr = hour >= 12 ? `${hour - 12} PM` : `${hour} AM`; // Convert to 12-hour format
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour; // Handle 12 AM case
      timeSlots.push(
        <TouchableOpacity key={`${hour}:00`} style={styles.timeSlot} onPress={() => handleSelectTime(`${displayHour}:00 ${hour >= 12 ? 'PM' : 'AM'}`)}>
          <Text>{`${displayHour}:00 ${hour >= 12 ? 'PM' : 'AM'}`}</Text>
        </TouchableOpacity>
      );
      timeSlots.push(
        <TouchableOpacity key={`${hour}:30`} style={styles.timeSlot} onPress={() => handleSelectTime(`${displayHour}:30 ${hour >= 12 ? 'PM' : 'AM'}`)}>
          <Text>{`${displayHour}:30 ${hour >= 12 ? 'PM' : 'AM'}`}</Text>
        </TouchableOpacity>
      );
    }
    return timeSlots;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Appointment</Text>
          <Text style={styles.subtitle}>Select a date and time with {`${beautician.firstName} ${beautician.lastName}`}</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
            <Text>Select Date: {selectedDate ? selectedDate.toLocaleDateString() : 'Choose Date'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.timeSlotsContainer}>
          <Text style={styles.subtitle}>Available Time Slots:</Text>
          {renderTimeSlots()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 10,
  },
  timeSlotsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeSlot: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
