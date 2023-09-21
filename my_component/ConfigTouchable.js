import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

export default function ConfigTouchable({
  positionX,
  positionY,
  touchWidth,
  touchHeight,
  data,
}) {

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
  return (
    <View
      style={{
        position: "absolute",
        flex:1,
        left: Number(positionX),
        top: Number(positionY),
        alignSelf: "baseline",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
      }}
    >
      <TouchableOpacity
        style={{
            position: "relative",
            flex:1,
            alignSelf: "baseline",
            width: Number(touchWidth),
            height: Number(touchHeight),
        }}
        onPress={TouchHandle}
      ></TouchableOpacity>

      {onTouch && (
        <View style={{ 
            position: 'absolute',
            left: textPositionX - 30,
            top: textPositionY - 50,
        }}>
        <Text
          style={{       
            backgroundColor: "black",
            color: "white",          
            padding: 5,
            fontSize:20,
            borderRadius: 10,
          }}
          numberOfLines={1}
        >
         {data}
        </Text>
        </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
