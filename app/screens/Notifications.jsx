import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Notifications = () => {
  const route = useRoute();
  const pondName = route.params?.pondName || '';

  const navigation = useNavigation();

  // State to store notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your aerator has stopped working.', timestamp: '10:30 AM, July 10, 2024' },
    { id: 2, text: 'Aerator maintenance is due.', timestamp: '9:15 AM, July 10, 2024' },
  ]);

  // Function to add a new notification for the added pond
  const addPondNotification = (pondName) => {
    const newNotification = {
      id: notifications.length + 1,
      text: `${pondName} added successfully.`,
      timestamp: new Date().toLocaleString(),
    };

    // Update notifications state by appending new notification
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  // useEffect to add notification only once when pondName changes
  useEffect(() => {
    if (pondName.trim() !== '') {
      addPondNotification(pondName);
    }
  }, [pondName]); // Run this effect whenever pondName changes

  // Function to navigate to a specific screen when notification is pressed
  const handleNotificationPress = () => {
    // Navigate to a specific screen (replace 'NotificationDetail' with your screen name)
    navigation.navigate('NotificationDetail');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No notifications yet</Text>
        </View>
      ) : (
        notifications.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationContainer}
            onPress={handleNotificationPress}
          >
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText}>{notification.text}</Text>
              <Text style={styles.timestamp}>{notification.timestamp}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  noNotificationsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: 'stretch',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  notificationContent: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#1976d2',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 14,
    color: '#000000',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Notifications;