// components/Header.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>{title}</Text>
      </View>
      <View style={styles.navContainer}>
        <Ionicons
          name="md-menu"
          size={32}
          color="#fff"
          onPress={() => navigation.openDrawer()} // Example for drawer navigation
          style={styles.menuIcon}
        />
        {/* Add more icons for additional navigation options */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db', // Adjust background color as needed
    paddingHorizontal: 20,
    paddingTop: 20, // Adjust padding as needed
    paddingBottom: 10, // Adjust padding as needed
    elevation: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50, // Adjust logo size as needed
    height: 50, // Adjust logo size as needed
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // Adjust spacing between logo and app name
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: 10, // Adjust spacing between app name and menu icon
  },
});

export default Header;
