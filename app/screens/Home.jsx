// app/screens/Home.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to AMS</Text>
    <Text style={styles.subtitle}>Aerator Management System</Text>
  </View>
);

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
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});

export default Home;

// Similarly style SignIn.jsx and SignUp.jsx
