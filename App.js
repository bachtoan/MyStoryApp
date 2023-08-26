import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './source/HomeScreen';
import ListStoryScreen from './source/ListStoryScreen';
import CarGameScreen from './source/CarGameScreen';
import StackScreen from './stacks_screen/StackScreen';
import { useEffect } from 'react';


export default function App() {

  return (
    
    <StackScreen></StackScreen> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
