import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../source/HomeScreen';
import ListStoryScreen from '../source/ListStoryScreen';
import DetailStoryScreen from '../source/DetailStoryScreen';
import AudioListScreen from '../source/AudioListScreen';
import DemoCanvas from '../my_component/DemoCanvas';
import DemoSkiaCanvas from '../my_component/DemoSkiaCanvas';
import CoverStoryScreen from '../source/CoverStoryScreen';
import SplashScreen from '../source/SplashScreen';
import LoginScreen from '../source/LoginScreen';
import SignUpScreen from '../source/SignUpScreen';
import DemoSkiaCanvasPath from '../my_component/DemoSkiaCanvasPath';
import PreviewStoryScreen from '../source/PreviewStoryScreen';
import DemoLatTrang from '../my_component/DemoLatTrang';
import Page1 from '../demo/Page1';
import SettingScreen from '../source/SettingScreen';
import StoryManager from '../source/StoryManager';


const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Preview" component={PreviewStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="List" component={ListStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Audio" component={AudioListScreen}/>
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="DetailStory" component={DetailStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="CoverStory" component={CoverStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="CanvasSkia" component={DemoSkiaCanvas}/>
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="CanvasSkiaPath" component={DemoSkiaCanvasPath}/>
        <Stack.Screen options={{ headerShown: false, orientation:"landscape"}} name="Canvas" component={DemoCanvas} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape"}} name="Lattrang" component={DemoLatTrang} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape"}} name="Setting" component={SettingScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait"}} name="StoryManager" component={StoryManager} />


        <Stack.Screen options={{ headerShown: false, orientation:"portrait"}} name="page1" component={Page1} />


      </Stack.Navigator>
    </NavigationContainer>
    
 
  )
}

export default StackScreen

const styles = StyleSheet.create({})