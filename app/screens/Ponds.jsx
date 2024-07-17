import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../config/firebase'; // Ensure this path is correct
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Ponds = () => {
  const [ponds, setPonds] = useState([]);
  const [addingPond, setAddingPond] = useState(false);
  const [pondName, setPondName] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User is signed in:', user);
        setUserEmail(user.email);
      } else {
        console.log('No user is signed in');
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPonds = async () => {
      if (userEmail) {
        console.log('Fetching ponds for user:', userEmail);
        try {
          const q = query(collection(db, 'ponds'), where('email', '==', userEmail));
          const pondsCollection = await getDocs(q);
          if (pondsCollection.empty) {
            console.log('No ponds found');
            setPonds([]);
          } else {
            const pondsList = pondsCollection.docs.map(doc => ({
              id: doc.id,
              PondId: doc.data().PondId,
              PondName: doc.data().PondName,
            }));
            setPonds(pondsList);
          }
        } catch (error) {
          console.error('Error fetching ponds: ', error);
        }
      }
    };

    fetchPonds();
  }, [userEmail]);

  const addPond = async () => {
    if (pondName.trim() !== '') {
      try {
        const newPond = {
          PondId: ponds.length + 1,
          PondName: pondName.trim(),
          email: userEmail,
        };
        const pondRef = await addDoc(collection(db, 'ponds'), newPond);
        setPonds([...ponds, { id: pondRef.id, ...newPond }]);
        setPondName('');
        setAddingPond(false);
        navigation.navigate('Notifications', { pondName: newPond.PondName });
      } catch (error) {
        console.error('Error adding pond: ', error);
      }
    }
  };

  const renderPond = ({ item }) => (
    <TouchableOpacity
      style={styles.pondItem}
      onPress={() => navigation.navigate('screens/PondDetail', { pondId: item.PondId, pondName: item.PondName })}
    >
      <Text style={styles.pondName}>{item.PondName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Ponds</Text>

      {ponds.length === 0 ? (
        <Text style={styles.noPondsText}>No ponds added yet</Text>
      ) : (
        <FlatList
          data={ponds}
          keyExtractor={(item) => item.id.toString()}
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
        <TouchableOpacity style={[styles.actionButton, styles.addPondButton]} onPress={() => setAddingPond(true)}>
          <Text style={styles.buttonText}>Add Pond</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f5e9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  pondList: {
    paddingBottom: 20,
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
    marginVertical: 20,
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
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  noPondsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#757575',
  },
});

export default Ponds;
