import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../source/HomeScreen';
import ListStoryScreen from '../source/ListStoryScreen';

const StackScreen = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome'}}
      />

      <Stack.Screen
        name="List"
        component={ListStoryScreen}
        options={{title: 'List'}}
      />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackScreen

const styles = StyleSheet.create({})