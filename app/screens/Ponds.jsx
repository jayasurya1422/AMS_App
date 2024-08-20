import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Ponds = () => {
  const [ponds, setPonds] = useState([]);
  const [addingPond, setAddingPond] = useState(false);
  const [pondName, setPondName] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
        } else {
          setError('No user email found');
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
        setError('Failed to fetch user email');
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchPonds = async () => {
      if (userEmail) {
        try {
          const pondsQuery = query(collection(db, 'ponds'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(pondsQuery);

          if (!querySnapshot.empty) {
            const pondsData = querySnapshot.docs[0].data();
            setPonds(pondsData.ponds || []);
          } else {
            // No document found, create a new one
            const docRef = await addDoc(collection(db, 'ponds'), { email: userEmail, ponds: [] });
            setPonds([]);
          }
        } catch (error) {
          console.error('Error fetching ponds:', error);
          setError('Failed to fetch ponds');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPonds();
  }, [userEmail]);

  const addPond = async () => {
    if (!pondName.trim()) {
      Alert.alert('Error', 'Pond name cannot be empty');
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'User email is not set');
      return;
    }

    try {
      const pondsRef = collection(db, 'ponds');
      const pondsQuery = query(pondsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(pondsQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const pondsData = querySnapshot.docs[0].data();
        const updatedPonds = [...pondsData.ponds, pondName.trim()];

        await updateDoc(docRef, { ponds: updatedPonds });
        setPonds(updatedPonds);
        setPondName('');
        setAddingPond(false);
        navigation.navigate('Notifications', { pondName: pondName.trim() });
      } else {
        // Document does not exist, create a new one
        await addDoc(collection(db, 'ponds'), {
          email: userEmail,
          ponds: [pondName.trim()],
        });
        setPonds([pondName.trim()]);
        setPondName('');
        setAddingPond(false);
        navigation.navigate('Notifications', { pondName: pondName.trim() });
      }
    } catch (error) {
      console.error('Error adding pond:', error);
      Alert.alert('Error', 'Failed to add pond');
    }
  };

  const renderPond = ({ item }) => (
    <TouchableOpacity
      style={styles.pondItem}
      onPress={() => navigation.navigate('screens/PondDetail', { pondName: item })}
    >
      <Text style={styles.pondName}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Available Ponds</Text>

        {ponds.length === 0 ? (
          <Text style={styles.noPondsText}>No ponds found. Add a new pond!</Text>
        ) : (
          <FlatList
            data={ponds}
            keyExtractor={(item, index) => index.toString()} // Use index as key
            renderItem={renderPond}
            contentContainerStyle={styles.pondList}
          />
        )}

        {addingPond && (
          <View style={styles.addPondContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter pond name"
              value={pondName}
              onChangeText={setPondName}
              autoFocus={true}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={addPond}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setAddingPond(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!addingPond && (
          <TouchableOpacity style={styles.addPondButton} onPress={() => setAddingPond(true)}>
            <Text style={styles.buttonText}>Add Pond</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  pondList: {
    paddingBottom: 80, // Add some padding at the bottom to avoid overlap with the button
  },
  pondItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pondName: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '600',
  },
  addPondContainer: {
    marginVertical: 0,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    height: 40,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  addButton: {
    backgroundColor: '#43a047',
  },
  cancelButton: {
    backgroundColor: '#e53935',
  },
  addPondButton: {
    backgroundColor: '#43a047',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
  noPondsText: {
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Ponds;
