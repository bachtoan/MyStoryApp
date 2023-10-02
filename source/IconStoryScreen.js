import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Image, useFont, useImage, Text as CanvasText } from '@shopify/react-native-skia'
import { IMAGE_REQUIRE } from '../assets/ImageSource';
import IconHandler from '../my_component/IconHandler';
import IconSyncText from '../my_component/IconSyncText';

export default function IconStoryScreen() {
  const { width, height } = Dimensions.get("window");
  const font = useFont(require("../assets/font/Mooli-Regular.ttf"), 20);
  


 
  const image = useImage(
    IMAGE_REQUIRE.page1 
  );  
 
  return ( 
    <View style={{ flex: 1, position: "relative" }}> 
      <Canvas style={{ flex: 1 }}>   
        <Image  
          image={image}
          fit="fill"
          width={width}
          height={height}
        /> 

      </Canvas>

      <View style={{
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center',
        width: width,
        marginTop: 40,
      }}>
        <IconSyncText></IconSyncText>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({})