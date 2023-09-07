import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../source/HomeScreen';
import ListStoryScreen from '../source/ListStoryScreen';
import CarGameScreen from '../source/CarGameScreen';
import DetailStoryScreen from '../source/DetailStoryScreen';
import AudioListScreen from '../source/AudioListScreen';
import DemoCanvas from '../source/DemoCanvas';
import DemoSkiaCanvas from '../source/DemoSkiaCanvas';
import CoverStoryScreen from '../source/CoverStoryScreen';

const Stack = createNativeStackNavigator();

const StackScreen = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="List" component={ListStoryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Audio" component={AudioListScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="DetailStory" component={DetailStoryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CoverStory" component={CoverStoryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CanvasSkia" component={DemoSkiaCanvas}/>
        <Stack.Screen options={{ headerShown: false}} name="Canvas" component={DemoCanvas} />
      </Stack.Navigator>
    </NavigationContainer>
    
 
  )
}

export default StackScreen

const styles = StyleSheet.create({})