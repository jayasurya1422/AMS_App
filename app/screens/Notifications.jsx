import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
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
            <Text style={styles.notificationText}>{notification.text}</Text>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'lightblue'
  },
  noNotificationsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  noNotificationsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  notificationContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});

export default Notifications;
