import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react';
import * as Animatable from 'react-native-animatable';
import IconHandler from './IconHandler';


export default function IconSyncText({syncData, duration, refresh}) {
 
  const [coloredWords, setColoredWords] = useState();
  const [textElements, setTextElements] = useState([]);

  
  
  useEffect(() => {
    const timeoutIds = [];
    if (syncData.length > 5) {
      const syncDataArray = JSON.parse(syncData);
  
      syncDataArray.forEach((wordObj, index) => {
        const { w: word, s: startTime, e: endTime, i: icon } = wordObj;
  
        const timeoutId = setTimeout(() => {
          setColoredWords(index);
        }, startTime);
  
        timeoutIds.push(timeoutId);
  
        const endTimeoutId = setTimeout(() => {
          setColoredWords(-1);
        }, duration);
  
        timeoutIds.push(endTimeoutId);
      });
    }
      return () => {
      timeoutIds.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, [refresh, syncData]);
  
  
   
 
  useEffect(() => {
    if (syncData.length > 5) {
      const syncDataArray = JSON.parse(syncData);
      const updatedTextElements = syncDataArray.map((wordObj, index) => {
        const { w: word, i:icon, img:image, audio:sound } = wordObj;
        const sync = (index == coloredWords);
        if (icon == 1) { 
         
          return(
            <IconHandler key={index} syncIcon = {sync} image = {image} word = {word} soundUrl={sound}></IconHandler>
        )
        }else{
          return (  
            <Animatable.Text
            key={index}
            style={{ 
              fontSize: 30,
              color: sync ? 'red' : 'black',  
              paddingVertical:15
            }}
            // animation={coloredWords.includes(word) && onTouch>0 ? 'bounce' : null}
            // duration={1000}
          >
            {word}{' '}
          </Animatable.Text>
          );
        }
      });
      setTextElements(updatedTextElements);
    }
  }, [coloredWords]); 

  return (
    <View style={styles.container}>{textElements}</View>
  );
}

const styles = StyleSheet.create({ 
  container:{
    flexDirection: 'row',
    flexWrap:'wrap', 
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:130,
  },
});