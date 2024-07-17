import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } 
    try {
      await addDoc(collection(db, 'users'), {
        firstName,
        lastName,
        location,
        email,
        mobileNumber, // Add mobileNumber to Firestore
        password // Consider hashing the password before storing it
      });
      alert('User registered successfully!');
      navigation.navigate('screens/SignIn');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/signup.png')} // Adjusted path
        style={styles.iconImage}
      />
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        {[
          { placeholder: 'Enter first name', value: firstName, onChangeText: setFirstName, icon: 'text' },
          { placeholder: 'Enter last name', value: lastName, onChangeText: setLastName, icon: 'text' },
          { placeholder: 'Enter location', value: location, onChangeText: setLocation, icon: 'location' },
          { placeholder: 'Enter Email', value: email, onChangeText: setEmail, icon: 'mail-outline', keyboardType: 'email-address' },
          { placeholder: 'Enter Mobile Number', value: mobileNumber, onChangeText: setMobileNumber, icon: 'call-outline', keyboardType: 'phone-pad' },
          { placeholder: 'Enter Password', value: password, onChangeText: setPassword, icon: 'lock-closed-outline', secureTextEntry: true },
          { placeholder: 'Confirm Password', value: confirmPassword, onChangeText: setConfirmPassword, icon: 'lock-closed-outline', secureTextEntry: true }
        ].map((inputProps, index) => (
          <View style={styles.inputWrapper} key={index}>
            <Ionicons name={inputProps.icon} size={24} color="#000000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={inputProps.placeholder}
              placeholderTextColor="#000000"
              value={inputProps.value}
              onChangeText={inputProps.onChangeText}
              keyboardType={inputProps.keyboardType}
              secureTextEntry={inputProps.secureTextEntry}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('screens/SignIn')}>
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
  iconImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
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
    height: 45,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3498db',
    width: '100%',
    height: 45,
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
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  linkText: {
    color: '#3498db',
    fontSize: 22,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
