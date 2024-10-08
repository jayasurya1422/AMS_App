// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="screens/SignIn" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Energy" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Notifications" options={{ headerShown: false }} />    
      <Stack.Screen name="screens/Account" options={{ headerShown: false }} />    
      <Stack.Screen name="screens/AlarmPage" options={{ headerShown: false }} />    
    </Stack>
  );
};
export default Layout;