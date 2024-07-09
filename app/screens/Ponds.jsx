import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Ponds = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://run.mocky.io/v3/e8ab0fca-5bf9-460a-ae14-15c600c28401')
      .then(response => response.json())
      .then(data => {
        setPonds(data.ponds);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handlePondPress = (pondId) => {
    navigation.navigate('PondDetail', { pondId });
  };

  const renderPond = ({ item }) => (
    <TouchableOpacity
      style={styles.pondItem}
      onPress={() => handlePondPress(item.id)}
    >
      <Text style={styles.pondName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
