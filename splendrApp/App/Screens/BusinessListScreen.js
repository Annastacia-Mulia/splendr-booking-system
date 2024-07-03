import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BusinessListScreen = ({ route }) => {
  const { businesses } = route.params;
  const navigation = useNavigation();

  const handleSelectBusiness = (business) => {
    // Navigate to ServiceListScreen passing the services details
    navigation.navigate('ServiceListScreen', { services: business.services });
  };

  const renderBusinessItem = ({ item }) => (
    <TouchableOpacity
      style={styles.businessItem}
      onPress={() => handleSelectBusiness(item)}
    >
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>{item.address}</Text>
      <Text style={styles.businessDetails}>{item.phone}</Text>
      <Text style={styles.businessDetails}>{item.email}</Text>
      <Text style={styles.businessDetails}>{item.description}</Text>
      {item.image_url && <Image source={{ uri: item.image_url }} style={styles.businessImage} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Beauty Businesses</Text>
      </View>
      <FlatList
        data={businesses}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderBusinessItem}
        contentContainerStyle={styles.businessList}
      />
    </SafeAreaView>
  );
};

export default BusinessListScreen;

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
  businessList: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  businessItem: {
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
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
  },
  businessDetails: {
    fontSize: 14,
    color: '#929292',
  },
  businessImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});
