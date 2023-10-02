import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';

export default function IconHandler({syncIcon, name, icon, }) {
    const [onTouch, setonTouch] = useState(true);
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
    
    function touchHandler(){ 
        setonTouch(!onTouch);
        console.log(onTouch); 
    }
    return (
        <TouchableOpacity onPress={touchHandler}  >
            <Animatable.View 
                style={styles.container}
                animation={syncIcon ? animIcon : null}
              >     
                <Animatable.Image
                    style={styles.icon} source={require('../icons/iconStory/iconRoy.png')}
                    resizeMode = 'center'
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
                <View style = {styles.textView}>
                    <Animatable.Text
                        style = {styles.text}
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
                        Roy
                    </Animatable.Text>
                </View>
            </Animatable.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{ 
      alignItems:'center',
      position:'relative',
    },
    icon:{
        width:60,
        height:60,
    },
    text:{
        fontSize:25,
        width:200,
        textAlign:'center'
    },
    textView:{
        top:30,
        position:'absolute'
    }
})