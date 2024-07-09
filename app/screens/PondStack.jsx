import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ponds from './Ponds';
import PondDetail from './PondDetail'; // Import PondDetail screen component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ponds" component={Ponds} />
        <Stack.Screen name="PondDetail" component={PondDetail} /> {/* Ensure PondDetail is included */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
