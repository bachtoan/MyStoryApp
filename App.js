import { StyleSheet, Text, View, Platform, Linking} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import StackScreen from './stacks_screen/StackScreen';

import { APIProvider} from './context/ContextAPI';



export default function App() {
  

  return (
    <APIProvider>
      <StackScreen></StackScreen> 
    </APIProvider>
  );
}
