// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="screens/SignIn" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="screens/HomeScreen" options={{ title: 'Home' }} />
      <Stack.Screen name="screens/Ponds" options={{ title: 'Ponds' }} />
      <Stack.Screen name="screens/PondDetail" options={{ title: 'Pond Detail' }} />
    </Stack>
  );
};

export default Layout;
