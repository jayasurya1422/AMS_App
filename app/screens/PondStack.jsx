// app/screens/PondStack.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ponds from './Ponds';
import PondDetail from './PondDetail';

const Stack = createStackNavigator();

const PondStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ponds" component={Ponds} options={{ title: 'Ponds' }} />
      <Stack.Screen name="PondDetail" component={PondDetail} options={{ title: 'Pond Detail' }} />
    </Stack.Navigator>
  );
};

export default PondStack;
