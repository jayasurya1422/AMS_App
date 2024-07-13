import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
  const notifications = [
    { id: 1, text: 'Your aerator has stopped working.', timestamp: '10:30 AM, July 10, 2024' },
    { id: 2, text: 'New pond added successfully.', timestamp: '9:15 AM, July 10, 2024' },
    { id: 3, text: 'Aerator maintenance is due.', timestamp: '8:00 AM, July 10, 2024' },
  ];

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No notifications yet</Text>
        </View>
      ) : (
        notifications.map(notification => (
          <View key={notification.id} style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{notification.text}</Text>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
