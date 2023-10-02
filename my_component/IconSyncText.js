import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react';
import * as Animatable from 'react-native-animatable';
import IconHandler from './IconHandler';


export default function IconSyncText() {
  const syncData = [
    {
        "e": 490,
        "s": 0,
        "te": 2,
        "ts": 0,
        "i": 1,
        "w": "Roy"
    },
    { 
        "e": 780,
        "s": 490,
        "te": 6,
        "ts": 4,
        "i": 0,
        "w": "and"
    },
    {
        "e": 1420,
        "s": 780,
        "te": 11,
        "ts": 8,
        "i": 0,
        "w": "Milo"
    },
    {
        "e": 1680,
        "s": 1420,
        "te": 16,
        "ts": 13,
        "i": 0,
        "w": "went"
    },
    {
        "e": 1860,
        "s": 1680,
        "te": 19,
        "ts": 18,
        "i": 0,
        "w": "to"
    },
    {
        "e": 2050,
        "s": 1860,
        "te": 23,
        "ts": 21,
        "i": 0,
        "w": "the"
    },
    {
        "e": 2480,
        "s": 2050,
        "te": 30,
        "ts": 25,
        "i": 0,
        "w": "jungle"
    },
    {
        "e": 2670,
        "s": 2480,
        "te": 33,
        "ts": 32,
        "i": 0,
        "w": "to"
    },
    {
        "e": 3590,
        "s": 2670,
        "te": 42,
        "ts": 35,
        "i": 0,
        "w": "explore."
    },
    {
        "e": 4470,
        "s": 3590,
        "te": 47,
        "ts": 44,
        "i": 0,
        "w": "Milo"
    },
    {
        "e": 4770,
        "s": 4470,
        "te": 55,
        "ts": 49,
        "i": 0,
        "w": "brought"
    },
    {
        "e": 5030,
        "s": 4770,
        "te": 59,
        "ts": 57,
        "i": 0,
        "w": "his"
    },
    {
        "e": 5430,
        "s": 5030,
        "te": 63,
        "ts": 61,
        "i": 0,
        "w": "toy"
    },
    {
        "e": 6160,
        "s": 5430,
        "te": 69,
        "ts": 65,
        "i": 0,
        "w": "bone."
    },
    {
        "e": 6890,
        "s": 6160,
        "te": 73,
        "ts": 71,
        "i": 1,
        "w": "Roy"
    },
    {
        "e": 7190,
        "s": 6890,
        "te": 81,
        "ts": 75,
        "i": 0,
        "w": "brought"
    },
    {
        "e": 7480,
        "s": 7190,
        "te": 85,
        "ts": 83,
        "i": 0,
        "w": "his"
    },
    {
        "e": 8410,
        "s": 7480,
        "te": 96,
        "ts": 87,
        "i": 0,
        "w": "binoculars"
    },
    {
        "e": 8660,
        "s": 8410,
        "te": 100,
        "ts": 98,
        "i": 0,
        "w": "and"
    },
    {
        "e": 8780,
        "s": 8660,
        "te": 102,
        "ts": 102,
        "i": 0,
        "w": "a"
    },
    {
        "e": 9690,
        "s": 8780,
        "te": 113,
        "ts": 104,
        "i": 0,
        "w": "magnifying"
    },
    {
        "e": 10480,
        "s": 9690,
        "te": 120,
        "ts": 115,
        "i": 0,
        "w": "glass."
    },
    {
        "e": 10980,
        "s": 10480,
        "te": 125,
        "ts": 122,
        "i": 0,
        "w": "They"
    },
    {
        "e": 11140,
        "s": 10980,
        "te": 130,
        "ts": 127,
        "i": 0,
        "w": "were"
    },
    {
        "e": 11650,
        "s": 11140,
        "te": 135,
        "ts": 132,
        "i": 0,
        "w": "very"
    },
    {
        "e": 12960,
        "s": 11650,
        "te": 144,
        "ts": 137,
        "i": 0,
        "w": "excited!"
    }
];
  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);

  // useEffect(() => { 
  //   setColoredWords([])  
  //   if (syncData.length > 5) {
  //     // const syncDataArray = JSON.parse(syncData);  
  //     syncData.forEach((wordObj) => {
  //       const { w: word, s: startTime, e: endTime, i:icon } = wordObj;
  //       setTimeout(() => {
  //         setColoredWords((prevWords) => [...prevWords, word]);
  //         if(icon == 0){
  //           setTimeout(() => {
  //             setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
  //           }, endTime - startTime);
  //         }else{
  //           setTimeout(() => {
  //             setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
  //           }, 3000); 
  //         }
           
  //       }, startTime); 
  //     });
  //   }
  // }, []); 

  useEffect(() => {
    let elapsedTime = 0;
    let intervalId;
    syncData.forEach((wordObj) => {
      const { w: word, s: startTime, e: endTime, i:icon } = wordObj;
            console.log(word);
    });
    intervalId = setInterval(() => {

      elapsedTime += 10; 

      // Sử dụng biến elapsedTime theo nhu cầu của bạn, ví dụ:
      console.log(`Interval ${intervalId} đã chạy trong ${elapsedTime} mili giây.`);

      // Để dừng interval sau một khoảng thời gian cụ thể, bạn có thể thêm điều kiện:
      if (elapsedTime >= 10000) { // Ví dụ dừng sau 30 giây
        clearInterval(intervalId);
        console.log(`Interval ${intervalId} đã dừng sau ${elapsedTime} mili giây.`);
      }
    }, 10);
  }, []);
  
  
 
  useEffect(() => {
    if (syncData.length > 5) {
      // const syncDataArray = JSON.parse(syncData);
      const updatedTextElements = syncData.map((wordObj, index) => {
        const { w: word, i:icon } = wordObj;
        const sync = coloredWords.includes(word)
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
              <IconHandler key={index} syncIcon = {sync}></IconHandler>
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