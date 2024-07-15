import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from './NotificationContext';
import Layout from './_layout';

export default function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </NotificationProvider>
  );
}
