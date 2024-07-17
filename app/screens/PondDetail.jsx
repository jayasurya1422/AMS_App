import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PondDetail = () => {
  const route = useRoute();
  const { pondId, pondName } = route.params;
  const [numAerators, setNumAerators] = useState('');
  const [totalCurrentRequired, setTotalCurrentRequired] = useState(0);
  const [totalCurrentTaken, setTotalCurrentTaken] = useState(0);
  const [aerators, setAerators] = useState([]);

  useEffect(() => {
    const loadPondData = async () => {
      try {
        const savedNumAerators = await AsyncStorage.getItem(`pond_${pondId}_numAerators`);
        if (savedNumAerators !== null) {
          const num = parseInt(savedNumAerators, 10);
          setNumAerators(num);
          fetchCurrentValues(num);
        }
      } catch (error) {
        console.error('Failed to load pond data:', error);
      }
    };

    loadPondData();
  }, [pondId]);

  const fetchCurrentValues = async (numAerators) => {
    try {
      const response = await fetch('https://run.mocky.io/v3/7996e6a8-d36d-4dfb-9d7b-95f70f2c7c5d');
      const data = await response.json();

      if (response.ok) {
        const pondData = data.ponds.find(pond => pond.pondId === pondId);

        if (pondData) {
          let aeratorsData = pondData.aerators.slice(0, numAerators); // Slice aerators based on user input

          // Fill with placeholder data if the number of aerators entered is greater than available
          if (numAerators > aeratorsData.length) {
            const remainingAeratorsCount = numAerators - aeratorsData.length;
            const remainingAerators = Array.from({ length: remainingAeratorsCount }, () => ({
              current: Math.floor(Math.random() * 10) + 1,
            }));
            aeratorsData = [...aeratorsData, ...remainingAerators];
          } else {
            // Ensure unique current values for each aerator
            aeratorsData = aeratorsData.map(aerator => ({
              ...aerator,
              current: Math.floor(Math.random() * 10) + 1,
            }));
          }

          setAerators(aeratorsData);

          const totalTaken = aeratorsData.reduce((acc, aerator) => acc + aerator.current, 0);
          setTotalCurrentTaken(totalTaken);

          // Ensure total current required is always greater than or equal to total current taken
          const calculatedTotalRequired = numAerators * 3.5;
          setTotalCurrentRequired(Math.max(calculatedTotalRequired, totalTaken + 0.1)); // Adding a small margin to ensure it's greater
        } else {
          console.error('Pond data not found');
        }
      } else {
        console.error('Failed to fetch current values:', data.message);
      }
    } catch (error) {
      console.error('Error fetching current values:', error);
    }
  };

  const handleNumAeratorsChange = async (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setNumAerators(num);
      fetchCurrentValues(num);

      try {
        await AsyncStorage.setItem(`pond_${pondId}_numAerators`, value);
      } catch (error) {
        console.error('Failed to save pond data:', error);
      }
    } else {
      setNumAerators('');
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
        <Text style={styles.inputLabel}>Number of Sets:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of Aerators"
          keyboardType="numeric"
          value={numAerators.toString()}
          onChangeText={handleNumAeratorsChange}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Pond Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Number of Aerators:</Text>
          <Text style={styles.detailValue}>{numAerators}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Current Required:</Text>
          <Text style={styles.detailValue}>{totalCurrentRequired.toFixed(1)}A</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Current Being Taken:</Text>
          <Text style={styles.detailValue}>{totalCurrentTaken.toFixed(1)}A</Text>
        </View>

        <Text style={styles.sectionTitle}>Current Values</Text>
        {aerators.map((aerator, index) => (
          <View key={index} style={styles.aeratorItem}>
            <Text style={styles.aeratorLabel}>Aerator {index + 1}:</Text>
            <Text style={styles.aeratorValue}>{aerator.current.toFixed(1)}A</Text>
            <PieChart
              data={getPieChartData(aerator.current)}
              width={screenWidth / 2}
              height={150}
              chartConfig={chartConfig}
              accessor={"current"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
  },
  pondId: {
    fontSize: 16,
    color: '#00796b',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333333',
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 10,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333333',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
  aeratorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  aeratorLabel: {
    fontSize: 16,
    color: '#333333',
  },
  aeratorValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
});

export default PondDetail;
