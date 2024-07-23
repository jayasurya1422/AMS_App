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
        <Text style={styles.pondId}>ID: {pondId}</Text>
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
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pondId: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PondDetail;
