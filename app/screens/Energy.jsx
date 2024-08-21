import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Ponds = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('https://energybackend.onrender.com/api/sensordata');
        const data = await response.json();
        if (response.ok) {
          setSensorData(data);
          // Navigate to AlarmPage if Power_factor is below 0.8
          if (data.Power_factor < 0.9) {
            navigation.navigate('screens/AlarmPage');
          }
        } else {
          console.error('Failed to fetch API data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!sensorData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available.</Text>
      </View>
    );
  }

  const powerFactorColor = sensorData.Power_factor >= 0.9 ? 'green' : 'red';

  return (
    <ScrollView style={styles.container}>
      {sensorData.Power_factor !== undefined && (
        <View key="Power_factor" style={styles.detailRow}>
          <Text style={[styles.detailValue, { color: powerFactorColor }]}>
            {`Power Factor: ${sensorData.Power_factor}`}
          </Text>
        </View>
      )}
      {Object.entries(sensorData)
        .filter(([key]) => key !== 'Power_factor')
        .map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailValue}>{`${key}: ${value}`}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  detailRow: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default Ponds;
