import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const PondDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pondId, pondName } = route.params;
  const [numAeratorsSensor1, setNumAeratorsSensor1] = useState('');
  const [numAeratorsSensor2, setNumAeratorsSensor2] = useState('');

  useEffect(() => {
    const loadPondData = async () => {
      try {
        const savedNumAeratorsSensor1 = await AsyncStorage.getItem(`pond_${pondId}_numAeratorsSensor1`);
        const savedNumAeratorsSensor2 = await AsyncStorage.getItem(`pond_${pondId}_numAeratorsSensor2`);
        if (savedNumAeratorsSensor1 !== null && savedNumAeratorsSensor2 !== null) {
          setNumAeratorsSensor1(savedNumAeratorsSensor1);
          setNumAeratorsSensor2(savedNumAeratorsSensor2);
        }
      } catch (error) {
        console.error('Failed to load pond data:', error);
      }
    };
    loadPondData();
  }, [pondId]);

  const calculateCurrent = (numAerators) => {
    const aerators = parseInt(numAerators, 10);
    return isNaN(aerators) ? 0 : (3.5 * aerators).toFixed(2);
  };

  const handleNumAeratorsChange = (value, sensor) => {
    if (sensor === 'sensor1') {
      setNumAeratorsSensor1(value);
    } else if (sensor === 'sensor2') {
      setNumAeratorsSensor2(value);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(`pond_${pondId}_numAeratorsSensor1`, numAeratorsSensor1);
      await AsyncStorage.setItem(`pond_${pondId}_numAeratorsSensor2`, numAeratorsSensor2);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Failed to save pond data:', error);
    }
  };

  const handleOkPress = () => {
    const currentSensor1 = calculateCurrent(numAeratorsSensor1);
    const currentSensor2 = calculateCurrent(numAeratorsSensor2);

    navigation.navigate('screens/PondDetailSensors', {
      pondId,
      numAeratorsSensor1,
      numAeratorsSensor2,
      currentSensor1,
      currentSensor2,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{pondName}</Text>
        <Text style={styles.pondId}>{`ID: ${pondId}`}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Aerators for Sensor 1:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of Aerators for Sensor 1"
          keyboardType="numeric"
          value={numAeratorsSensor1}
          onChangeText={(value) => handleNumAeratorsChange(value, 'sensor1')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Aerators for Sensor 2:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of Aerators for Sensor 2"
          keyboardType="numeric"
          value={numAeratorsSensor2}
          onChangeText={(value) => handleNumAeratorsChange(value, 'sensor2')}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Pond Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Number of Aerators for Sensor 1:</Text>
          <Text style={styles.detailValue}>{numAeratorsSensor1}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Current Passing through Sensor 1:</Text>
          <Text style={styles.detailValue}>{calculateCurrent(numAeratorsSensor1)} A</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Number of Aerators for Sensor 2:</Text>
          <Text style={styles.detailValue}>{numAeratorsSensor2}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Current Passing through Sensor 2:</Text>
          <Text style={styles.detailValue}>{calculateCurrent(numAeratorsSensor2)} A</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOkPress}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  pondId: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth:2,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#333', // Dark border color
    borderWidth: 2, // Increased border width for emphasis
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 17,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PondDetail;
