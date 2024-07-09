import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ponds from './Ponds';
import PondDetail from './PondDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Ponds">
        <Stack.Screen name="Ponds" component={Ponds} />
        <Stack.Screen name="PondDetail" component={PondDetail} />
      </Stack.Navigator>
=======
      <StatusBar style="auto" />

        <Stack.Screen
          name="Root"
          component={Layout}
          options={{ headerShown: false }}
        />
>>>>>>> 6fdba7485b540165e1ae24cc5ac95f85b488145e
    </NavigationContainer>
  );
};

export default App;
