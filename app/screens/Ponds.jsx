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

      {addingPond && (
        <View style={styles.addPondContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter pond name"
            value={pondName}
            onChangeText={setPondName}
            autoFocus={true} // Autofocus on input when adding pond
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={addPond}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
              onPress={() => setAddingPond(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!addingPond && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddingPond(true)}
        >
          <Text style={styles.addButtonText}>Add Pond</Text>
        </TouchableOpacity>
      )}
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
  addButton: {
    backgroundColor: '#28a745', // Light green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
  },
  addPondContainer: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007bff', // Blue background for "Add"
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Ponds;
