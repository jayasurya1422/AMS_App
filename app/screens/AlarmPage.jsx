import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av'; // Make sure to install expo-av for sound
import { useRouter } from 'expo-router';

const AlarmPage = () => {
  const [sound, setSound] = React.useState();
  const router = useRouter();

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/451184-Pedestrian_Crossing_Beep-London-England-Synth-Dry.wav') // Adjust path as needed
      );
      setSound(sound);
      await sound.playAsync();
    };

    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.alarmText}>Power Factor is below 0.8!</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  alarmText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AlarmPage;
