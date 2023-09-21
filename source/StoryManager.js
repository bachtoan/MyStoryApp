import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { API_URL } from '../my_component/Host';
import { useRef } from 'react';
import Toolbar from '../my_component/Toolbar';
import HandlerAnimation from '../my_component/HandlerAnimation'


export default function StoryManager() {

    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const getStorys = async () => {
        await fetch(API_URL + "story")
            .then((res) => res.json())
            .then((res) => {
                setData(res.story);
                setIsDataLoaded(true);
                // console.log(res.story); 
            })
            .catch((error) => { 
                console.error("Home: "+ error);
            })
    }

    
    useEffect(() => {
        getStorys();
        // console.log(data);
    }, []);


    function Item({ _id, name }) {
        return (
          <View style={styles.itemContainer}>
            <View style={styles.imageView}>
              <Image style={styles.itemimage} source={{
                uri: 'https://source.unsplash.com/random',
              }} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.itemtext} numberOfLines={2}>{name}</Text>
            </View>
          </View>
        );
      }

    return (
        <ImageBackground style={styles.container} source={require('../image/landscape.jpg')}>
        <SafeAreaView>


        <View style={{ zIndex: 10 }}>
          <Toolbar title="Story Manager" />
        </View>
        {isDataLoaded && (
          <View>
            <HandlerAnimation animation="slideInUp">
                <FlatList style={{ paddingStart: 10, marginBottom: 100 }}
                data={data}
                renderItem={({ item }) =>
                (
                <TouchableOpacity
                  onPress={() => {
                  }}
                >
 
                  <Item name={item.name} image={item.image} _id={item.id} ></Item> 
                </TouchableOpacity>
                )
                }
                keyExtractor={item => item.id}
                vertical

            />
            </HandlerAnimation>
            
            
          </View>
        )}

      </SafeAreaView>
    </ImageBackground>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    itemContainer: {
        height: 200,
        marginBottom: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 15,
        backgroundColor: 'white', // Màu nền
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng
        shadowOpacity: 0.3, // Độ mờ của bóng
        shadowRadius: 4, // Bán kính của bóng
        elevation: 5, // Độ cao của bóng
    },
    imageView: {
        paddingRight: 7,
        borderRightWidth: 0.7,
        borderBottomWidth: 0.7,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderColor: "lightgrey",
        borderBottomRightRadius: 15,
  
    },
    itemimage: {
        width: 130,
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    textView: {
         width: 100,
  
    },
    itemtext: {
        color: "#7091F5",
    
        fontSize: 20,
    },
  });
  