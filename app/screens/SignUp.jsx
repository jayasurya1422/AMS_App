import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/firebase'; 

// Import Firestore instance
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Add validation if necessary

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Add user to Firestore
    db.collection('users').add({
      firstName,
      lastName,
      location,
      email,
      mobileNumber,
      password,
    })
    .then(() => {
      alert('User signed up successfully');
      navigation.navigate('SignIn');
    })
    .catch(error => {
      console.error('Error signing up: ', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="text" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="text" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="location" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  linkText: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignUp;

