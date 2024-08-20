// app/screens/HomeScreen.jsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './Home';
import Ponds from './Ponds';
import Notifications from './Notifications';
import Account from './Account';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const animation = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: focused ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -5],
  });

  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={onPress}
    >
      <Animated.View style={[styles.customButton, { transform: [{ translateY }] }]}>
        <View style={styles.iconContainer}>
          {focused ? (
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.gradientBackground}
            >
              {children}
            </LinearGradient>
          ) : (
            <View style={styles.iconBackground}>{children}</View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const tabOffset = useRef(new Animated.Value(0)).current;

  const onTabPress = (index) => {
    Animated.spring(tabOffset, {
      toValue: index * (width / 4),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            height: 70,
          },
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        })}
        tabBar={(props) => (
          <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white' }}>
            <Animated.View
              style={[styles.indicator, { transform: [{ translateX: tabOffset }] }]}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {props.state.routes.map((route, index) => (
                <CustomTabBarButton
                  key={route.key}
                  onPress={() => {
                    props.navigation.navigate(route.name);
                    onTabPress(index);
                  }}
                  accessibilityState={props.state.index === index ? { selected: true } : {}}
                >
                  {props.descriptors[route.key].options.tabBarIcon({
                    focused: props.state.index === index,
                    color: props.state.index === index ? 'white' : 'gray',
                    size: 25, // Adjusted size
                  })}
                </CustomTabBarButton>
              ))}
            </View>
          </View>
        )}
      >
        <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: '' }} />
        <Tab.Screen name="Ponds" component={Ponds} options={{ tabBarLabel: 'Ponds' }} />
        <Tab.Screen name="Notifications" component={Notifications} options={{ tabBarLabel: 'Notifications' }} />
        <Tab.Screen name="Account" component={Account} options={{ tabBarLabel: 'Account' }} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  iconBackground: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  indicator: {
    position: 'absolute',
    width: width / 4,
    height: 4,
    backgroundColor: 'blue',
    bottom: 0,
  },
});

export default HomeScreen;
