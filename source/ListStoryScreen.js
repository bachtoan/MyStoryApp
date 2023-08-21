import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { GluestackUIProvider, config,  Button, ButtonText } from '@gluestack-ui/themed'

const ListStoryScreen = () => {
  return (
    <GluestackUIProvider config={config.theme}>
    <Button>
      <ButtonText>Hello World</ButtonText>
    </Button>
  </GluestackUIProvider>
  )
}

export default ListStoryScreen

const styles = StyleSheet.create({})