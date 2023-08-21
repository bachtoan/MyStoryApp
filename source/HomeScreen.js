import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'





const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to List profile"
      onPress={() =>
        navigation.navigate('List', {name: 'ListStory'})
      }
    />
  )
}

export default HomeScreen

const styles = StyleSheet.create({})