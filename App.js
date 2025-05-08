import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import store from './redux/store';

// import screen components for the app's navigation
import HomeScreen from './screens/HomeScreen';
import SoundSelectScreen from './screens/SoundSelectScreen';
import PurchaseScreen from './screens/PurchaseScreen';

// create a bottom tab navigator instance
const Tab = createBottomTabNavigator();

// define the main App component
// wraps the app with the Redux Provider and sets up the bottom tab navigation
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          // configure screen options for the tab navigator
          screenOptions={({ route }) => ({
            // header styles for each screen
            headerStyle: {
              backgroundColor: '#101820',
              borderBottomWidth: 2,
              borderBottomColor: '#4DD0E1',
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: '#4DD0E1',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            },
            // tab bar styles and icon configuration
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#4DD0E1',
            tabBarInactiveTintColor: '#B0BEC5',
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Select Sound') iconName = 'musical-notes';
              else if (route.name === 'Purchase') iconName = 'cart';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          {/* define the screens for the bottom tab navigator */}
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Select Sound" component={SoundSelectScreen} />
          <Tab.Screen name="Purchase" component={PurchaseScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#101820',
    borderTopWidth: 0,
    elevation: 5,
    height: 70,
    paddingBottom: 20,
  },
});