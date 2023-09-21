import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
 

export default function HandlerAnimation({ children, style, animation }) {
  //animation = slideIn+Left/Right/Down/Up
  return (
    <Animatable.View 
    animation={animation}
    duration={1000}
    style={{ ...style }}>
        {children}
    </Animatable.View>
  )
}

const styles = StyleSheet.create({})