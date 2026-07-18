import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
const Stack = createNativeStackNavigator();

//****** IMPORTANT POINTS ******
// [../] move from one Folder [../../] move from one Folder then the Following folder.
// [./] means both the file are under the same folder
// createNativeStackNavigator() Func creates a stack navigator.
// <NavigationContainer> is a main wrapper
// Stack Navigator open the screens on top of each other.
// Back btn remove the top screen 

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen  name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen  name="Home" component={HomeScreen}/>
        <Stack.Screen  name="RecipeDetail" component={RecipeDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;