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

  const cx = useValue(100);
  const cy = useValue(100);
  const { width, height } = Dimensions.get("window");
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
  let timeoutIdForSync = null;
  let timeoutIdForTouch = null;

  const [onStartX, setOnStartX] = useState();
  const [onStartY, setOnStartY] = useState();

  const [refreshKey, setRefreshKey] = useState(false);
  const [isTouch, setisTouch] = useState(false);
  const [image, setImage] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { id, data } = route.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sound, setSound] = React.useState();
  const [coloredWords, setColoredWords] = useState([]);
  const [textElements, setTextElements] = useState([]);
  const [contentSound, setContentSound] = useState([]);
  const [word, setWord] = useState([]);
  const [syncData, setSyncData] = useState([]);
  const [touchables, setTouchables] = useState([]);

  useEffect(() => {
    setTouchables(data.pages[currentPage].touchables);
    setSyncData(data.pages[currentPage].contents[0].sync_data);
    setContentSound(data.pages[currentPage].contents[0].sound.soundName);
    setImage(data.pages[currentPage].background);
    setIsDataLoaded(true)
  }, []);

  useEffect(() => {
    setIsImageLoaded(true);
    // console.log(isDataLoaded);
  }, [image]);

  //logic để thêm từ cần sync text vào mảng
  useEffect(() => {
    if (isImageLoaded) {
      playSound(contentSound)
        .then((isSuccessful) => {
          if (isSuccessful) {
            if (syncData.length > 5) {
              const syncDataArray = JSON.parse(syncData);
              syncDataArray.forEach((wordObj) => {
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
            }
          }
        });
    }
  }, [contentSound, syncData,refreshKey]);

  //render text khi logic sync text chạy, render theo mảng coloredWords
  useEffect(() => {
    if (isImageLoaded) {
      if (syncData.length > 5) {
        const syncDataArray = JSON.parse(syncData);
        const updatedTextElements = syncDataArray.map((wordObj, index) => {
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
      }
    }
  }, [coloredWords, syncData, refreshKey]);

  useEffect(() => {
    return sound
      ? () => {
        // console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const imageX = useImage(
    image
  );

    // console.log(currentPage);
  const PreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevCurrentPage) => {
        const newCurrentPage = prevCurrentPage - 1;
  
       
        setTouchables(data.pages[newCurrentPage].touchables);
        setSyncData(data.pages[newCurrentPage].contents[0].sync_data);
        setContentSound(data.pages[newCurrentPage].contents[0].sound.soundName);
        setImage(data.pages[newCurrentPage].background);  
        return newCurrentPage;
      });
    } else {
      ToastAndroid.show("Đây là trang đầu tiên rồi", ToastAndroid.SHORT);
    }
  };
  const NextPage = () => {
    if (currentPage < data.pages.length - 1) {
      setCurrentPage((prevCurrentPage) => {
        const newCurrentPage = prevCurrentPage + 1;
        
        setTouchables(data.pages[newCurrentPage].touchables);
        setSyncData(data.pages[newCurrentPage].contents[0].sync_data);
        setContentSound(data.pages[newCurrentPage].contents[0].sound.soundName);
        setImage(data.pages[newCurrentPage].background);
        return newCurrentPage;
      });
    } else {
      ToastAndroid.show("Đây là trang cuối rồi", ToastAndroid.SHORT);
    }
  };

  const handleRefresh = () => {
    console.log(refreshKey);
   

    setTimeout(() => {
      setRefreshKey(!refreshKey);
    }, 500);
   
  };

  async function playSound(DATA) {
    try {
      const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE[DATA]);
      setSound(sound);
      await sound.playAsync();
      return true;
    } catch (error) {
      console.error('Lỗi khi chạy âm thanh:', error);
      return false;
    }
  }


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
  function handleButtonClick(word, soundName) {

    setColoredWords([]);
    setWord(word);
    setColoredWords((prevWords) => [...prevWords, word]);
    
    setisTouch(true);
        
          clearTimeout(timeoutIdForTouch);
     
        timeoutIdForTouch = setTimeout(() => {
          setisTouch(false);
          timeoutIdForTouch = null;
        }, 2000);

    if (DATA_REQUIRE[soundName]) {
      playSound(soundName)
    }

    if (timeoutIdForSync) {
      clearTimeout(timeoutIdForSync);
    }
    timeoutIdForSync = setTimeout(() => {
      setColoredWords((prevWords) => prevWords.filter((w) => w !== word));
      timeoutIdForSync = null;
    }, 2000);

  }


  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      setOnStartX(x);
      setOnStartY(y);
      const resouce = checkTouch(x, y);
      if (
        resouce[0]
      ) {
        cx.current = x;
        cy.current = y;
        setisTouch(false);
        
        handleButtonClick(resouce[1], resouce[2]);

      }

    },   
    onEnd: ({ x, y }) => {
      const distanceX = onStartX - x;
      const distanceY = onStartY - y;
      
      if(onStartX > 700 && distanceX > 120){
          NextPage();
          return
      }
      if(onStartX < 150 && distanceX < -120){
          PreviousPage();
          return
      }
      if(distanceY < -120){
        handleRefresh();
        return
      }    
    },
  

  }, [data, touchables, onStartX, onStartY, currentPage]);

  return (

    <View style={{ flex: 1, position: "relative" }}>
      {isDataLoaded && (
        <View style={{ flex: 1 }}>
          <Canvas style={{ flex: 1 }} onTouch={touchHandler} >
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
            position: 'absolute',
            width: width,
            marginTop: 40,
          }}>
            <View style={{
              width: width,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              {textElements}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
