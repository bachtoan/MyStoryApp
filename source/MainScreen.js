import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import SplashScreen from './SplashScreen';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import HandlerAnimation from '../my_component/HandlerAnimation';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../my_component/Host';
import { ContextAPI } from '../context/ContextAPI';

export default function MainScreen() {
    const { width } = Dimensions.get('window');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, setData] = useState();
    const navigation = new useNavigation();
    const {screen,id, name, author, illustration, setScreen, setId, setName, setAuthor, setIllustration} = useContext(ContextAPI);
    // console.log(route.params.id);
  
    // useEffect(() => {
    //   console.log("out: ",screen ,id, name, author, illustration);
    //   if(screen && screen !== "Preview"){
    //     console.log("here");
    //     navigation.navigate(screen);
    //     setScreen('');
    //     setId('');
    //     setAuthor('');
    //     setName('');
    //     setIllustration('');
    //   }
  
    //   if (screen === "Preview"){
    //     console.log("click: ",id, name, author, illustration);
    //     if(id && name && author && illustration){
    //       console.log("chạy vào đây: ", id, name, author, illustration);
    //       navigation.navigate(screen, { id: id, name: name, author: author, illustration: illustration })
    //       setScreen('');
    //       setId('');
    //       setAuthor('');
    //       setName('');
    //       setIllustration('');
  
    //     }
    //   }
    
    // }, [screen, id, author, name, illustration])

    const getDetailStory = async (id) => {
         await fetch(API_URL + "detailstory/" + id)
            .then((res) => res.json())
            .then((res) => {         
            setData(res.data)     
            if(res.data.pages.length > 0){
            setIsDataLoaded(true);
            }
         })
        .catch((error) => {
            console.error(error);
        })
    };
    useEffect(() => {
      getDetailStory(2);
    }, [])

    const [fontsLoaded] = useFonts({
        "Pacifico-Regular": require("../assets/font/Pacifico-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }


    
    

    function Play(){
        console.log("play");
        navigation.navigate("Preview", { id: data.id, name: data.name, author: data.author, illustration:data.illustration })
    }

    return (
        <ImageBackground style={styles.container} source={require('../image/landscape.jpg')}>
            <Text style={styles.title}>Today's Story</Text>
            <View style={styles.layer4}>
                <View style={styles.layer3}>
                    <View style={styles.layer2}>
                        <View style={styles.layer1}>
                            <View style={styles.coverBook}>
                                <Image style={styles.coverImage} source={require('../image/royCoverBook.jpg')} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Image style={{ position: "absolute" }} resizeMode='contain' source={require("../image/curveBG.png")}></Image>

            <View style={styles.row}>
                <HandlerAnimation animation="slideInLeft">
                    <View style={styles.viewButtonStory}>
                        <TouchableOpacity style={styles.buttonStory}>
                        <Text style={{position:'absolute',  fontFamily: 'Pacifico-Regular', color:'white', fontSize:23, left:80}}>Stories For You</Text>
                        <Text style={{position:'absolute',  fontFamily: 'Pacifico-Regular', color:'white', fontSize:20, left:80, top:40}}>Truyện dành cho bé</Text>
                        </TouchableOpacity>
                        <Image style={{position:'absolute', left:0,top:-20, width:100, height:100,}} resizeMode='contain' source={require('../icons/iconStory/iconRoy.png')}></Image>
                    </View>
                
                </HandlerAnimation>
             
                <HandlerAnimation animation="slideInUp">
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                    {isDataLoaded ? (
                        <View style={styles.viewButtonPlay}>
                            <TouchableOpacity style={styles.buttonPlay} onPress={Play}>
                                <FontAwesomeIcon icon={faPlay} size={40} color='white' />
                            </TouchableOpacity>
                        </View>
                    ) : (                     
                        <View style={styles.viewButtonPlay}>
                            <TouchableOpacity style={styles.buttonPlay} onPress={()=>{ ToastAndroid.show('Truyện chưa tải xong, vui lòng đợi trong giây lát', ToastAndroid.SHORT);}}>
                                <ActivityIndicator size="large" color="white" />                
                            </TouchableOpacity>
                        </View>
                    )}
                    </Animatable.View>
                </HandlerAnimation>
                
                <HandlerAnimation animation="slideInRight">
                    <View style={styles.viewButtonStory}>
                        <TouchableOpacity style={styles.buttonStory2} onPress={()=>{navigation.navigate('Home')}}>
                            <Text style={{position:'absolute',  fontFamily: 'Pacifico-Regular', color:'white', fontSize:23, left:30}}>Library</Text>
                            <Text style={{position:'absolute',  fontFamily: 'Pacifico-Regular', color:'white', fontSize:20, left:30, top:40}}>Khám phá tự do</Text>
                        </TouchableOpacity>
                        <Image style={{position:'absolute', right:0,top:-20, width:100, height:100,}} resizeMode='contain' source={require('../icons/iconStory/iconMilo.png')}></Image>
                    </View>
                </HandlerAnimation>
                
                
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        position:'relative'
        // justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Pacifico-Regular'
    },
    coverBook: {
        alignItems: 'center',
        backgroundColor: '#33CCFF',
        padding: 5,
        marginTop: -2,
        marginStart: -10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    coverImage: {
        width: 130,
        height: 200,
        borderRadius: 5,
    },
    layer1: {
        paddingRight: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: -2,
        borderWidth: 0.5,
        borderColor: "lightblue"
    },
    layer2: {
        paddingRight: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: -2,
        borderWidth: 0.5,
        borderColor: "lightblue"
    },
    layer3: {
        paddingRight: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: -2,
        borderWidth: 0.5,
        borderColor: "lightblue"
    },
    layer4: {
        top: 100,
        paddingRight: 2,
        backgroundColor: '#33CCFF',
        borderRadius: 10,
        position: 'absolute',
        borderWidth: 0.5,
        borderColor: "lightblue"
    },
    row:{
        width:'100%',
        marginTop:'18%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    buttonPlay:{
        width:112,
        height:112,
        borderRadius:100,
        backgroundColor:'#66CC00',
        justifyContent:'center',
        alignItems:'center'
    },
    viewButtonPlay:{
        width:120,
        height:120,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    viewButtonStory:{
        width:270,
        height:90,
        backgroundColor:'white',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'     
    },
    buttonStory:{
        width:262,
        height:82,
        backgroundColor:'#99CCFF',
        borderRadius:100,
    },
    buttonStory2:{
        width:262,
        height:82,
        backgroundColor:'#CCCC00',
        borderRadius:100,
    },
})