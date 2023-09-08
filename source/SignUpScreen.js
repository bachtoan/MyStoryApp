import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
// import { TextInput } from "@react-native-material/core";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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

  function SubmitRegigter(){
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(rePassword);

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
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Email"
            style={{ color: "black" }}
            inputStyle="Email"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Password"
            secureTextEntry = {true}
            inputStyle='password'
            style={{ color: "black" }}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.viewof_text_input}>
          <TextInput
            placeholder="Re-Password"
            secureTextEntry = {true}
            style={{ color: "black" }}
            onChangeText={setRePassword}
          />
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={SubmitRegigter}>
          <Text style={{ color: "white", fontSize: 20 }}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.viewof_register}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Login')
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
});
