import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Toolbar from './Toolbar';
import { API_URL } from './Host';

export default function AudioListScreen() {
    let [data, setData] = useState([]);

    React.useEffect(() => {
        getSounds();
    }, [])

    const getSounds = async () => {
        await fetch(API_URL+"getsounds")
        .then((res) => res.json())
        .then((res) => {
            setData(res.original); 
            // console.log(res.original);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    
    function Item({id ,soundUrl}) {
        return (
            <View >
                <Text>{id}</Text>
                <Text>{soundUrl}</Text>
            </View>  
             
        );
      }

  return (
    <View>
        <View><Toolbar title="Audio List"></Toolbar></View>
        <View>
          <FlatList style={{paddingStart:10, marginBottom:100}}
            data={data}
            
            renderItem={({ item }) =>
            (
                <Item id={item.id} soundUrl={item.soundUrl} ></Item>
            )
            }
            keyExtractor={item => item.id}
            vertical  

          />
           </View>

    </View>
  )
}

const styles = StyleSheet.create({})