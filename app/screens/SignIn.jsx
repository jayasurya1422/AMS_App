import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('User not found');
        return;
      }

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        if (userData.password === password) {
          AsyncStorage.setItem('userData', JSON.stringify(userData))
          .then(() => {
            return AsyncStorage.setItem('userEmail', email);
          })
          .then(() => {
            console.log('User data stored in AsyncStorage:', userData);
            navigation.replace('screens/HomeScreen');
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
            alert('Failed to store user data');
          });
        } else {
          alert('Incorrect password');
        }
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/signin.png')} // Add your icon image in the assets/images folder
        style={styles.iconImage}
      />
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000000"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      {/* Navigate to Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate('screens/SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f8fa',
  },
  iconImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.68,
    elevation: 11,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#3498db', // Blue color
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#3498db',
    fontSize: 22,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignIn;
