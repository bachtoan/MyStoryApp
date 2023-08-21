import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { GluestackUIProvider, config,  Button, ButtonText } from '@gluestack-ui/themed'




const ListStoryScreen = () => {

  let [data, setData] = useState([]);

  

  React.useEffect(() => {
    getStorys();

  }, [])

  const getStorys = async () => {
    await fetch('https://b8f4-222-252-17-100.ngrok-free.app/api/story')
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
      <View style={{
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 0,
        marginVertical: 3,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 2
      }}>


        <View style={{
          flex: 3,
          alignItems: 'center',

          padding: 0,
          marginVertical: 3,
          marginHorizontal: 5,
          flexDirection: 'row',
          borderRadius: 2
        }}>
          <View style={{
            margin: 5,
            marginLeft: 10
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3
            }}>
              <Text style={{
                fontSize: 12,
                color: 'black',
                marginRight: 10
              }}>
                Story:  </Text>
              <Text style={{
                fontSize: 20,
                color: 'black',

              }}>
                {name}</Text>
            </View>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <Text style={{
                fontSize: 12,
                color: 'black',
                marginRight: 10
              }}>
                Author:  </Text>
              <Text style={{
                fontSize: 20,
                color: 'red',
              }}>
                {author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }


  return (
    <View>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Danh sách truyện</Text>
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
        vetical
      />

    </View>
  )
}

export default ListStoryScreen

const styles = StyleSheet.create({})