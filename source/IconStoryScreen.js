import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Image, useFont, useImage, Text as CanvasText } from '@shopify/react-native-skia'
import { IMAGE_REQUIRE } from '../assets/ImageSource';
import IconSyncText from '../my_component/IconSyncText';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import { DATA_REQUIRE } from '../assets/SoundSoure';
import DecorImage from '../my_component/DecorImage';

export default function IconStoryScreen({route}) {
    const [isSoundPlay, setIsSoundPlaying] = useState(false);
    const { width, height } = Dimensions.get("window");
    const {data} = route.params;
    const [sound,setSound] = useState();
    // console.log(data);

  const syncData = [
    {
        "e": 490,
        "s": 0,
        "te": 2,
        "ts": 0,
        "i": 1,
        "img":'iconRoy',
        "audio":'roy',
        "w": "Roy"
    },
    { 
        "e": 780,
        "s": 490,
        "te": 6,
        "ts": 4,
        "i": 0,
        "w": "and"
    },
    {
        "e": 1420, 
        "s": 780,
        "te": 11,
        "ts": 8,
        "i": 1,
        "img":'iconMilo',
        "audio":'milo',
        "w": "Milo"
    },
    {
        "e": 1680,
        "s": 1420,
        "te": 16,
        "ts": 13,
        "i": 0,
        "w": "went"
    },
    {
        "e": 1860,
        "s": 1680,
        "te": 19,
        "ts": 18,
        "i": 0,
        "w": "to"
    },
    {
        "e": 2050,
        "s": 1860,
        "te": 23,
        "ts": 21,
        "i": 0,
        "w": "the"
    },
    {
        "e": 2480,
        "s": 2050,
        "te": 30,
        "ts": 25,
        "i": 0,
        "w": "jungle"
    },
    {
        "e": 2670,
        "s": 2480,
        "te": 33,
        "ts": 32,
        "i": 0,
        "w": "to"
    },
    {
        "e": 3590,
        "s": 2670,
        "te": 42,
        "ts": 35,
        "i": 0,
        "w": "explore."
    },
    {
        "e": 4470,
        "s": 3590,
        "te": 47,
        "ts": 44,
        "i": 1,
        "img":'iconMilo',
        "audio":'milo',
        "w": "Milo"
    },
    {
        "e": 4770,
        "s": 4470,
        "te": 55,
        "ts": 49,
        "i": 0,
        "w": "brought"
    },
    {
        "e": 5030,
        "s": 4770,
        "te": 59,
        "ts": 57,
        "i": 0,
        "w": "his"
    },
    {
        "e": 5800,
        "s": 5030,
        "te": 63,
        "ts": 61,
        "i": 1,
        "img":'iconToybone',
        "audio":'toybone',
        "w": "toy bone"
    },
    {
        "e": 6160,
        "s": 5800,
        "te": 69,
        "ts": 65,
        "i": 0,
        "w": "."
    },
    {
        "e": 6890,
        "s": 6160,
        "te": 73,
        "ts": 71,
        "i": 1,
        "img":'iconRoy',
        "audio":'roy',
        "w": "Roy"
    },
    {
        "e": 7190,
        "s": 6890,
        "te": 81,
        "ts": 75,
        "i": 0,
        "w": "brought"
    },
    {
        "e": 7480,
        "s": 7190,
        "te": 85,
        "ts": 83,
        "i": 0,
        "w": "his"
    },
    {
        "e": 8410,
        "s": 7480,
        "te": 96,
        "ts": 87,
        "i": 1,
        "img":'iconBinocular',
        "audio":'binocular',
        "w": "binoculars"
    },
    {
        "e": 8660,
        "s": 8410,
        "te": 100,
        "ts": 98,
        "i": 0,
        "w": "and"
    },
    {
        "e": 8780,
        "s": 8660, 
        "te": 102,
        "ts": 102,
        "i": 0,
        "w": "a"
    },
    {
        "e": 9990,
        "s": 8780,
        "te": 113,
        "ts": 104,
        "i": 1,
        "img":'iconMagnifyingglass',
        "audio":'magnifyingglass',
        "w": "magnifying glass"
    },
    {
        "e": 10480,
        "s": 9990,
        "te": 120,
        "ts": 115,
        "i": 0,
        "w": "."
    },
    {
        "e": 10980,
        "s": 10480,
        "te": 125,
        "ts": 122,
        "i": 0,
        "w": "They"
    },
    {
        "e": 11140,
        "s": 10980,
        "te": 130,
        "ts": 127,
        "i": 0,
        "w": "were"
    },
    {
        "e": 11650,
        "s": 11140,
        "te": 135,
        "ts": 132,
        "i": 0,
        "w": "very"
    },
    {
        "e": 12960,
        "s": 11650,
        "te": 144,
        "ts": 137,
        "i": 0,
        "w": "excited!"
    }
];
  const duration = 12960;
  useEffect(() => {
    let soundUnloadHandler;
  
    if (sound) {
      soundUnloadHandler = () => {
        sound.unloadAsync();
      };
  
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsSoundPlaying(false);
        }
      });
    }
  
    return () => {
      if (soundUnloadHandler) {
        soundUnloadHandler();
      }
    };
  }, [sound]);
  async function playSound(DATA) {
    try {
      const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE.iconSoundPage1);
      setSound(sound);
      setIsSoundPlaying(true);
      await sound.playAsync();  
      return true;
    } catch (error) {
      console.error('Lỗi khi chạy âm thanh:', error);
      return false;
    } 
  }



  useEffect(() => {
    playSound()
  }, []) 
  

  const image = useImage(
    IMAGE_REQUIRE.iconPage2
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
        <View style={styles.decorImageView}>
            <DecorImage></DecorImage>
        </View>

        <View style={styles.syncTextView}>
            <IconSyncText syncData={syncData} duration={duration}></IconSyncText>
        </View>

    </View>

  )
}

const styles = StyleSheet.create({
    decorImageView:{
        flex:1,
        position:'absolute'
    },
    syncTextView:{
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginTop: 40,
    },
})