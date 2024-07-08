import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo vector icons

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
        </View>
        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
          />
        </View>
        {/* Confirm Password Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
          />
        </View>
      </View>
      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Signed Up')} // Replace with your sign-up logic
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Navigate to Sign In */}
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
