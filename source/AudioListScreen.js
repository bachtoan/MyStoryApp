import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from '../my_component/Toolbar';
import { API_URL } from '../my_component/Host';
import { Audio } from 'expo-av';
import { DATA_REQUIRE } from '../assets/SoundSoure';

export default function AudioListScreen() {
    let [data, setData] = useState([]);
    const [sound,setSound] = useState();
    const [isSoundPlay, setIsSoundPlaying] = useState(true);

    useEffect(() => {
        let soundUnloadHandler;
    
        if (sound) {
        soundUnloadHandler = () => {
            sound.unloadAsync();
        };
    
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
            setIsSoundPlaying(false);
            }
        });
        }
    
        return () => {
        if (soundUnloadHandler) {
            soundUnloadHandler();
        }
        };
    }, [sound]);
    async function playSound(DATA) {
        console.log(DATA);
        try {
            const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE[DATA]);
            setSound(sound);
            setIsSoundPlaying(true);
            await sound.playAsync();  
            return true;
        } catch (error) {
            return false;
        } 
    }
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

    
    function Item({id ,soundUrl, name}) {
        return (
            <View style={{borderWidth:1, borderRadius:10, marginBottom:10, padding:10}} >
                   <Text style={{fontSize:20, fontWeight:'700'}}>{name}</Text>
                    <Text>{soundUrl}</Text>
                
            </View>
             
             
        );
      }

  return (
    <View>
        <View><Toolbar title="Audio List"></Toolbar></View>
        <View>
          <FlatList style={{paddingStart:10, marginBottom:100, paddingRight:10}}
            data={data}
            
            renderItem={({ item }) =>
            (   
                <TouchableOpacity onPress={()=>{playSound(item.soundName)}}>
                    <Item id={item.id} soundUrl={item.soundUrl}  name={item.soundName}></Item>
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

const styles = StyleSheet.create({})