import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';
import SoundSelectScreen from './screens/SoundSelectScreen';
import PurchaseScreen from './screens/PurchaseScreen';

// create a stack navigator instance
const Stack = createStackNavigator();

// define the main App component with navigation and Redux provider
export default function App() {
  return (
    // wrap the app with the Redux provider to access the store
    <Provider store={store}>
      {/* set up the navigation container */}
      <NavigationContainer>
        {/* define the stack navigator and its screens */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Select Animal" component={SoundSelectScreen} />
          <Stack.Screen name="Purchase" component={PurchaseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}