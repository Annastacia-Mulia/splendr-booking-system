//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Login from './App/Screens/Login';
import Signup from './App/Screens/Signup';
//import HomeScreen from './App/Screens/HomeScreen';
import ClientHomeScreen from './App/Screens/ClientHomeScreen';
import ForgotPassword from './App/Screens/ForgotPassword';
import ResetPassword from './App/Screens/ResetPassword';
import LogoutConfirmation from './App/Screens/LogoutConfirmation';
import AppointmentScreen from './App/Screens/AppointmentScreen';
import ProfileScreen from './App/Screens/ProfileScreen';
import EditProfileScreen from './App/Screens/EditProfileSreen';
import BusinessScreen from './App/Screens/BusinessScreen';
import BusinessDetailScreen from './App/Screens/BusinessDetailsScreen';
import BusinessListScreen from './App/Screens/BusinessListScreen';
import BeauticianListScreen from './App/Screens/beauticianListScreen';
import ServiceListScreen from './App/Screens/ServiceListScreen';
import AppointmentBookingScreen from './App/Screens/AppointmentBookingScreen';
import Profile from './App/Screens/Profile';
import AppointmentConfirmationScreen from './App/Screens/AppointmentConfirmationScreen';
import BeauticianHomeScreen from './App/Screens/BeauticianHomeScreen';
import BeauticianProfile from './App/Screens/BeauticianProfile';
import BeauticianProfileScreen from './App/Screens/BeauticianProfileScreen';
import MyAppointmentsScreen from './App/Screens/MyAppointmentsScreen';
import RatingScreen from './App/Screens/RatingScreen';
import RescheduleAppointmentScreen from './App/Screens/RescheduleAppointmentScreen';
import * as LocalAuthentication from 'expo-local-authentication';

//import SignInWithOAuth from './App/Components/SignInWithOAuth';

const Stack = createNativeStackNavigator();

state ={
  data:[]
}

fetchData= async()=>{
  const users = await response.json();
  this.setState({data: Login});

}

const PUBLISHABLE_KEY = "pk_test_YWRhcHRlZC1lbGYtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA";  

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
          <Stack.Screen name="LogoutConfirmation" component={LogoutConfirmation} />
          <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
          <Stack.Screen name="BusinessDetailScreen" component={BusinessDetailScreen} />
          <Stack.Screen name="BusinessListScreen" component={BusinessListScreen} />
          <Stack.Screen name="BeauticianListScreen" component={BeauticianListScreen} />
          <Stack.Screen name="ServiceListScreen" component={ServiceListScreen} />
          <Stack.Screen name="AppointmentBookingScreen" component={AppointmentBookingScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AppointmentConfirmationScreen" component={AppointmentConfirmationScreen} />
          <Stack.Screen name="BeauticianHomeScreen" component={BeauticianHomeScreen} />
          <Stack.Screen name="BeauticianProfile" component={BeauticianProfile} />
          <Stack.Screen name="BeauticianProfileScreen" component={BeauticianProfileScreen} />
          <Stack.Screen name="MyAppointmentsScreen" component={MyAppointmentsScreen} />
          <Stack.Screen name="RatingScreen" component={RatingScreen} />
          <Stack.Screen name="RescheduleAppointmentScreen" component={RescheduleAppointmentScreen} />


        </Stack.Navigator>
      </NavigationContainer>

      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text>You are signed in</Text>
        </SignedIn>
        
      </SafeAreaView>
    </ClerkProvider>
  );
}

LocalAuthentication.authenticateAsync({promptMessage:"Scan your biometrics to continue"})
.then(result => {
  if(result.success){
    NavigationContainer.push('HomeScreen');
  
  }
})
.catch(err =>{
  console.error(err);
}
)

const styles = StyleSheet.create({
   googleBtn: {
    backgroundColor: '#008000', // Google brand color
    borderColor: '#008000',
  },
});
