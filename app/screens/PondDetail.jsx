import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PondDetail = () => {
  const route = useRoute();
  const { pondId } = route.params;
  const [enteredAerators, setEnteredAerators] = useState('');
  const [totalCurrent, setTotalCurrent] = useState(0);
  const [pondData, setPondData] = useState(null);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/e8ab0fca-5bf9-460a-ae14-15c600c28401')
      .then(response => response.json())
      .then(data => {
        const pond = data.ponds.find(p => p.id === pondId);
        setPondData(pond);
      })
      .catch(error => console.error('Error fetching pond data:', error));
  }, [pondId]);

  const calculateTotalCurrent = () => {
    const current = parseFloat(enteredAerators) * 3.5;
    setTotalCurrent(current.toFixed(2));
    // Here, you can also call an API to update the current state or compare with real-time data
    // Example: fetch('https://api.example.com/current').then(response => response.json()).then(data => handleCurrentUpdate(data));
  };

  const handleCurrentUpdate = (incomingCurrent) => {
    const difference = Math.abs(totalCurrent - incomingCurrent);
    let notificationMessage = '';

    if (difference <= 3.5) {
      notificationMessage = 'No current is passing, all aerators are off.';
    } else {
      const setsOff = Math.floor(difference / 3.5);
      notificationMessage = `${setsOff} set(s) of aerators are off.`;
    }

    // Update UI or state with notificationMessage
  };

  if (!pondData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Pond Details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pond Details</Text>
      <Text>Pond ID: {pondData.id}</Text>
      <Text>Name: {pondData.name}</Text>
      <Text>Current: {pondData.current} amp</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of aerators"
        keyboardType="numeric"
        value={enteredAerators}
        onChangeText={text => setEnteredAerators(text)}
      />
      <Text style={styles.totalCurrent}>Total Current: {totalCurrent} amp</Text>
      {/* Add functionality to trigger `calculateTotalCurrent` and `handleCurrentUpdate` */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  totalCurrent: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default PondDetail;
