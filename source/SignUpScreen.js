import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
// import { TextInput } from "@react-native-material/core";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "./Host";


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [validatePass,setValidatePass] = useState('');
  const [validateUser,setValidateUser] = useState('');
  const [validateEmail,setValidateEmail] = useState('');



  const navigation = useNavigation();

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
  const SignUp = async (username, email, password, re_password) => {

    await fetch(API_URL+"register", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "admin": 1,
            "password": password,
            "re_password": re_password         
        })
    })
        .then((res) => {
            if (res.status === 201) {
              ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
              setUsername('');
              setEmail('');
              setPassword('');
              setRePassword('');
              navigation.goBack();
            }else if (res.status === 500){
              ToastAndroid.show('Tên tài khoản hoặc email đã được đăng ký', ToastAndroid.SHORT);
            }           
        })
        .catch(e => {
            console.log(e);
            ToastAndroid.show('Đăng ký thất bại.', ToastAndroid.SHORT);
        })
}



  function SubmitRegigter(){
    setValidateEmail('');
    setValidatePass('');
    setValidateUser('');
    if(!username) {
        setValidateUser("Không được để trống")
        return
      }
      if(!email) {
        setValidateEmail("Không được để trống Email")
        return
      }

      if(!password || !rePassword) {
        setValidatePass("Không được để trống Password")
        return
      }

      if (password === rePassword) {
        console.log('Mật khẩu trùng khớp:', password);    
        SignUp(username, email, password, rePassword)
        setValidatePass('');

      } else {
        // console.log('Mật khẩu không khớp.');
        setValidatePass("Nhập lại mật khẩu không đúng")
        return
      }
   

  }

  return (
   
    <ImageBackground
      style={{ width: '100%', height: '100%'}}
      source={require("../image/potrait.jpg")}
      onLayout={onLayoutRootView}
    >
    
    <ScrollView>
    <View style={styles.container}>
      
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../image/[removal.ai]_monkey.png")}
          ></Image>
        </View>

        <View style={styles.body}>
          <Text style={styles.dangnhap}>Đăng ký</Text>
        </View>
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Username"
            style={{ color: "black" }}
            onChangeText={setUsername}
          />
        </View>
        <Text style={styles.text_message}>{validateUser}</Text>
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Email"
            style={{ color: "black" }}
            inputStyle="Email"
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.text_message}>{validateEmail}</Text>

        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Password"
            secureTextEntry = {true}
            inputStyle='password'
            style={{ color: "black" }}
            onChangeText={setPassword}
          />
        </View>
        <Text style={styles.text_message}>{validatePass}</Text>

        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Re-Password"
            secureTextEntry = {true}
            style={{ color: "black" }}
            onChangeText={setRePassword}
          />
        </View>
        <Text style={styles.text_message}>{validatePass}</Text>

        <TouchableOpacity style={styles.btnLogin} onPress={SubmitRegigter}>
          <Text style={{ color: "white", fontSize: 20 }}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.viewof_register}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={()=>{
                navigation.goBack();
            }}>
            <Text style={{ color: "red", textDecorationLine: "underline" }}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
       
      </View>
      </ScrollView>
   
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  logoView: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 300,
    height: 180,
  },

  body: {
    alignItems: "center",
  },

  dangnhap: {
    fontSize: 30,
    color: "red",
    marginBottom: 20,
    fontFamily: "Pacifico-Regular",
  },
  btnLogin: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "red",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  logo_fb_gg: {
    width: 50,
    height: 50,
  },
  viewof_fb_gg: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  viewof_register: {
    alignItems: "center",
    marginTop: 50,
    marginBottom:50,
    justifyContent: "center",
    flexDirection: "row",
  },
  viewof_text_input: {
    marginHorizontal: 16,
    justifyContent: "center",
    paddingHorizontal:20,
    borderWidth:1,
    height:50,
    borderRadius:10,
    marginTop: 10,
  },

  text_message: {
    paddingHorizontal:20,
  }
});
