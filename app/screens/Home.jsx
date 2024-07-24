import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // For colorful icons

const Home = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Welcome to AMS</Text>
      <Text style={styles.subtitle}>Aerator Monitoring System</Text>
    </View>
    <View style={styles.heroSection}>
      <Text style={styles.quote}>
        "Ensuring optimal conditions for your aquaculture operations, one aerator at a time."
      </Text>
    </View>
    <Text style={styles.description}>
      The Aerator Monitoring System (AMS) helps prawn and fish farmers ensure their aerators are working properly, especially during the night when aerators are crucial for providing dissolved oxygen in the water.
    </Text>
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Key Features</Text>
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <FontAwesome5 name="tachometer-alt" size={24} color="#ff5722" style={styles.icon} />
          <Text style={styles.featureText}>Real-time aerator status monitoring</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome5 name="bell" size={24} color="#4caf50" style={styles.icon} />
          <Text style={styles.featureText}>Instant notifications on aerator issues</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome5 name="tint" size={24} color="#2196f3" style={styles.icon} />
          <Text style={styles.featureText}>Monitoring of dissolved oxygen levels</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome5 name="plus-circle" size={24} color="#ffeb3b" style={styles.icon} />
          <Text style={styles.featureText}>Easy pond and aerator management</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome5 name="history" size={24} color="#9c27b0" style={styles.icon} />
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
    paddingVertical: 30,
    backgroundColor: '#f5f5f5', // Light gray background for modern look
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333', // Dark gray title
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666', // Medium gray subtitle
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 5,
  },
  heroSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  quote: {
    fontSize: 18,
    color: '#555555', // Medium gray quote
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff', // White background for contrast
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: '#333333', // Dark gray description
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark gray section title
    marginBottom: 10,
    textAlign: 'center',
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#ffffff', // White background for feature items
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#dddddd',
    borderWidth: 1,
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
