import { BackHandler, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ConfettiCannon from 'react-native-confetti-cannon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from "expo-splash-screen";




export default function CongratulationScreen() {
  const{width} = Dimensions.get('window')
  const navigation = new useNavigation();
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
  const onBackPressed = (e) => {
    navigation.goBack();
  };
  return (
    <View style={{flex:1}} onLayout={onLayoutRootView}>
       <TouchableOpacity style={styles.buttonmenu} onPress={onBackPressed} >
          <FontAwesomeIcon icon={faAngleLeft} size={30} color="#7091F5" />
        </TouchableOpacity>
      <ConfettiCannon count={100} origin={{x: -10, y:0}} fadeOut fallSpeed={5000} />
      <ConfettiCannon count={100} origin={{x: width +10, y:0}} fadeOut fallSpeed={5000}/>
      <View style={styles.viewText}>
      <Animatable.View 
          animation="rubberBand"
          duration={2000}
          iterationCount="infinite"
          >
          <Text style={styles.text}>
          Congratulation!
        </Text>
        </Animatable.View>
        
      </View>
      <View style={styles.viewImage}>
        <View style={styles.row}>
        <Animatable.View 
          animation="rubberBand"
          duration={2000}
          >
          <Image style={styles.imageTrumpet} source={require('../image/festivaltrumpet.png')}></Image>
        </Animatable.View>
            
        <Animatable.View 
          animation="rubberBand"
          duration={2000}
          >
          <Image style={[styles.imageTrumpet,{ transform: [{ scaleX: -1 }] }]}source={require('../image/festivaltrumpet.png')}/>

        </Animatable.View>
        </View>
        
      </View>
     
     
   
       
    </View>
    

  )
}

const styles = StyleSheet.create({
  buttonmenu:{
    marginTop:30,
    marginLeft:20,
  },

  viewImage:{
    flex:1,
    justifyContent:'flex-end',
  },

  imageTrumpet:{
    width:150,
    height:150
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  viewText:{
    flex:1,
    alignItems:'center',
  },
  text:{
    fontSize:55,
    color:'red',
    justifyContent:"center",
    fontFamily: "Pacifico-Regular",
  }
})