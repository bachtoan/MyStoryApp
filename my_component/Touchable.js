import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { DATA_REQUIRE } from '../assets/SoundSoure';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

export default function Touchable({ touchables }) {
    const { width, height } = Dimensions.get('window');
    const [textPositionX, setOnTextPositionX] = useState();
    const [textPositionY, setOnTextPositionY] = useState();
    const [timeoutId, setTimeoutId] = useState(null);
    const [onTouch, setOnTouch] = useState(false);
    const [data, setdata] = useState();
    const [sound,setSound] = useState();
    const [rotation, setRotation] = useState(0);
    const [isSoundPlay, setIsSoundPlaying] = useState(false);

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
    async function playSound(soundUrl) {
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

    const TouchHandle = (event, data, posX, posY, soundName) => {
        const x = event.nativeEvent.locationX;
        const y = event.nativeEvent.locationY;
        const randomDegree = Math.random() * 90 - 45;
        setOnTextPositionX(x+parseInt(posX));
        setOnTextPositionY(y+parseInt(posY));
        setdata(data);
        setOnTouch(true);
        playSound(soundName);
        setRotation(randomDegree);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setOnTouch(false);
        }, 2000);
        setTimeoutId(newTimeoutId);
       
    };

  
  
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            {touchables.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        position: 'absolute',
                        left: parseInt(item.pivot.positionX),
                        top: parseInt(item.pivot.positionY),
                        width: parseInt(item.pivot.touchWidth),
                        height: parseInt(item.pivot.touchHeight),
                    }}
                    onPress={(event) => TouchHandle(event, item.data, item.pivot.positionX, item.pivot.positionY, item.sound.soundName )}

                >
                </TouchableOpacity>
            ))}
            {onTouch && (
                <View style={{
                    position: 'absolute',
                    left: textPositionX - 30,
                    top: textPositionY - 50,
                    transform: [{ rotate: `${rotation}deg` }], 

                }}>
                    <Text
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: "white",
                            padding: 5,
                            fontSize: 20,
                            borderRadius: 10,
                        }}
                        numberOfLines={1}
                    >
                        {data}
                    </Text>
                </View>

            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
