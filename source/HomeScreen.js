import { StyleSheet, Text, View, Button, Touchable, TouchableOpacity, FlatList, Image, ImageBackground, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
import { text } from '@fortawesome/fontawesome-svg-core';
import { API_URL } from './Host';
import { getData } from '../async_storage/MyStorage';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getStorys = async () => {
    await fetch(API_URL + "story")
      .then((res) => res.json())
      .then((res) => {
        setData(res.story);
        setIsDataLoaded(true);
        console.log(res.story); 
      })
      .catch((error) => { 
        console.error("Home: "+ error);
      })
  }

  useEffect(() => {
    getStorys();
    // getData('user').then((user) => {
    //   if (user) {
    //     console.log('Home: Dữ liệu người dùng:', user);
    //   } else {
    //     console.log('Home: Không tìm thấy dữ liệu người dùng.');
    //   }
    // });
    // getData('access_token').then((access_token) => {
    //   if (access_token) {
    //     console.log('Home: Dữ liệu người dùng:', access_token); 
    //   } else {
    //     console.log('Home: Không tìm thấy dữ liệu người dùng.');
    //   }
    // }); 

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
          <Toolbar title="Home" filter={true} />
        </View>
        {isDataLoaded && (
          <View>
            <FlatList style={{ paddingStart: 10, marginBottom: 100 }}
              data={data}
              numColumns={5}
              renderItem={({ item }) =>
              (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Preview", { id: item.id, name: item.name, author: item.author, illustration: item.illustration })
                  }}
                >
 
                  <Item name={item.name} image={item.image} _id={item.id} ></Item> 
                </TouchableOpacity>
              )
              }
              keyExtractor={item => item.id}
              vertical

            />
          </View>
        )}

      </SafeAreaView>
    </ImageBackground>



  )
}


export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Màu nền

  },
  itemContainer: {
    alignItems: 'center', // Căn giữa dọc
    height: 200,
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 7,
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
