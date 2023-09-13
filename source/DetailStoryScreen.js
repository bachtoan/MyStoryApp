import {
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { API_URL } from "./Host";
import DemoCanvas from "./DemoCanvas";
import ConfigTouchable from "./ConfigTouchable";
import { useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Text as CanvasText,
  Image,
  useFont,
  useImage,
  useTouchHandler,
  useValue
} from "@shopify/react-native-skia";
import { DATA_REQUIRE } from "../assets/SoundSoure";
import { Audio } from 'expo-av';

export default function DetailStoryScreen({ route }) {
  const imageX = useImage(
    "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428"
      
    );
  const [image, setImage] = useState('');
  const cx = useValue(100);
  const cy = useValue(100);
  const [isTouch, setisTouch] = useState(false);
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
  let timeoutIdForSync = null;
  let timeoutIdForTouch = null;

  const { id, name } = route.params;
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [textPositionX, setOnTextPositionX] = useState();
  const [textPositionY, setOnTextPositionY] = useState();
  const [timeoutId, setTimeoutId] = useState(null);
  const [onTouch, setOnTouch] = useState(false);
  const [sound, setSound] = React.useState();
  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);
  const [word, setWord] = useState([]);
  const [syncData, setSyncData] = useState([]);
  const [touchables, setTouchables] = useState([]);
  const [something, setSomething] = useState('a');

// const touchables = [
//     {
//         "id": 1,
//         "id_sound": 2,
//         "data": "lettuce",
//         "created_at": "2023-09-06T04:19:46.000000Z",
//         "updated_at": "2023-09-06T04:19:46.000000Z",
//         "id_content": 2,
//         "pivot": {
//             "id_page": 1,
//             "id_touchable": 1,
//             "positionX": "380",
//             "positionY": "250",
//             "touchWidth": "80",
//             "touchHeight": "80"
//         },
//         "sound": {
//             "id": 2,
//             "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/lettuce.mp3?alt=media&token=4de08084-76c6-4b4d-976d-a20bf77f23d7",
//             "created_at": "2023-09-06T04:15:17.000000Z",
//             "updated_at": "2023-09-06T04:15:17.000000Z",
//             "soundName": "lettuce"
//         }
//     },
//     {
//         "id": 5,
//         "id_sound": 7,
//         "data": "boy",
//         "created_at": "2023-09-06T09:29:05.000000Z",
//         "updated_at": "2023-09-06T09:29:05.000000Z",
//         "id_content": 7,
//         "pivot": {
//             "id_page": 1,
//             "id_touchable": 5,
//             "positionX": "450",
//             "positionY": "80",
//             "touchWidth": "100",
//             "touchHeight": "200"
//         },
//         "sound": {
//             "id": 7,
//             "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/boy.mp3?alt=media&token=47e20a92-b0d9-40ae-9456-ab2d6237c7aa",
//             "created_at": "2023-09-06T09:25:44.000000Z",
//             "updated_at": "2023-09-06T09:25:44.000000Z",
//             "soundName": "boy"
//         }
//     },
//     {
//         "id": 4,
//         "id_sound": 6,
//         "data": "sink",
//         "created_at": "2023-09-06T09:07:25.000000Z",
//         "updated_at": "2023-09-06T09:07:25.000000Z",
//         "id_content": 6,
//         "pivot": {
//             "id_page": 1,
//             "id_touchable": 4,
//             "positionX": "160",
//             "positionY": "300",
//             "touchWidth": "220",
//             "touchHeight": "120"
//         },
//         "sound": {
//             "id": 6,
//             "soundUrl": "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/sink.mp3?alt=media&token=85244c32-7d6d-4e0d-b9da-f2848491e1ad",
//             "created_at": "2023-09-06T09:03:03.000000Z",
//             "updated_at": "2023-09-06T09:03:03.000000Z",
//             "soundName": "sink"
//         }
//     }
// ];
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

  const DetailStory = async (id) => {
    try {
      const response = await fetch(API_URL + "detailstory", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_story: id,
        }),
      });
      const json = await response.json();
      if (response.status === 201) {
        setData(json.data);
        setTouchables(json.data.pages[0].touchables);
        
        // console.log("DetailStory",json.data);
        // console.log("DetailStory",json.data.pages[0].touchables);

        // // console.log('Data: '+json.data.pages[0].touchables);
        setIsDataLoaded(true);
        ToastAndroid.show("Đã tìm thấy", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => { 
    DetailStory(id); 
  }, []);

  const PreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      ToastAndroid.show("Đây là trang đầu tiên rồi", ToastAndroid.SHORT);
    }
  };
  const NextPage = () => {
    if (currentPage < data.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      ToastAndroid.show("Đây là trang cuối rồi", ToastAndroid.SHORT);
    }
  };

  async function playSound(DATA) {    
    const { sound } = await Audio.Sound.createAsync( 
      DATA
    ); 
    setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync();
  }

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

  function checkTouch(x, y) {
    console.log(touchables); 
    console.log(data);  

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
    
  },[data,touchables]);

  return (
    
      <View style={{ flex: 1, position: "relative" }}>
        {isDataLoaded && (
          <View style={{ flex: 1}}>
          <Canvas style={{flex:1 }} onTouch={touchHandler} >
            <Image
              image={imageX}
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




            {/* <Text>{"Trang số: "  + data.pages[currentPage].page_number}</Text>
              <Text>{"Background: "  + data.pages[currentPage].background}</Text>

              {data.pages[currentPage].contents.map(content => (
                <View key={content.id}>
                  <Text>{"Contents: " + content.content}</Text>
                  <Text>{"positionX: " + content.pivot.positionX}</Text>
                  <Text>{"positionY: " + content.pivot.positionY}</Text>
                  <Text>{"SoundUrl: " + content.sound.soundUrl}</Text>
                </View>
              ))}
              {data.pages[currentPage].touchables.map(touchable => (
                <View key={touchable.id}>
                  <Text>{"Contents: " + touchable.data}</Text>
                  <Text>{"positionX: " + touchable.pivot.positionX}</Text>
                  <Text>{"positionY: " + touchable.pivot.positionY}</Text>
                  <Text>{"SoundUrl: " + touchable.sound.soundUrl}</Text>
                </View>
              ))}
              <Button title="Trang trước" onPress={PreviousPage} />
              <Button title="Trang sau" onPress={NextPage}  /> */}
            

            {/* {data.pages[currentPage].touchables.map((touchable) => (
              <View style={{ position: "absolute" }} key={touchable.id}>
                
              </View>
            ))} */}
          </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({});
