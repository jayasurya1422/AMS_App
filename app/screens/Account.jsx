import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UserSettingImage from '../../assets/images/UserSetting.png'; // Adjust the path if needed

const Account = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');

        if (userEmail) {
          const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserDetails(userData);
            const storedProfilePicUri = await AsyncStorage.getItem('profilePicUri');
            if (storedProfilePicUri) {
              setProfilePicUri(storedProfilePicUri);
            }
          } else {
            setError('No user data found');
          }
        } else {
          setError('No user email found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
    navigation.navigate('screens/SignIn');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleChooseProfilePic = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permission to access photos is required');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      
      if (!pickerResult.cancelled) {
        setProfilePicUri(pickerResult.uri);
        await AsyncStorage.setItem('profilePicUri', pickerResult.uri);
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  const renderProfilePic = () => (
    <TouchableOpacity style={styles.profilePicContainer} onPress={handleChooseProfilePic}>
      <Image
        source={UserSettingImage} // Directly use UserSettingImage
        style={styles.profilePic}
      />
      <Text style={styles.profilePicText}>Change Profile Picture</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#e0f7fa', '#80deea']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Account Settings</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Ionicons name="settings-outline" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>

          {showMenu && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleEditProfile}
              >
                <Ionicons name="person-outline" size={24} color="#007bff" />
                <Text style={styles.menuText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
                <Text style={[styles.menuText, { color: '#e74c3c' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.content}>
            {renderProfilePic()}
            {userDetails ? (
              <>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{userDetails.email}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>First Name:</Text>
                  <Text style={styles.detailValue}>{userDetails.firstName}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Last Name:</Text>
                  <Text style={styles.detailValue}>{userDetails.lastName}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{userDetails.location}</Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Mobile Number:</Text>
                  <Text style={styles.detailValue}>{userDetails.mobileNumber}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.contentText}>No user details available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, // Ensure the gradient covers the entire screen
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editIcon: {
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 0,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Push children to opposite ends
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Take up available space
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right', // Align text to the right
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
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#333', // Dark border color
  },
  profilePicIcon: {
    borderWidth: 2,
    borderColor: '#333', // Dark border color
    borderRadius: 50,
    padding: 10,
  },
  profilePicText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default Account;
