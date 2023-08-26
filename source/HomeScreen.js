import { StyleSheet, Text, View, Button, Touchable, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
import { text } from '@fortawesome/fontawesome-svg-core';
import { API_URL } from './Host';

const HomeScreen = ({navigation}) => {

  let [data, setData] = useState([]);

    React.useEffect(() => {
      getStorys();
    }, [])
    
  
    const getStorys = async () => {
      await fetch(API_URL+"story")
        .then((res) => res.json())
        .then((res) => {
          setData(res.story); 
          // console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })
    }
    

    function Item({_id ,name}) {
      return (
        
        <View style= {styles.itemContainer}>
            <View style={styles.imageView}> 
              <Image style={styles.itemimage} source={{
                uri: 'https://source.unsplash.com/random',
               }}/>
            </View>
            <View style={styles.textView}>
              <Text style={styles.itemtext} numberOfLines={2}>{name}</Text>
            </View>
          </View>  
        
        
      );
    }

  return (
    <View style={styles.container}>

        <View style={{zIndex:10}}>
          <Toolbar  title="Home" filter={true}/>
        </View>
        
        <View>
          <FlatList style={{paddingStart:10, marginBottom:100}}
            data={data}
            numColumns={5}
            renderItem={({ item }) =>
            (
              <TouchableOpacity
              onPress={() => {
                navigation.navigate("DetailStory", {id: item.id, name: item.name})
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
    marginBottom:20,
    paddingRight:7,
    borderTopRightRadius:15,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:15,
    backgroundColor: 'white', // Màu nền
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 4, // Bán kính của bóng
    elevation: 5, // Độ cao của bóng
  },
  imageView: {
    paddingRight:7,
    borderRightWidth:0.7,
    borderBottomWidth:0.7,
    borderTopLeftRadius:5,
    borderTopRightRadius:15,
    borderColor:"lightgrey",
    borderBottomRightRadius:15,
    
  },
  itemimage: {
    width:130,
    height:150,
    borderTopLeftRadius:5,

    borderTopRightRadius:15,
    borderBottomRightRadius:15
  },
  textView: {
    width:100,
    
    },
  itemtext:{
    color:"#7091F5",
    
    fontSize:15,
  },
});
