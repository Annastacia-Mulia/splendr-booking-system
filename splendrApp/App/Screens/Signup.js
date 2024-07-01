
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // Assuming you use Expo for vector icons
import Config from './config'; // Import the config file


export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (form.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (form.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (form.phone.trim() === "") {
      newErrors.phone = "Phone Number is required";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    if (form.gender.trim() === "") {
      newErrors.gender = "Gender is required";
      valid = false;
    } else {
      newErrors.gender = "";
    }

    if (form.email.trim() === "") {
      newErrors.email = "Email Address is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (form.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (form.passwordConfirmation.trim() === "") {
      newErrors.passwordConfirmation = "Please confirm your password";
      valid = false;
    } else if (form.passwordConfirmation !== form.password) {
      newErrors.passwordConfirmation = "Passwords do not match";
      valid = false;
    } else {
      newErrors.passwordConfirmation = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validateForm()) {
      setLoading(true); // Start loading
  
      axios
        .post(`${Config.API_URL}/api/signup`, form)
        .then((response) => {
          console.log("User created successfully:", response.data);
          // Show verification message to user
          Alert.alert(
            "Signup Successful",
            "Please check your email to verify your account."
          );
  
          // Clear the form and stop loading
          setForm({
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          if (error.response && error.response.status === 409) {
            Alert.alert(
              "Signup Failed",
              "Email already exists. Please use a different email address."
            );
          } else {
            Alert.alert(
              "Signup Failed",
              "An error occurred while signing up. Please try again later."
            );
          }
          setLoading(false); // Stop loading on error
        });
    } else {
      Alert.alert(
        "Validation Error",
        "Please fill out all required fields correctly."
      );
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign Up to <Text style={{ color: "#075eec" }}>Splendr</Text>
          </Text>
          <Text style={styles.subtitle}>
            The Ultimate Beauty booking application
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(firstName) => setForm({ ...form, firstName })}
              placeholder="John"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.firstName}
            />
            <Text style={styles.errorText}>{errors.firstName}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(lastName) => setForm({ ...form, lastName })}
              placeholder="Doe"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.lastName}
            />
            <Text style={styles.errorText}>{errors.lastName}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              onChangeText={(phone) => setForm({ ...form, phone })}
              placeholder="0722000000"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.phone}
            />
            <Text style={styles.errorText}>{errors.phone}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, gender: 'Male' })}
              >
                <View style={[styles.radioCircle, form.gender === 'Male' && styles.selectedRadioCircle]} />
                <Text style={styles.radioText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setForm({ ...form, gender: 'Female' })}
              >
                <View style={[styles.radioCircle, form.gender === 'Female' && styles.selectedRadioCircle]} />
                <Text style={styles.radioText}>Female</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{errors.gender}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={[
                styles.inputControl,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={{ flex: 1, height: 50, fontSize: 15, color: "#222" }}
                secureTextEntry={!showPassword}
                value={form.password}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{errors.password}</Text>
            <Text style={styles.passwordHint}>Password must be at least 8 characters long</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View
              style={[
                styles.inputControl,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(passwordConfirmation) =>
                  setForm({ ...form, passwordConfirmation })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={{ flex: 1, height: 50, fontSize: 15, color: "#222" }}
                secureTextEntry={!showPassword}
                value={form.passwordConfirmation}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          </View>

          {/* Show spinner while loading */}
          {loading ? (
            <ActivityIndicator size="large" color="#075eec" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity onPress={handleSignup}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.formAction}>
            
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  passwordHint: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    backgroundColor: "#075eec",
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#222",
  },
});