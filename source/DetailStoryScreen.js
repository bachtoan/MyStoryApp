import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
import { API_URL } from './Host';

export default function DetailStoryScreen({route}) {
    const { id, name } = route.params;
    const [data, setdata] = useState({})
    
    useEffect(() => {
        DetailStory(id);
    }, [])
    

    const DetailStory = async (id) => {
        try {
          const response = await fetch(API_URL+"detailstory", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id_story": id,
            })
          });
          const json = await response.json();
          if (response.status === 201) {
            setdata(json.data);
            console.log(data);
            ToastAndroid.show('Đã tìm thấy', ToastAndroid.SHORT);
          }
        } catch (error) {
          console.log(error);
        }
      };

    
    
  return (
    <View>
        <View>
            <Toolbar title={name}></Toolbar>
        </View>
        <View>
            <Text>{data.pages}</Text>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({})