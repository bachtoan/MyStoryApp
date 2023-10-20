import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import IconSyncText from '../my_component/IconSyncText';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import { DATA_REQUIRE } from '../assets/SoundSoure';
import DecorImage from '../my_component/DecorImage';
import { IMAGE_REQUIRE } from '../assets/ImageSource';
import Touchable from '../my_component/Touchable';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import PromptSwipe from '../my_component/PromptSwipe';
import { Canvas, useTouchHandler, useValue } from '@shopify/react-native-skia';
import PageCurl from '../my_component/PageCurl';

export default function IconStoryScreen({route}) {
    const [isSoundPlay, setIsSoundPlaying] = useState(false);
    const { width, height } = Dimensions.get("window");
    const {data} = route.params;
    const [sound,setSound] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const navigation = new useNavigation();
    const cx = useValue(0);
    const cy = useValue(0);
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
            const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE[DATA]);
            setSound(sound);
            setIsSoundPlaying(true);
            await sound.playAsync();  
            return true;
        } catch (error) {
            return false;
        } 
    }
    useEffect(() => {
        playSound(data.pages[currentPage].contents[0].sound.soundName)
    }, [data.pages[currentPage].contents[0].sound.soundName, refresh]) 

    const gestureLeft = Gesture.Fling()
                    .direction(Directions.LEFT)
                    .onEnd(()=>{
                        if(currentPage < data.pages.length - 1){
                            setCurrentPage(currentPage => currentPage + 1)
                        }
                        if(currentPage == data.pages.length - 1){
                            navigation.replace("Congratulation")
                        }       
                    });
    const gestureRight = Gesture.Fling()
                    .direction(Directions.RIGHT)
                    .onEnd(()=>{
                        if(currentPage > 0){
                            setCurrentPage(currentPage => currentPage - 1)
                        }                        
                    });
    const gestureDown = Gesture.Fling()
                    .direction(Directions.DOWN)
                    .onEnd(()=>{setRefresh(!refresh)});

    const gesture = Gesture.Simultaneous(gestureLeft,gestureRight,gestureDown);
    const [gestureDir, setGestureDir] = useState(0)
    const touchHandler = useTouchHandler({
        onStart: ({ x, y }) => {
            cx.current = x;
            cy.current = y;
            if (x > width - width / 3) setCurrentPage(1);
            if (x < width / 3) setGestureDir(-1);
        },
        
      }, [gestureDir]);
    return (
        <GestureHandlerRootView style={{ flex: 1,position: "relative"}} >
            <GestureDetector gesture={gesture} >
            <View style={{ flex: 1}}> 
                <Image style = {{width:width,height:height}} source={IMAGE_REQUIRE[data.pages[currentPage].backgroundName]} resizeMode='stretch'>

                </Image>
            
            <View style={styles.decorImageView}>
                <DecorImage 
                    decor={data.pages[currentPage].decorImage}
                    imageWidth = {data.pages[currentPage].imageWidth}
                    imageHeight = {data.pages[currentPage].imageHeight}
                    imageLeft = {data.pages[currentPage].imageLeft}
                >
                            

                </DecorImage>
            </View>
           

            <View style={[styles.syncTextView,{width:width}]}>
                <IconSyncText 
                    syncData={data.pages[currentPage].contents[0].sync_data}
                    duration={data.pages[currentPage].contents[0].duration}
                    refresh = {refresh}
                    >
                </IconSyncText>
            </View>
            {data.pages[currentPage].touchables.length !== 0 &&(
                <View style={[styles.touchableView,{width:width,height:height}]}>
                    <Touchable
                        touchables={data.pages[currentPage].touchables}>
                    </Touchable>
                </View>
            )}
           
            {/* <Canvas style={{flex:1, width:width, height:height, position:'absolute'}} onTouch={touchHandler}>
                <PageCurl dir={gestureDir} x={cx.current} y={cy.current} ></PageCurl>
            </Canvas> */}
            {/* <View style={{position:'absolute'}}>
                <PromptSwipe></PromptSwipe>
            </View> */}
            
        </View>
        </GestureDetector>
        </GestureHandlerRootView>
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
        marginTop: 20,
    },
    touchableView:{
        flex:1,
        position:'absolute'
    }
})