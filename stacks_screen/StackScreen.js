import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../source/HomeScreen';
import ListStoryScreen from '../source/ListStoryScreen';
import DetailStoryScreen from '../source/DetailStoryScreen';
import AudioListScreen from '../source/AudioListScreen';
import CoverStoryScreen from '../source/CoverStoryScreen';
import SplashScreen from '../source/SplashScreen';
import LoginScreen from '../source/LoginScreen';
import SignUpScreen from '../source/SignUpScreen';
import PreviewStoryScreen from '../source/PreviewStoryScreen';
import SettingScreen from '../source/SettingScreen';
import StoryManager from '../source/StoryManager';
import IconStoryScreen from '../source/IconStoryScreen';
import CongratulationScreen from '../source/CongratulationScreen';
import MainScreen from '../source/MainScreen';
import * as Linking from 'expo-linking';
import MapScreen from '../source/MapScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
 
const StackScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const prefix = Linking.createURL('/');
  console.log(prefix);
  const config = {
    screens: {
      Setting: {
        initialRouteName: 'Setting',
        path: 'setting',
      },
      Preview : {
        initialRouteName: 'Preview',
        path: 'preview/:id'
      }

    }
  }

  const linking  = {
    prefixes: [prefix],
    config: config,
    async  getInitialURL() {
      const url = await Linking.getInitialURL();
      console.log("url: ", url);
      return url;
    },
    subscribe(listener) {
      const onReceiveURL = ({ url }) => listener(url);

      // lấy link từ deeplink
      const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const url = response.notification.request.content.data.url;
        listener(url);
      });
      return () => {
        eventListenerSubscription.remove();
        subscription.remove();
      };
    },
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Main" component={MainScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Preview" component={PreviewStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="List" component={ListStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Audio" component={AudioListScreen}/>
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="DetailStory" component={DetailStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="IconStory" component={IconStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="CoverStory" component={CoverStoryScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape" }} name="Congratulation" component={CongratulationScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"landscape"}} name="Setting" component={SettingScreen} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait"}} name="StoryManager" component={StoryManager} />
        <Stack.Screen options={{ headerShown: false, orientation:"portrait" }} name="Map" component={MapScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    
 
  )
}





export default StackScreen

const styles = StyleSheet.create({})