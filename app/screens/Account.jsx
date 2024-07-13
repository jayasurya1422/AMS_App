import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

const Account = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility

  const handleLogout = async () => {
    // Clear pond data from AsyncStorage
    try {
      // Example: Clear pond data for pondId 1
      await AsyncStorage.removeItem(`pond_1_numAerators`);
      // Add additional AsyncStorage keys related to ponds if needed
    } catch (error) {
      console.error('Failed to clear pond data:', error);
    }
    // Navigate to the index page (SignIn and SignUp options)
    navigation.navigate('index');
  };

  const handleEditAccount = () => {
    // Navigate to the edit account page
    navigation.navigate('EditAccount'); // Replace 'EditAccount' with your actual edit account screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account Settings</Text>
        {/* Edit icon */}
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setShowMenu(!showMenu)} // Toggle menu visibility
        >
          <Ionicons name="settings-outline" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Menu dropdown */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleEditAccount} // Navigate to edit account screen
          >
            <Ionicons name="person-outline" size={24} color="#007bff" />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout} // Logout functionality
          >
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
            <Text style={[styles.menuText, { color: '#e74c3c' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editIcon: {
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Account;
