import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react';
import * as Animatable from 'react-native-animatable';
import IconHandler from './IconHandler';


export default function IconSyncText({syncData, duration}) {
 
  const [coloredWords, setColoredWords] = useState();
  const [textElements, setTextElements] = useState([]);
  const [syncText, setSyncTexts] = useState(false);

  
  useEffect(() => {
    setSyncTexts(true)
  }, [])
  
  useEffect(() => {
    // console.log('render');
    if (syncData.length > 5 && syncText) {
      syncData.forEach((wordObj, index) => {
        const { w: word, s: startTime, e: endTime, i: icon } = wordObj;
        setTimeout(() => {
          setColoredWords(index);
        }, startTime);
        setTimeout(() => {
          setColoredWords(-1);
        }, duration);
      });
    }   
    return()=>{setSyncTexts(false)}
  }, [syncText,syncData]); 
  
   
 
  useEffect(() => {
    // console.log(coloredWords); 
    if (syncData.length > 5) {
      // const syncDataArray = JSON.parse(syncData);
      const updatedTextElements = syncData.map((wordObj, index) => {
        const { w: word, i:icon, img:image, audio:sound } = wordObj;
        const sync = (index == coloredWords);
        if (icon == 0) { 
          return (  
            <Animatable.Text
            key={index}
            style={{ 
              fontSize: 30,
              color: sync ? 'red' : 'black',  
              paddingVertical:20
            }}
            // animation={coloredWords.includes(word) && onTouch>0 ? 'bounce' : null}
            // duration={1000}
          >
            {word}{' '}
          </Animatable.Text>
          );
        }else{
          return(
              <IconHandler key={index} syncIcon = {sync} image = {image} word = {word} soundUrl={sound}></IconHandler>
          )
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
    paddingHorizontal:120
  },
});