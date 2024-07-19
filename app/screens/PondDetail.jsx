import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PondDetail = () => {
  const route = useRoute();
  const { pondId, pondName } = route.params;
  const [numAeratorsSensor1, setNumAeratorsSensor1] = useState('');
  const [numAeratorsSensor2, setNumAeratorsSensor2] = useState('');
  const [totalCurrentTaken, setTotalCurrentTaken] = useState(0);
  const [totalCurrentRequired, setTotalCurrentRequired] = useState(0);
  const [aeratorsSensor1, setAeratorsSensor1] = useState([]);
  const [aeratorsSensor2, setAeratorsSensor2] = useState([]);

  useEffect(() => {
    const loadPondData = async () => {
      try {
        const savedNumAeratorsSensor1 = await AsyncStorage.getItem(`pond_${pondId}_numAeratorsSensor1`);
        const savedNumAeratorsSensor2 = await AsyncStorage.getItem(`pond_${pondId}_numAeratorsSensor2`);
        if (savedNumAeratorsSensor1 !== null && savedNumAeratorsSensor2 !== null) {
          const numSensor1 = parseInt(savedNumAeratorsSensor1, 10);
          const numSensor2 = parseInt(savedNumAeratorsSensor2, 10);
          setNumAeratorsSensor1(numSensor1);
          setNumAeratorsSensor2(numSensor2);
          setTotalCurrentRequired(3.5 * (numSensor1 + numSensor2));
          fetchCurrentValues(numSensor1, numSensor2);
        }
      } catch (error) {
        console.error('Failed to load pond data:', error);
      }
    };

    loadPondData();
  }, [pondId]);

  const fetchCurrentValues = async (numAeratorsSensor1, numAeratorsSensor2) => {
    try {
      const response = await fetch('https://run.mocky.io/v3/93f48733-516c-4f47-b967-a0ffb4396016');
      const data = await response.json();

      console.log('API Response:', data); // Log the entire response

      if (response.ok) {
        const stringPondId = pondId.toString();
        let pondData = data.ponds.find(pond => pond.pondId === stringPondId);

        console.log('Matching Pond Data:', pondData); // Log the matching pond data

        // If no pond data is found for the given pondId, generate it dynamically
        if (!pondData) {
          console.log(`Pond data not found for pondId: ${pondId}, generating dynamically.`);
          pondData = {
            pondId: stringPondId,
            pondName: `Pond ${pondId}`,
            i1: (Math.random() * 10).toFixed(2),
            i2: (Math.random() * 10).toFixed(2),
          };
        }

        const currentSensor1 = parseFloat(pondData.i1);
        const currentSensor2 = parseFloat(pondData.i2);
        const totalCurrent = currentSensor1 + currentSensor2;
        setTotalCurrentTaken(totalCurrent);

        // Ensure total current required is greater than total current taken
        if (totalCurrent >= (3.5 * (numAeratorsSensor1 + numAeratorsSensor2))) {
          setTotalCurrentRequired(totalCurrent + 1); // Adding 1 to ensure it's greater
        } else {
          setTotalCurrentRequired(3.5 * (numAeratorsSensor1 + numAeratorsSensor2));
        }

        // Generate random values for aerators
        let aeratorsDataSensor1 = [];
        let remainingCurrentSensor1 = currentSensor1;

        for (let i = 1; i <= numAeratorsSensor1; i++) {
          let current;
          if (i === numAeratorsSensor1) {
            current = remainingCurrentSensor1; // Assign the remaining current to the last aerator
          } else {
            current = parseFloat((Math.random() * (remainingCurrentSensor1 / (numAeratorsSensor1 - i + 1))).toFixed(2));
            remainingCurrentSensor1 -= current;
          }
          aeratorsDataSensor1.push({ aeratorId: i, current });
        }

        let aeratorsDataSensor2 = [];
        let remainingCurrentSensor2 = currentSensor2;

        for (let i = 1; i <= numAeratorsSensor2; i++) {
          let current;
          if (i === numAeratorsSensor2) {
            current = remainingCurrentSensor2; // Assign the remaining current to the last aerator
          } else {
            current = parseFloat((Math.random() * (remainingCurrentSensor2 / (numAeratorsSensor2 - i + 1))).toFixed(2));
            remainingCurrentSensor2 -= current;
          }
          aeratorsDataSensor2.push({ aeratorId: i, current });
        }

        setAeratorsSensor1(aeratorsDataSensor1);
        setAeratorsSensor2(aeratorsDataSensor2);
      } else {
        console.error('Failed to fetch current values:', data.message);
      }
    } catch (error) {
      console.error('Error fetching current values:', error);
    }
  };

  const handleNumAeratorsChange = async (value, sensor) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      if (sensor === 'sensor1') {
        setNumAeratorsSensor1(num);
      } else {
        setNumAeratorsSensor2(num);
      }
      const totalNumAerators = (sensor === 'sensor1' ? num : numAeratorsSensor1) + (sensor === 'sensor2' ? num : numAeratorsSensor2);
      setTotalCurrentRequired(3.5 * totalNumAerators);
      fetchCurrentValues((sensor === 'sensor1' ? num : numAeratorsSensor1), (sensor === 'sensor2' ? num : numAeratorsSensor2));

      try {
        await AsyncStorage.setItem(`pond_${pondId}_numAerators${sensor === 'sensor1' ? 'Sensor1' : 'Sensor2'}`, value);
      } catch (error) {
        console.error('Failed to save pond data:', error);
      }
    } else {
      if (sensor === 'sensor1') {
        setNumAeratorsSensor1('');
      } else {
        setNumAeratorsSensor2('');
      }
      setTotalCurrentRequired(0);
      setTotalCurrentTaken(0);
    }
  };

  const getPieChartData = (current) => {
    const highThreshold = 7;
    const mediumThreshold = 4;
    return [
      { name: 'High', current: current >= highThreshold ? 1 : 0, color: '#9deb56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Medium', current: current >= mediumThreshold && current < highThreshold ? 1 : 0, color: '#f5ff89', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Low', current: current < mediumThreshold ? 1 : 0, color: '#ff4242', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
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
          value={numAeratorsSensor1.toString()}
          onChangeText={(value) => handleNumAeratorsChange(value, 'sensor1')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Aerators for Sensor 2:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of Aerators for Sensor 2"
          keyboardType="numeric"
          value={numAeratorsSensor2.toString()}
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
          <Text style={styles.detailLabel}>Number of Aerators for Sensor 2:</Text>
          <Text style={styles.detailValue}>{numAeratorsSensor2}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Current Taken:</Text>
          <Text style={styles.detailValue}>{totalCurrentTaken} A</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Current Required:</Text>
          <Text style={styles.detailValue}>{totalCurrentRequired} A</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Aerators Current Distribution</Text>
        <Text style={styles.subSectionTitle}>Sensor 1 Aerators:</Text>
        {aeratorsSensor1.map(aerator => (
          <View key={aerator.aeratorId} style={styles.aeratorItem}>
            <Text style={styles.aeratorLabel}>Aerator {aerator.aeratorId}:</Text>
            <Text style={styles.aeratorValue}>{aerator.current} A</Text>
            <PieChart
              data={getPieChartData(aerator.current)}
              width={screenWidth}
              height={120}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="current"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 10]}
              absolute
            />
          </View>
        ))}
        <Text style={styles.subSectionTitle}>Sensor 2 Aerators:</Text>
        {aeratorsSensor2.map(aerator => (
          <View key={aerator.aeratorId} style={styles.aeratorItem}>
            <Text style={styles.aeratorLabel}>Aerator {aerator.aeratorId}:</Text>
            <Text style={styles.aeratorValue}>{aerator.current} A</Text>
            <PieChart
              data={getPieChartData(aerator.current)}
              width={screenWidth}
              height={120}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="current"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 10]}
              absolute
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pondId: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  aeratorItem: {
    marginBottom: 20,
  },
  aeratorLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  aeratorValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PondDetail;
