// app/screens/PondDetail.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PondDetail = () => {
  const route = useRoute();
  const { pondId, pondName } = route.params;
  const [numAerators, setNumAerators] = useState('');
  const [totalCurrent, setTotalCurrent] = useState(0);

  useEffect(() => {
    const loadPondData = async () => {
      try {
        const savedNumAerators = await AsyncStorage.getItem(`pond_${pondId}_numAerators`);
        if (savedNumAerators !== null) {
          setNumAerators(parseInt(savedNumAerators, 10));
          setTotalCurrent(parseInt(savedNumAerators, 10) * 3.5);
        }
      } catch (error) {
        console.error('Failed to load pond data:', error);
      }
    };

    loadPondData();
  }, [pondId]);

  const handleNumAeratorsChange = async (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setNumAerators(num);
      setTotalCurrent(num * 3.5);

      try {
        await AsyncStorage.setItem(`pond_${pondId}_numAerators`, value);
      } catch (error) {
        console.error('Failed to save pond data:', error);
      }
    } else {
      setNumAerators('');
      setTotalCurrent(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{pondName}</Text>
        <Text style={styles.pondId}>ID: {pondId}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter number of Aerators"
          keyboardType="numeric"
          value={numAerators.toString()}
          onChangeText={handleNumAeratorsChange}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Number of Aerators: {numAerators}</Text>
        <Text style={styles.detailText}>Total Current Required: {totalCurrent}A</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2, // Increased border width
    borderBottomColor: '#00796b', // Updated to match pondId color
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  pondId: {
    fontSize: 18,
    color: '#00796b',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#b3e5fc', // Light blue background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#b3e5fc', // Light blue background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#00796b',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
  },
});

export default PondDetail;

