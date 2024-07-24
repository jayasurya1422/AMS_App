import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

const PondDetailSensors = () => {
  const route = useRoute();
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
        const response = await fetch('https://run.mocky.io/v3/83ac8cce-dcac-4173-94b3-d91bf9c001ed');
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
          require('../../assets/mixkit-alert-alarm-1005.wav') // Adjust path as needed
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
        sound.playAsync().catch(error => {
          console.error('Error playing sound:', error);
        });
        setAlarmTriggered(true); // Set alarm as triggered
      } else if (i1 >= currentSensor1 && i2 >= currentSensor2) {
        // Reset the alarmTriggered state if conditions are not met
        setAlarmTriggered(false);
      }
    }
  }, [i1, i2, currentSensor1, currentSensor2, sound, soundLoaded, alarmTriggered]);

  const getColor = (value, current) => {
    return value < current ? '#FF0000' : '#00FF00';
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
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pond Detail Sensors</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  chartWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sensorLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PondDetailSensors;
