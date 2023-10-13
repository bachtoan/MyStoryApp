import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { IMAGE_REQUIRE } from '../assets/ImageSource';
import { Audio } from 'expo-av';
import { DATA_REQUIRE } from '../assets/SoundSoure';
import { useEffect } from 'react';

export default function IconHandler({ syncIcon, word, image, soundUrl }) {
  const [onTouch, setonTouch] = useState(true);
  const [sound,setSound] = useState();
  const [isSoundPlay, setIsSoundPlaying] = useState(false);


  const animIcon = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.3,
    },
    1: {
      scale: 1,
    },
  };
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
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE[soundUrl]);
      setSound(sound);
      setIsSoundPlaying(true);
      await sound.playAsync();
      return true;
    } catch (error) {
      console.error('Lỗi khi chạy âm thanh:', error);
      return false;
    }
  }

  function touchHandler() {
    setonTouch(!onTouch);
    playSound();
  }
  return (
    <View style={styles.container}>
      

      <Pressable onPress={touchHandler}  >
        <Animatable.View
          animation={syncIcon ? animIcon : null}
        >
          <Animatable.Image
            style={styles.icon} source={IMAGE_REQUIRE[image]}
            resizeMode='center'
            animation={!onTouch ? {
              0: {
                scale: 1,
                translateY: 0,
              },
              0.5: {
                scale: 0.7,
                translateY: -30,
              },
              1: {
                scale: 0.7,
                translateY: -30,
              },
            } : {
              0: {
                scale: 0.7,
                translateY: -30,
              },
              0.5: {
                scale: 1,
                translateY: 0,
              },
              1: {
                scale: 1,
                translateY: 0,
              },
            }}

          >
          </Animatable.Image>

        </Animatable.View>
      </Pressable>
      <View style={styles.textView}>

        <Animatable.Text
          style={styles.text}
          numberOfLines={1}
          animation={onTouch ? {
            0: {
              opacity: 1,
            },
            0.5: {
              opacity: 0,
            },
            1: {
              opacity: 0,
            },
          } : {
            0: {
              opacity: 0,
            },
            0.5: {
              opacity: 1,
            },
            1: {
              opacity: 1,
            },
          }}
        >
          {word}
        </Animatable.Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 25,
    width: 300,
    textAlign: 'center'
  },
  textView: {
    top: 40,
    position: 'absolute',
  }
})