import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    // Clear any user data or tokens stored
    try {
      await AsyncStorage.clear(); // Clear all stored data
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
    // Navigate to the index page (SignIn and SignUp options)
    navigation.navigate('screens/SignIn'); // Replace 'SignIn' with your actual authentication screen name
  };

  const handleEditProfile = () => {
    // Navigate to the edit profile screen
    navigation.navigate('EditProfile'); // Replace 'EditProfile' with your actual edit profile screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account Settings</Text>
        {/* Edit icon */}
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Ionicons name="settings-outline" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Menu dropdown */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleEditProfile}
          >
            <Ionicons name="person-outline" size={24} color="#007bff" />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
            <Text style={[styles.menuText, { color: '#e74c3c' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.contentText}>
          Welcome to your account settings!
        </Text>
        <Text style={styles.contentText}>
          Manage your profile and preferences here.
        </Text>
      </View>
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
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
});

export default Account;
