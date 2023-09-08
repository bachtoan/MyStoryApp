import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, { useCallback } from 'react'
import { TextInput } from '@react-native-material/core'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';


export default function  LoginScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Pacifico-Regular': require('../assets/font/Pacifico-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground 
      style = {{ flex:1}}
      source={require('../image/potrait.jpg')}
      onLayout = {onLayoutRootView}
    >
    
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../image/[removal.ai]_monkey.png")}
          ></Image>
        </View>

        <View style= {styles.body}>
          <Text style={styles.dangnhap} >Đăng nhập</Text>  
        </View>
        <View style={styles.viewof_text_input}>
          <TextInput variant="outlined" label="Tài khoản hoặc Email" style={{color:'black'}} />
          <Text>Tài khoản không tồn tại</Text>
        </View>
        <View style={styles.viewof_text_input}>
          <TextInput variant="outlined" secureTextEntry label="Mật khẩu" style={{color:'black' }}  />
          <Text>Mật khẩu không chính xác</Text>
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
        >
          <Text style={{color:'white', fontSize:20}}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={{alignItems:"center", marginTop:20}}><Text>Hoặc đăng nhập bằng</Text></View>

        <View style={styles.viewof_fb_gg}>
          <TouchableOpacity>
            <Image style={styles.logo_fb_gg} source = {require('../assets/facebook_logo.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={styles.logo_fb_gg} source = {require('../assets/google_logo.png')}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.viewof_register}> 
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('SignUp')
            }}>

            <Text style={{color:'red', textDecorationLine:'underline'}}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
  
    </ImageBackground>
   
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },

  logoView: {
    paddingTop:50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  logo: {
    width: 300,
    height: 180,
  },

  body: {
    alignItems: 'center',
  },

  dangnhap:{
    fontSize:30,
    color: 'red',
    marginBottom:20,
    fontFamily:'Pacifico-Regular'
  },
  btnLogin: {
    marginHorizontal:16,
    marginTop:20,
    backgroundColor:"red",
    borderRadius:16,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
  },
  logo_fb_gg: {
    width:50,
    height:50,
  },
  viewof_fb_gg:{
    marginTop:20,
    flexDirection:'row',
    justifyContent: 'space-evenly',
  },
  viewof_register:{
    alignItems: 'center',
    marginTop:50,
    justifyContent: 'center',
    flexDirection:'row',
  },
  viewof_text_input:{
    marginHorizontal:16,
    marginTop:10,
  }
})