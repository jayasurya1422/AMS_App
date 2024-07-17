import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo

const Home = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Welcome to AMS</Text>
      <Text style={styles.subtitle}>Aerator Monitoring System</Text>
    </View>
    <Text style={styles.quote}>
      "Ensuring optimal conditions for your aquaculture operations, one aerator at a time."
    </Text>
    <Text style={styles.description}>
      The Aerator Monitoring System (AMS) helps prawn and fish farmers ensure their aerators are working properly, especially during the night when aerators are crucial for providing dissolved oxygen in the water.
    </Text>
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Key Features</Text>
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
      <Text style={styles.sectionTitle}>Get Started</Text>
      <Text style={styles.description}>
        To get started, navigate to the Ponds section to add your ponds and start monitoring your aerators. Stay informed and keep your aquaculture operations running smoothly with AMS!
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2', // Dark blue title
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#555555', // Dark gray subtitle
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 5,
  },
  quote: {
    fontSize: 18,
    color: '#1976d2', // Dark blue quote
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 10,
    lineHeight: 24,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#333333', // Dark gray description
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#e3f2fd', // Light blue background for feature items
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333333', // Dark gray feature text
    fontWeight: '600',
  },
});

export default Home;
