import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './tabs/HomeScreen';
import GeneratorScreen from './tabs/GeneratorScreen';
import FavoritesScreen from './tabs/FavScreen';
import { FavProvider } from './context/FavContext';

type RootStackParamList = {
  Home: undefined;
  Generator: { category: string };
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Generator" component={GeneratorScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavProvider>
  );
}
