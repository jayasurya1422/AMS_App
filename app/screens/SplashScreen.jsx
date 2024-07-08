// app/screens/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('index'); // Navigate to HomeScreen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AMS</Text>
      <ActivityIndicator size="large" color="#3498db" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  indicator: {
    marginTop: 20,
  },
});
export default SplashScreen;
