import {
  Button,
  Dimensions,
  Image,
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

export default function DetailStoryScreen({ route }) {
  const { id, name } = route.params;
  const [data, setdata] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [textPositionX, setOnTextPositionX] = useState();
  const [textPositionY, setOnTextPositionY] = useState();
  const [timeoutId, setTimeoutId] = useState(null);
  const [onTouch, setOnTouch] = useState(false);

  const TouchHandle = (event) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    setOnTouch(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setOnTouch(false);
    }, 2000);
    setTimeoutId(newTimeoutId);
    setOnTextPositionX(x);
    setOnTextPositionY(y);
  };

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

  return (
    <ScrollView>
      <View style={{ flex: 1, position: "relative" }}>
        {isDataLoaded && (
          <View>
            <Text>{"Trang số: "  + data.pages[currentPage].page_number}</Text>
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
              <Button title="Trang sau" onPress={NextPage}  />

            <ImageBackground
              resizeMode="cover"
              style={{ width: width, height: height }}
              source={{
                uri: data.pages[currentPage].background,
              }}
            />
            {data.pages[currentPage].contents.map((content) => (
                <View key={content.id}
                  style={{
                    position: 'absolute',
                    left: Number(content.pivot.positionX),
                    top: Number(content.pivot.positionY),
                     
                  }}
                >
                  <Text>{"Contents: " + content.content}</Text>                  
                </View>
            ))}
           

            {data.pages[currentPage].touchables.map((touchable) => (
              <View style={{ position: "absolute" }} key={touchable.id}>
                <ConfigTouchable
                  positionX={touchable.pivot.positionX}
                  positionY={touchable.pivot.positionY}
                  touchWidth={touchable.pivot.touchWidth}
                  touchHeight={touchable.pivot.touchHeight}
                  data={touchable.data}
                ></ConfigTouchable>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
