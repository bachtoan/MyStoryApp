import {
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getData } from '../async_storage/MyStorage';

export default function SplashScreen() {
  const navigation = new useNavigation();

  useEffect(() => {
    setTimeout(() => {
      
      getData('user').then((user) => {
        if (user) {
          navigation.replace("Home");

        } else {
          navigation.replace("Login");
        }
    });
    }, 3000);

   
  }, [navigation]);

  return (
    <ImageBackground 
      style = {{width: '100%', height: '100%'}}
      source={require('../image/potrait.jpg')}
    >
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../image/[removal.ai]_monkey.png")}
          ></Image>
        </View>
        <ActivityIndicator size="large" color="red" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoView: {},
  logo: {
    width: 400,
    height: 400,
  },
});
