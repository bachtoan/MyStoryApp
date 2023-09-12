import {
  Canvas,
  Text as CanvasText,
  Image,
  useFont,
  useImage,
  useTouchHandler,
  useValue
} from "@shopify/react-native-skia";
import { Audio } from 'expo-av';
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { DATA_REQUIRE } from "./SoundSoure";

export default function DemoSkiaCanvas() {
  const cx = useValue(100);
  const cy = useValue(100);
  let timeoutIdForSync = null;
  let timeoutIdForTouch = null;
  let timeoutIdForSound = null;
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);


  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);

  const image = useImage(
    "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428"
  );
  const { width, height } = Dimensions.get("window");
  const [isTouch, setisTouch] = useState(false);
  const sync_data= [
    {
        "e": 350,
        "s": 0,
        "te": 0,
        "ts": 0,
        "w": "I"
    },
    {
        "e": 580,
        "s": 350,
        "te": 5,
        "ts": 2,
        "w": "will"
    },
    {
        "e": 980,
        "s": 580,
        "te": 11,
        "ts": 7,
        "w": "shred"
    },
    {
        "e": 1370,
        "s": 980,
        "te": 16,
        "ts": 13,
        "w": "some"
    },
    {
        "e": 2330,
        "s": 1370,
        "te": 25,
        "ts": 18,
        "w": "lettuce."
    }
];

 
  useEffect(() => {
    playSound(DATA_REQUIRE.I_will_shred_some_lettuce);
    sync_data.forEach((wordObj) => {
      const word = wordObj.w;
      const startTime = wordObj.s;
      const endTime = wordObj.e;

      setTimeout(() => {
        setColoredWords((prevWords) => [...prevWords, word]);
        setTimeout(() => {
          setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
        }, endTime - startTime);
      }, startTime);
    });
  }, []);
  const [sound, setSound] = React.useState();
  const [isPlayingSound, setIsPlayingSound] = useState(false);


  async function playSound(DATA) {    
    const { sound } = await Audio.Sound.createAsync( 
      DATA
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  


  function handleButtonClick(word) { 
    playSound(DATA_REQUIRE.lettuce);

    if (timeoutIdForSync) {
      clearTimeout(timeoutIdForSync);
    }
    setColoredWords((prevWords) => [...prevWords, word]);
    timeoutIdForSync = setTimeout(() => {
      setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
      timeoutIdForSync = null; 
    }, 2000);  
  }

  useEffect(() => {
    const updatedTextElements = sync_data.map((wordObj, index) => {
      const word = wordObj.w;
      return (
        <Text
          key={index}
          style={{
            fontSize: 30,
            color: coloredWords.includes(word) ? 'red' : 'black',
          }}
        >
          {word}{' '}
        </Text>
      );
    });
    setTextElements(updatedTextElements);
  }, [coloredWords]);

   

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
      if (
        cx.current >= 380 &&
        cx.current <= 480 &&
        cy.current >= 250 &&
        cy.current <= 350
      ) {
        handleButtonClick("lettuce.");
        setisTouch(false);
        setisTouch(true);
        if (timeoutIdForTouch) {
          clearTimeout(timeoutIdForTouch);
        }
        
        timeoutIdForTouch = setTimeout(() => {
          setisTouch(false);
          timeoutIdForTouch = null; 
        }, 2000);  
        
      }
    },
  });

  return (
    <View style={{flex:1 }}>
    <Canvas style={{flex:1 }} onTouch={touchHandler}>
      <Image
        image={image}
        fit="fill"
        width={width}
        height={height}
      />
      
      {isTouch && (
        <CanvasText
          x={cx.current - 30}
          y={cy.current - 30}
          text="lettuce"
          font={font}
          color="black"
        >         
        </CanvasText>
      )}       
    </Canvas>
    <View style={{
      position:'absolute',
      width:width,
      marginTop:40,
      }}>
        <View style={{
          width:width,
          flexDirection:'row',
          justifyContent:'center',
        }}>
         {textElements}
         

        </View>
        
    </View>
    
    </View>
  );
}

const styles = StyleSheet.create({});
