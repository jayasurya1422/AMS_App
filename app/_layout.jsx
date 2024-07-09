// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="screens/SignUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="screens/HomeScreen" options={{ title: 'Home' }} />
      
    </Stack>
  );
};

export default Layout;
