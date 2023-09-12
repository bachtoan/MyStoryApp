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
import { Canvas, Image, useFont, useImage, useTouchHandler, useValue } from "@shopify/react-native-skia";
import { Text as CanvasText } from "@shopify/react-native-skia";


export default function DetailStoryScreen({ route }) {
  const image = useImage(
    "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428"
  );
  const cx = useValue(100);
  const cy = useValue(100);
  const [isTouch, setisTouch] = useState(false);
  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
  let timeoutIdForSync = null;
  let timeoutIdForTouch = null;

  const { id, name } = route.params;
  const [data, setdata] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [textPositionX, setOnTextPositionX] = useState();
  const [textPositionY, setOnTextPositionY] = useState();
  const [timeoutId, setTimeoutId] = useState(null);
  const [onTouch, setOnTouch] = useState(false);

  useEffect(() => {
    DetailStory(id);
  }, []);

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
        setdata(json.data);
        setIsDataLoaded(true);
        ToastAndroid.show("Đã tìm thấy", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
      if (
        cx.current >= 380 &&
        cx.current <= 480 &&
        cy.current >= 250 &&
        cy.current <= 350
      ) {
        // handleButtonClick("lettuce.");
        console.log("Active:" + cx.current + "-" +  cy.current);

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
    
      <View style={{ flex: 1, position: "relative" }}>
        {isDataLoaded && (
          <View style={{ flex: 1}}>
          <Canvas style={{flex:1 }} onTouch={touchHandler} >
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
