// app/screens/Home.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo

const Home = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image 
      source={{ uri: 'https://example.com/ams-logo.png' }} 
      style={styles.logo}
    />
    <Text style={styles.title}>Welcome to AMS</Text>
    <Text style={styles.subtitle}>Aerator Monitoring System</Text>
    <Text style={styles.description}>
      The Aerator Monitoring System (AMS) helps prawn and fish farmers ensure their aerators are working properly, especially during the night when aerators are crucial for providing dissolved oxygen in the water.
    </Text>
    <Text style={styles.sectionTitle}>Key Features:</Text>
    <View style={styles.featureList}>
      <View style={styles.featureItem}>
        <FontAwesome name="tachometer" size={24} color="#1a73e8" style={styles.icon} />
        <Text style={styles.featureText}>Real-time monitoring of aerator status</Text>
      </View>
      <View style={styles.featureItem}>
        <FontAwesome name="bell" size={24} color="#1a73e8" style={styles.icon} />
        <Text style={styles.featureText}>Notifications when an aerator stops working</Text>
      </View>
      <View style={styles.featureItem}>
        <FontAwesome name="tint" size={24} color="#1a73e8" style={styles.icon} />
        <Text style={styles.featureText}>Monitoring of dissolved oxygen levels in each pond</Text>
      </View>
      <View style={styles.featureItem}>
        <FontAwesome name="plus-circle" size={24} color="#1a73e8" style={styles.icon} />
        <Text style={styles.featureText}>Easy addition and management of ponds and aerators</Text>
      </View>
      <View style={styles.featureItem}>
        <FontAwesome name="history" size={24} color="#1a73e8" style={styles.icon} />
        <Text style={styles.featureText}>Historical data and reports</Text>
      </View>
    </View>
    <Text style={styles.description}>
      Our system continuously checks the current being taken by each aerator and alerts you immediately if an aerator stops working. You can also track the dissolved oxygen levels to ensure optimal conditions for your prawns or fish.
    </Text>
    <Text style={styles.sectionTitle}>Get Started:</Text>
    <Text style={styles.description}>
      To get started, navigate to the Ponds section to add your ponds and start monitoring your aerators. Stay informed and keep your aquaculture operations running smoothly with AMS!
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a73e8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a73e8',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  featureList: {
    marginBottom: 20,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8f5e9', // Light green background
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Home;
