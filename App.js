import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Layout from './app/_layout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

        <Stack.Screen
          name="Root"
          component={Layout}
          options={{ headerShown: false }}
        />
    </NavigationContainer>
  );
};

export default App;
