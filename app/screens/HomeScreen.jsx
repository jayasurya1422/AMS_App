// app/screens/HomeScreen.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Ponds from './Ponds';
import Notifications from './Notifications';
import Account from './Account';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={28} color="black" />,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tab.Screen
        name="Ponds"
        component={Ponds}
        options={{
          tabBarIcon: () => <Ionicons name="water" size={28} color="black" />,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: () => <Ionicons name="notifications" size={28} color="black" />,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={28} color="black" />,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
