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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ponds') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component with the appropriate name, size, and color
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Set the active icon color to blue
        tabBarInactiveTintColor: 'gray', // Set the inactive icon color to gray
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Ponds"
        component={Ponds}
        options={{ tabBarLabel: 'Ponds' }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ tabBarLabel: 'Notifications' }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ tabBarLabel: 'Account' }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
