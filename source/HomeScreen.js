import { StyleSheet, Text, View, Button, Touchable, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';

const HomeScreen = ({navigation}) => {

  let [data, setData] = useState([]);




    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        navigation.setOptions({
          orientation: 'landscape',
          headerShown: false,
        });
      });
  
      return unsubscribe;
    }, [navigation]);

    

    React.useEffect(() => {
      getStorys();
  
    }, [])
  
    const getStorys = async () => {
      await fetch('https://f307-222-252-17-100.ngrok-free.app/api/story')
        .then((res) => res.json())
        .then((res) => {
          setData(res.story); 
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })
    }


    function Item({ name, author}) {
      return (
        <View style= {styles.itemContainer}>
            <View style={styles.imageView}> 
              <Image style={styles.image} source={{
                uri: 'https://source.unsplash.com/random',
               }}/>
            </View>
            <View style={styles.textView}>
              <Text>{name}</Text>
            </View>
        </View>
      );
    }

  return (
    <View style={styles.container}>

        <View style={{zIndex:10}}>
          <Toolbar  title="Home"/>
        </View>
        
      
        <FlatList
          data={data}
          renderItem={({ item }) =>
          (
            <TouchableOpacity
            >
              <Item name={item.name} author={item.author} image={item.image} ></Item>
            </TouchableOpacity>
          )
          }
          keyExtractor={item => item.id}
          horizontal

        />
    </View>
    
  )
}


export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white', // Màu nền
    
  },
  itemContainer: {
    alignItems: 'center', // Căn giữa dọc
    height:200,
    marginRight:20,
    marginBottom:10,
    paddingRight:10,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    backgroundColor: 'white', // Màu nền
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 4, // Bán kính của bóng
    elevation: 5, // Độ cao của bóng
  },
  imageView: {
    paddingRight:10,
    
    borderWidth:0.5,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    borderColor:"grey"
  },
  image: {
    width:130,
    height:150,
    borderTopRightRadius:15,
    borderBottomRightRadius:15
  },
  textView: {
    width:100
  },
});
