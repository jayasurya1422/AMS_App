import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const PondDetailSensors = () => {
  const route = useRoute();
  const { pondId, numAeratorsSensor1, numAeratorsSensor2, currentSensor1, currentSensor2 } = route.params;
  const [i1, setI1] = useState(null);
  const [i2, setI2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/93f48733-516c-4f47-b967-a0ffb4396016');
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

  const getColor = (sensorCurrent, sensorI) => {
    return sensorI < sensorCurrent ? '#FF0000' : '#00FF00';
  };

  const renderPieChart = (value, current) => {
    const color = getColor(current, value);
    return (
      <PieChart
        data={[
          {
            name: 'Current',
            amount: value,
            color: color,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Remaining',
            amount: 0, // Show no remaining portion
            color: 'transparent', // Hide the remaining part
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
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pond Detail Sensors</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.sensorLabel}>Sensor 1</Text>
        {renderPieChart(currentSensor1, i1)}
        <Text style={styles.sensorLabel}>Sensor 2</Text>
        {renderPieChart(currentSensor2, i2)}
      </View>
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
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sensorLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PondDetailSensors;
