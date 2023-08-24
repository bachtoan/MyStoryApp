import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../source/HomeScreen';
import ListStoryScreen from '../source/ListStoryScreen';
import CarGameScreen from '../source/CarGameScreen';

const StackScreen = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        
      />

      <Stack.Screen
        name="List"
        component={ListStoryScreen}
      />

      <Stack.Screen
        name="CarGame"
        component={CarGameScreen}
        

        />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackScreen

const styles = StyleSheet.create({})