import {Image, ImageBackground, KeyboardAvoidingView, StyleSheet,TextInput, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../my_component/Host';
import {getData, saveData} from '../async_storage/MyStorage';


export default function  LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validataEmail, setValidataEmail] = useState('');
  const [validataPass, setValidataPass] = useState('');



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

  const Login = async (email, password) => {

    await fetch(API_URL+"login", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password,         
        })
    })
        .then((res) => {
            if (res.status === 201) {
              res.json().then(data => {
                
                console.log(data);
    
                if (data && data.user && data.access_token) {
                    const { user, access_token } = data;
                    saveData('user', user);
                    saveData('access_token', access_token);
                    navigation.replace('Home')
                    ToastAndroid.show('Đăng nhập thành công.', ToastAndroid.SHORT);
                } else {
                    console.log('Dữ liệu phản hồi không hợp lệ.');
                    ToastAndroid.show('Dữ liệu phản hồi không hợp lệ.', ToastAndroid.SHORT);
                }
            });
            } else if(res.status === 404){
              ToastAndroid.show('Tài khoản không tồn tại', ToastAndroid.SHORT);
              setValidataEmail('Tài khoản không tồn tại')
            } else if(res.status === 403){
              ToastAndroid.show('Mật khẩu sai', ToastAndroid.SHORT);
              setValidataPass('Sai mật khẩu')
            }
        })
        .catch(e => {
            console.log(e);
            ToastAndroid.show('Đăng nhập thất bại.', ToastAndroid.SHORT);
        })
}


  getData('user').then((user) => {
    if (user) {
      console.log("Login: "+  user);
    } else {
      console.log("Login: Dữ liệu trống");
    }
  },[]);
 
 


function onLogin(){
  setValidataEmail('');
  setValidataPass('');
  console.log(email, password);
  Login(email, password);
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
          <TextInput
            placeholder="Username"
            style={{ color: "black" }}
            onChangeText={setEmail}
          />
          
        </View>
        <Text style={{marginHorizontal:16}}>{validataEmail}</Text>
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Password"
            style={{ color: "black" }}
            onChangeText={setPassword}
          />
          
        </View>
        <Text style={{marginHorizontal:16}}>{validataPass}</Text>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={onLogin}
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
    marginHorizontal: 16,
    justifyContent: "center",
    paddingHorizontal:20,
    borderWidth:1,
    height:50,
    borderRadius:10,
    marginTop: 10,
  }
})