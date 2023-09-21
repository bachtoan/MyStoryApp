import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Toolbar from '../my_component/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from 'react-native-animatable';
import { API_URL } from '../my_component/Host';

export default function PreviewStoryScreen({ route, navigation }) {
  const imageRef = useRef(null);
  const { id, name, author, illustration } = route.params;
  const [data, setData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
    getDetailStory(id)
  }, []);

  function PlayStoryHandler() {
 
    navigation.navigate("DetailStory", { id: data.id, data: data })
   
  }
  function HandlerWhenLoading(){
    ToastAndroid.show('Truyện chưa tải xong, vui lòng đợi trong giây lát', ToastAndroid.SHORT);
  }
  

  return (
    <ImageBackground style={styles.container} source={require('../image/landscape.jpg')}>
      <View>
        <Toolbar></Toolbar>
      </View>
      <View style={styles.viewParent}>
        <View style={styles.viewOfImage}>
          <Animatable.View
            ref={imageRef}
            animation="slideInLeft"
            duration={1500}
            style={{ flex: 1 }}
          >
            <Image
              style={styles.itemimage}
              source={{
                uri: 'https://source.unsplash.com/random',
              }}
            />
          </Animatable.View>
        </View>

        <View style={styles.viewOfTitle}>
          <Animatable.View
            ref={imageRef}
            animation="slideInRight"
            duration={1500}
          >
            <Text style={styles.styleOfText}>{name}</Text>
            <View style={styles.viewOfAuthor_Illu}>
              <View style={styles.viewOfAuthor}>
                <Text style={styles.author_illu}>Tác giả</Text>
                <Text style={styles.dataAuthor}>{author}</Text>
              </View>
              <View style={styles.viewOfIllu}>
                <Text style={styles.author_illu}>Minh hoạ</Text>
                <Text style={styles.dataAuthor} numberOfLines={1}>{illustration}</Text>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View
            ref={imageRef}
            animation="slideInUp"
            duration={1500}
          >
            <View style={styles.viewOfButton}>
              <View>
                {isDataLoaded ? (
                  <TouchableOpacity style={styles.buttonPlay}
                    onPress={PlayStoryHandler}
                  >
                    <FontAwesomeIcon icon={faPlay} size={40} color='white' />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.buttonPlay}
                    onPress={HandlerWhenLoading}
                  >
                    <ActivityIndicator size="large" color="blue" />                
                    </TouchableOpacity>
                )}
              </View>
            </View>
          </Animatable.View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewParent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },

  viewOfImage: {
    flex: 0.7,
  },

  itemimage: {
    width: 170,
    height: 260,
    marginLeft: 110,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
  },

  viewOfTitle: {
    flex: 1,
  },
  styleOfText: {
    fontSize: 30,
    marginLeft: 30,
    color: 'blue'
  },
  viewOfAuthor_Illu: {
    flexDirection: 'row',

  },
  viewOfButton: {
    marginTop: 20
  },

  viewOfAuthor: {
    marginLeft: 30,
    marginTop: 70,
    width: 230,
  },

  viewOfIllu: {
    marginTop: 70,
  },

  author_illu: {
    color: "red"
  },

  dataAuthor: {
    fontSize: 20,
    maxWidth: 200,
    color: 'blue'
  },

  buttonPlay: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    width: 80,
    height: 80,
    backgroundColor: 'lightblue',
    borderRadius: 50
  }

})