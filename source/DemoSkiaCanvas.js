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
import { DATA_REQUIRE } from "../assets/SoundSoure";

export default function DemoSkiaCanvas() {
  const cx = useValue(100);
  const cy = useValue(100);
  let timeoutIdForSync = null;
  let timeoutIdForTouch = null;
  let timeoutIdForSound = null;
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 25);
  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);
  const [word, setWord] = useState([]);

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
        "w": "lettuce"
    }
];
  const sync_data2=[
    {
        "e": 1200,
        "s": 0,
        "te": 7,
        "ts": 0,
        "w": "Finally,"
    },
    {
        "e": 1490,
        "s": 1200,
        "te": 9,
        "ts": 9,
        "w": "I"
    },
    {
        "e": 1700,
        "s": 1490,
        "te": 14,
        "ts": 11,
        "w": "will"
    },
    {
        "e": 2100,
        "s": 1700,
        "te": 18,
        "ts": 16,
        "w": "add"
    },
    {
        "e": 2260,
        "s": 2100,
        "te": 22,
        "ts": 20,
        "w": "the"
    },
    {
        "e": 3580,
        "s": 2260,
        "te": 32,
        "ts": 24,
        "w": "dressing."
    }
]

 
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


  async function playSound(DATA) {    
    const { sound } = await Audio.Sound.createAsync( 
      DATA
    );
    setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync();
  }
  

  useEffect(() => {
    return sound
      ? () => {
          // console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  


 
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

  const touchables = [
    {
        "id": 1,
        "id_sound": 2,
        "data": "lettuce",
        "created_at": "2023-09-06T04:19:46.000000Z",
        "updated_at": "2023-09-06T04:19:46.000000Z",
        "id_content": 2,
        "pivot": {
            "id_page": 1,
            "id_touchable": 1,
            "positionX": "380",
            "positionY": "250",
            "touchWidth": "80",
            "touchHeight": "80"
        },
        "sound": {
            "id": 2,
            "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/lettuce.mp3?alt=media&token=4de08084-76c6-4b4d-976d-a20bf77f23d7",
            "created_at": "2023-09-06T04:15:17.000000Z",
            "updated_at": "2023-09-06T04:15:17.000000Z",
            "soundName": "lettuce"
        }
    },
    {
        "id": 5,
        "id_sound": 7,
        "data": "boy",
        "created_at": "2023-09-06T09:29:05.000000Z",
        "updated_at": "2023-09-06T09:29:05.000000Z",
        "id_content": 7,
        "pivot": {
            "id_page": 1,
            "id_touchable": 5,
            "positionX": "450",
            "positionY": "80",
            "touchWidth": "100",
            "touchHeight": "200"
        },
        "sound": {
            "id": 7,
            "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/boy.mp3?alt=media&token=47e20a92-b0d9-40ae-9456-ab2d6237c7aa",
            "created_at": "2023-09-06T09:25:44.000000Z",
            "updated_at": "2023-09-06T09:25:44.000000Z",
            "soundName": "boy"
        }
    },
    {
        "id": 4,
        "id_sound": 6,
        "data": "sink",
        "created_at": "2023-09-06T09:07:25.000000Z",
        "updated_at": "2023-09-06T09:07:25.000000Z",
        "id_content": 6,
        "pivot": {
            "id_page": 1,
            "id_touchable": 4,
            "positionX": "160",
            "positionY": "300",
            "touchWidth": "220",
            "touchHeight": "120"
        },
        "sound": {
            "id": 6,
            "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/sink.mp3?alt=media&token=85244c32-7d6d-4e0d-b9da-f2848491e1ad",
            "created_at": "2023-09-06T09:03:03.000000Z",
            "updated_at": "2023-09-06T09:03:03.000000Z",
            "soundName": "sink"
        }
    }
];


function checkTouch(x, y) {
  
  let resouce = [false, "", ""];
  for (const touchable of touchables) {
    const { pivot } = touchable;
    const { sound } = touchable;

    const positionX = parseInt(pivot.positionX, 10); 
    const positionY = parseInt(pivot.positionY, 10); 
    const touchWidth = parseInt(pivot.touchWidth, 10); 
    const touchHeight = parseInt(pivot.touchHeight, 10);

    if (
      x >= positionX &&
      x <= positionX + touchWidth &&
      y >= positionY &&
      y <= positionY + touchHeight
    ) {
      
      resouce = [true, touchable.data, sound.soundName];
    }
  }
  return resouce;
}

function handleButtonClick(word,soundName) { 
  setColoredWords([]);
  setWord(word);
  if(DATA_REQUIRE[soundName]){
    playSound(DATA_REQUIRE[soundName]);
  }else{
    console.log("a");
  }
  

  if (timeoutIdForSync) {
    clearTimeout(timeoutIdForSync);
  }
  setColoredWords((prevWords) => [...prevWords, word]);
  timeoutIdForSync = setTimeout(() => {
    setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
    timeoutIdForSync = null; 
  }, 2000);  
  
}



  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const resouce =  checkTouch(x, y);
      if (
        resouce[0]
      ) {
        handleButtonClick(resouce[1], resouce[2]);
        cx.current = x;
        cy.current = y;
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
    onEnd:({ x, y })=>{
      
    }
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
          text={word}
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
