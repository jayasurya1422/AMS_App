import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ponds from './Ponds';
import PondDetail from './PondDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ponds">
        <Stack.Screen name="Ponds" component={Ponds} />
        <Stack.Screen name="PondDetail" component={PondDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
