import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfettiCannon from 'react-native-confetti-cannon';
import Video from 'react-native-video';



export default function CongratulationScreen() {
  const{width} = Dimensions.get('window')
  return (
    <View style={{flex:1}}>
      <ConfettiCannon count={100} origin={{x: -10, y:0}} fadeOut fallSpeed={5000}/>
      <ConfettiCannon count={100} origin={{x: width +10, y:0}} fadeOut fallSpeed={5000}/>

   
       
    </View>
    

  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})