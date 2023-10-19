import {
  Dimensions,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { IMAGE_REQUIRE } from "../assets/ImageSource";
import SyncText from "../my_component/SyncText";

export default function DetailStoryScreen({ route }) {

  const cx = useValue(100);
  const cy = useValue(100);
  const { width, height } = Dimensions.get("window");
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
  let timeoutIdForTouch;
  const [onStartX, setOnStartX] = useState();
  const [onStartY, setOnStartY] = useState();
  const [refreshKey, setRefreshKey] = useState(false);
  const [isTouch, setisTouch] = useState(false);
  const [onTouch, setOnTouch] = useState(0);
  const { id, data } = route.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sound, setSound] = useState();
  const [contentSound, setContentSound] = useState([]);
  const [word, setWord] = useState([]);
  const [isSoundPlay, setIsSoundPlaying] = useState(false);
  const navigation = new useNavigation();

  const imageX = useImage(
    IMAGE_REQUIRE[data.pages[currentPage].backgroundName]
  );


  const PreviousPage = () => {
    setisTouch(false);
    setOnTouch(0);
    if (isSoundPlay) {
      return;
    } else {
      if (currentPage > 0) {
        setCurrentPage((prevCurrentPage) => {
          const newCurrentPage = prevCurrentPage - 1;
          setContentSound(data.pages[newCurrentPage].contents[0].sound.soundName);
          return newCurrentPage;
        });
      } else {
        ToastAndroid.show("Đây là trang đầu tiên rồi", ToastAndroid.SHORT);
      }
    }

  };
  const NextPage = () => {
    setisTouch(false);
    setOnTouch(0);

    if (isSoundPlay) {
      return;
    } else {
      if (currentPage < data.pages.length - 1) {
        setCurrentPage((prevCurrentPage) => {
          const newCurrentPage = prevCurrentPage + 1;
          setContentSound(data.pages[newCurrentPage].contents[0].sound.soundName);
          return newCurrentPage;
        });
      } else {
        navigation.replace('Congratulation')
        // ToastAndroid.show("Đây là trang cuối rồi", ToastAndroid.SHORT);
      }
    }

  };

  const HandleRefresh = () => {
    setOnTouch(0);

    setTimeout(() => {
      setRefreshKey(!refreshKey);
    }, 500);
  };

  useEffect(() => {
    setContentSound(data.pages[currentPage].contents[0].sound.soundName);
    setIsDataLoaded(true)
  }, []);

  useEffect(() => {
    playSound(contentSound)
  }, [contentSound, refreshKey]);



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
    try {
      const { sound } = await Audio.Sound.createAsync(DATA_REQUIRE[DATA]);
      setSound(sound);
      setIsSoundPlaying(true);
      await sound.playAsync();
      return true;
    } catch (error) {
      // console.error('Lỗi khi chạy âm thanh:', error);
      return false;
    }
  }


  function checkTouch(x, y) {
    const screenWidth = 836.1904761904761;
    const screenHeight = 411.42857142857144;
    const xScale = width / screenWidth;
    const yScale = height / screenHeight;

    let resouce = [false, "", ""];
    for (const touchable of data.pages[currentPage].touchables) {
      const { pivot } = touchable;
      const { sound } = touchable;
      const positionX = parseInt(pivot.positionX, 10);
      const positionY = parseInt(pivot.positionY, 10);
      const touchWidth = parseInt(pivot.touchWidth, 10);
      const touchHeight = parseInt(pivot.touchHeight, 10);

      const scaledPositionX = positionX * xScale;
      const scaledPositionY = positionY * yScale;
      const scaledTouchWidth = touchWidth * xScale;
      const scaledTouchHeight = touchHeight * yScale;

      if (
        x >= scaledPositionX &&
        x <= scaledPositionX + scaledTouchWidth &&
        y >= scaledPositionY &&
        y <= scaledPositionY + scaledTouchHeight
      ) {
        resouce = [true, touchable.data, sound.soundName];
      }
    }
    return resouce;
  }

  function handleClick(word, soundName) {
    setWord(word);
    setOnTouch(onTouch + 1);
    if (DATA_REQUIRE[soundName]) {
      playSound(soundName)
    }
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
        handleClick(resouce[1], resouce[2]);
        // console.log(timeoutIdForTouch);
        if (timeoutIdForTouch) {
          clearTimeout(timeoutIdForTouch);
        }
        setisTouch(true);
      }
    },
    onEnd: ({ x, y }) => {
      timeoutIdForTouch = setTimeout(() => {
        setisTouch(false);
        // console.log("time out");
        timeoutIdForTouch = null;
      }, 3000);
      // console.log(timeoutIdForTouch);

      const distanceX = onStartX - x;
      const distanceY = onStartY - y;

      if (distanceX > 120) {
        NextPage();
        return
      }
      if (distanceX < -120) {
        PreviousPage();
        return
      }
      if (distanceY < -120) {
        HandleRefresh();
        return
      }

    },


  }, [data, sound, onStartX, onStartY, currentPage, isTouch, isSoundPlay]);

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
              <SyncText
                syncData={data.pages[currentPage].contents[0].sync_data}
                word={word}
                onTouch={onTouch}
                refresh={refreshKey}
              ></SyncText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
