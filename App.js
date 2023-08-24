import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './source/HomeScreen';
import ListStoryScreen from './source/ListStoryScreen';
import CarGameScreen from './source/CarGameScreen';

const Stack = createNativeStackNavigator();
function MyStack(){
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen  name="Home" component={HomeScreen} />
      <Stack.Screen options={{ title: "List Story"}} name="List" component={ListStoryScreen} />
      <Stack.Screen options={{ title: "Car Game"}} name="CarGame" component={CarGameScreen} />

    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
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
