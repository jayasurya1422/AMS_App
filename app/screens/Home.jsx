// app/screens/Home.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo

const Home = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Welcome to AMS</Text>
    <Text style={styles.subtitle}>Aerator Monitoring System</Text>
    <Text style={styles.quote}>
      "Ensuring optimal conditions for your aquaculture operations, one aerator at a time."
    </Text>
    <Text style={styles.description}>
      The Aerator Monitoring System (AMS) helps prawn and fish farmers ensure their aerators are working properly, especially during the night when aerators are crucial for providing dissolved oxygen in the water.
    </Text>
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Key Features:</Text>
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <FontAwesome name="tachometer" size={24} color="#1976d2" style={styles.icon} />
          <Text style={styles.featureText}>Real-time aerator status monitoring</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="bell" size={24} color="#1976d2" style={styles.icon} />
          <Text style={styles.featureText}>Instant notifications on aerator issues</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="tint" size={24} color="#1976d2" style={styles.icon} />
          <Text style={styles.featureText}>Monitoring of dissolved oxygen levels</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="plus-circle" size={24} color="#1976d2" style={styles.icon} />
          <Text style={styles.featureText}>Easy pond and aerator management</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome name="history" size={24} color="#1976d2" style={styles.icon} />
          <Text style={styles.featureText}>Historical data and reports</Text>
        </View>
      </View>
    </View>
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Get Started:</Text>
      <Text style={styles.description}>
        To get started, navigate to the Ponds section to add your ponds and start monitoring your aerators. Stay informed and keep your aquaculture operations running smoothly with AMS!
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2', // Dark blue title
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#555555', // Dark gray subtitle
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quote: {
    fontSize: 18,
    color: '#1976d2', // Dark blue quote
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: '#333333', // Dark gray description
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2', // Dark blue section title
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f1f8e9', // Light green background for feature items
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  icon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Home;
