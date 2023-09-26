import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Text as CanvasText,
  useFont,
 
} from "@shopify/react-native-skia";

export default function SyncText({ syncData, word, onTouch, refresh,content }) {
  const font = useFont(require("../assets/font/Mooli-Regular.ttf"), 30);
  let lableWidth = 0;

  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);
  const { width, height } = Dimensions.get("window");
  
  
    if (font) {
      lableWidth = font.getTextWidth(content)
    }
  

  useEffect(() => {
    setColoredWords([]);
    setColoredWords((prevWords) => [...prevWords, word]);
    const timeoutId = setTimeout(() => {
      setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [word, onTouch]);

  useEffect(() => {
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
      let xPosition = 0;
  
      const updatedTextElements = syncDataArray.map((wordObj, index) => {
        const { w: word } = wordObj;
        const wordWidth = font?.getTextWidth(word) + font?.getTextWidth(" ");
  
        const textElement = (
          <CanvasText
            key={index}
            x={width/2 - lableWidth/2 + xPosition}
            y={60}
            text={word}
            font={font}
            color = {coloredWords.includes(word) ? 'red' : 'black'}
          />
        );
  
        xPosition += wordWidth;
  
        return textElement;
      });
  
      setTextElements(updatedTextElements);
    }
  }, [coloredWords]);

  return textElements;
}

const styles = StyleSheet.create({});
