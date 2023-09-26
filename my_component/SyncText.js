import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SyncText({ syncData, word, onTouch, refresh }) {
  //onTouch nhận giá trị là số, khởi đầu là số 0

  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);
  useEffect(() => {
    if(onTouch == 0){
      return;
    }
    setColoredWords((prevWords) => [...prevWords, word]);
    const timeoutId = setTimeout(() => {
      setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [word, onTouch]);

  useEffect(() => {
    setColoredWords([])
    if (syncData.length > 5) {
      const syncDataArray = JSON.parse(syncData);
      syncDataArray.forEach((wordObj) => {
        const { w: word, s: startTime, e: endTime } = wordObj;
        setTimeout(() => {
          setColoredWords((prevWords) => [...prevWords, word]);
          setTimeout(() => {
            setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
          }, endTime - startTime);
        }, startTime);
      });
    }
  }, [syncData,refresh]);

  useEffect(() => {
    if (syncData.length > 5) {
      const syncDataArray = JSON.parse(syncData);
      const updatedTextElements = syncDataArray.map((wordObj, index) => {
        const { w: word } = wordObj;
        return (
          <Animatable.Text
          key={index}
          style={{
            fontSize: 30,
            color: coloredWords.includes(word) ? 'red' : 'black',
          }}
          animation={coloredWords.includes(word) && onTouch>0 ? 'bounce' : null}
          duration={1000}
        >
          {word}{' '}
        </Animatable.Text>
        );
      });
      setTextElements(updatedTextElements);
    }
  }, [coloredWords]);

  return <View style={{ flexDirection: 'row' }}>{textElements}</View>;
}

const styles = StyleSheet.create({});
