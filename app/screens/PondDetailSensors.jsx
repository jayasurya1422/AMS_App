import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

const PondDetailSensors = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pondId, currentSensor1, currentSensor2 } = route.params;
  const [i1, setI1] = useState(null);
  const [i2, setI2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/f2a9b276-b9ef-41ec-a61a-23ed08951d30');
        const data = await response.json();
        if (response.ok) {
          const stringPondId = pondId.toString();
          const pondData = data.ponds.find(p => p.pondId === stringPondId);
          if (pondData) {
            setI1(parseFloat(pondData.i1));
            setI2(parseFloat(pondData.i2));
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

    fetchAPIData();
  }, [pondId]);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/451184-Pedestrian_Crossing_Beep-London-England-Synth-Dry.wav') // Adjust path as needed
        );
        setSound(sound);
        setSoundLoaded(true);
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  useEffect(() => {
    if (soundLoaded) {
      if ((i1 < currentSensor1 || i2 < currentSensor2) && !alarmTriggered) {
        console.log('Alarm conditions met. Playing sound...');
        sound.playAsync().catch(error => {
          console.error('Error playing sound:', error);
        });
        setAlarmTriggered(true); // Set alarm as triggered
      } else if ((i1 >= currentSensor1 && i2 >= currentSensor2) && alarmTriggered) {
        console.log('Sensor values are within range. Stopping sound.');
        sound.stopAsync().catch(error => {
          console.error('Error stopping sound:', error);
        });
        setAlarmTriggered(false); // Reset alarm as not triggered
      }
    }
  }, [i1, i2, currentSensor1, currentSensor2, sound, soundLoaded, alarmTriggered]);

  const getColor = (value, current) => {
    return value < current ? '#FF4C4C' : '#4CAF50';
  };

  const renderPieChart = (label, value, current) => {
    return (
      <View style={styles.chartWrapper}>
        <Text style={styles.sensorLabel}>{label}</Text>
        <PieChart
          data={[
            {
              name: 'Current',
              amount: value,
              color: getColor(value, current),
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Remaining',
              amount: 0,
              color: 'transparent',
              legendFontColor: 'transparent',
              legendFontSize: 0,
            },
          ]}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f0f0f0',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            },
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pond Detail Sensors</Text>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => navigation.navigate('screens/PondDetail', { pondId })}
        >
          <Text style={styles.modifyButtonText}>Modify</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.detail}>Current for Sensor 1: {currentSensor1} A</Text>
      <Text style={styles.detail}>Current for Sensor 2: {currentSensor2} A</Text>
      {i1 !== null && i2 !== null && (
        <>
          {renderPieChart('Sensor 1', i1, currentSensor1)}
          {renderPieChart('Sensor 2', i2, currentSensor2)}
        </>
      )}
    </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    // No background color here
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modifyButton: {
    backgroundColor: '#FFB600',
    padding: 10,
    borderRadius: 5,
  },
  modifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  chartWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sensorLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PondDetailSensors;
