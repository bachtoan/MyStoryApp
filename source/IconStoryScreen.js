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
import { Canvas, Path, Shadow, useTouchHandler, useValue } from '@shopify/react-native-skia';
import PageCurl from '../my_component/PageCurl';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';

export default function IconStoryScreen({route}) {
    const [isSoundPlay, setIsSoundPlaying] = useState(true);
    const { width, height } = Dimensions.get("window");
    const {data} = route.params;
    const [sound,setSound] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [promt, setPromt] = useState(false);
    const navigation = new useNavigation();
    const cx = useValue(0);
    const cy = useValue(0);
    const [animPath, setAnimPath] = useState('');
      const [layer, setLayer] = useState(0);
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
                            setCurrentPage(currentPage => currentPage + 1);
                            setPromt(false);

                        }
                        if(currentPage == data.pages.length - 1){
                            navigation.replace("Congratulation")
                        }       
                    });
    const gestureRight = Gesture.Fling()
                    .direction(Directions.RIGHT)
                    .onEnd(()=>{
                        if(currentPage > 0){
                            setCurrentPage(currentPage => currentPage - 1);
                            setPromt(false);

                        }                        
                    });
    const gestureDown = Gesture.Fling()
                    .direction(Directions.DOWN)
                    .onEnd(()=>{setRefresh(!refresh);setPromt(false);});

    const gesture = Gesture.Simultaneous(gestureLeft,gestureRight,gestureDown);


    useEffect(() => {
        if (!isSoundPlay) {
          const timeoutId = setTimeout(() => {
            setPromt(true);
          }, 6000);
      
          return () => {
            clearTimeout(timeoutId);
          };
        } else {
          setPromt(false);
        }
      }, [isSoundPlay]);
     
      
  
    //   let gestureDir = 0;
    //   const gestureAnim = (dir, absX, absY) => {
    //         if (dir == 1) {
    //           let A = { x: absX, y: absY }
    //           let C = { x: (width - ((width - absX + absY / 4) / 7)), y: 0 }
    //           let B = { x: A.x + (C.x - A.x) / 4, y: height }
    //           let fixCurve1 = { x: A.x + (C.x - A.x) / 2, y: C.y + (A.y - C.y) / 1.5 };
    //           let fixCurve2 = { x: B.x, y: A.y + (B.y - A.y) / 1.25 };
    //           setAnimPath('M ' + A.x + ' ' + A.y + ' Q ' + fixCurve1.x + ' ' + fixCurve1.y + ' ' + C.x + ' ' + C.y + ' L ' + B.x + ' ' + B.y + ' Q ' + fixCurve2.x + ' ' + fixCurve2.y + ' ' + A.x + ' ' + A.y + ' Z');
    //         }
    //     if (dir == -1) {
    //         setAnimPath('M ' + absX + ' ' + absY + ' L ' + (absX * 0.5) + ' ' + height + ' L ' + (absX * 0.3) + ' 0' + ' Z');
    //     }
    //   }
    
    
    //   const touchHandler = useTouchHandler({
    //     onStart: ({ x, y }) => {
    
    //       console.log(x);
    //       setLayer(1)
    //       if (x > width - width / 3) gestureDir = 1; 
    //       if (x < width / 3) gestureDir = -1;
    //     },
    
    //     onActive: ({ x, y }) => {
          
    //       if (gestureDir != 0) { // if use intend to change page , trigger the aim
    //         gestureAnim(gestureDir, Math.round(x), Math.round(y))
    //       }
    //     },
    
    //     onEnd: () => {
    //       setLayer(0)
    //       gestureDir = 0;
    //       setAnimPath('');
    //     }
    
    
    //   })
    
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
           
           {/* <Canvas style={{ position: "absolute", width: "100%", height: "100%", zIndex: layer}} onTouch={touchHandler}>
       

        <Path
          path={animPath}
          color={'#eee4b0'}
        >
          <Shadow
            dx={25}
            dy={15}
            blur={35}
            color="black"
          />
          <Shadow
            inner
            dx={-35}
            dy={0}
            blur={25}
            color="#93b8c4"
          />
        </Path>

      </Canvas> */}
            {promt && (
                <View style={{position:'absolute',top:height/3,width:width, flexDirection:'row' ,justifyContent:'space-between'}}>
                <Animatable.View
                    animation="slideInLeft"
                    duration={3000}
                    iterationCount="infinite"
                    style={{marginLeft:100, alignItems:'center'}}
                >
                    <FontAwesomeIcon icon={faArrowRight} size={50} color='lightblue'/>
                    <Text>Vuốt</Text>

                </Animatable.View>
                <Animatable.View
                    animation="slideInRight"
                    duration={3000}
                    iterationCount="infinite"
                    style={{marginRight:100, alignItems:'center'}}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={50} color='lightblue' />
                    <Text>Vuốt</Text>
                </Animatable.View>
            </View>
            )}
            
            
            
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