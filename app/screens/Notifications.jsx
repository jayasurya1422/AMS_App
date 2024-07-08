// app/screens/Notifications.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    {/* Add Notifications content here */}
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
});

export default Notifications;
