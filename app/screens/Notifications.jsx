import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Notifications = ({ showNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showNotifications) {
      // Simulating initial loading state
      setTimeout(() => {
        setLoading(false);
        // Simulating fetched notifications
        setNotifications([
          'Notification 1: No current is passing, all aerators are off.',
          'Notification 2: 1 set of aerators is off.',
          // Add more notifications as needed
        ]);
      }, 1000); // Simulating 2 seconds delay
    }
  }, [showNotifications]);

  if (!showNotifications) {
    return null; // Don't render anything if showNotifications is false
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.map((notification, index) => (
        <Text key={index} style={styles.notification}>
          {notification}
        </Text>
      ))}
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
  notification: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Notifications;
