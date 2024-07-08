// app/screens/Ponds.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Ponds = () => {
  const [ponds, setPonds] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetch('https://run.mocky.io/v3/0805682e-dfe0-42cd-9bac-9aa8f6581a9e')
      .then((response) => response.json())
      .then((data) => setPonds(data.ponds))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const renderPond = ({ item }) => (
    <TouchableOpacity
      style={styles.pondItem}
      onPress={() => navigation.navigate('PondDetail', { pondId: item.id })}
    >
      <Text style={styles.pondName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Ponds</Text>
      <FlatList
        data={ponds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPond}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pondItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  pondName: {
    fontSize: 18,
    color: 'black',
  },
});

export default Ponds;
