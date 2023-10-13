import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";

export default function DemoCanvas() {
  const canvasRef = useRef(null);
  const { width, height } = Dimensions.get("window");

  const touchableWidth = 80;
  const touchableHeight = 80;
  const touchableX = 380;
  const touchableY = 250;
  const [onTouch, setOnTouch] = useState(false);
  const [textPositionX, setOnTextPositionX] = useState();
  const [textPositionY, setOnTextPositionY] = useState();
  const [timeoutId, setTimeoutId] = useState(null);

  const handleCanvas = useCallback(async (canvas) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      

      const image = new CanvasImage(canvas);
      image.src =
        "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/iconPage1.png?alt=media&token=4e73ea82-f442-4a36-a89b-f7d93f8a4b9a&_gl=1*vb0s9*_ga*NTEwOTE1MjUuMTY5NTAyNzI0OA..*_ga_CW55HF8NVT*MTY5NjQwNzg0OC43LjEuMTY5NjQwNzg4MC4yOC4wLjA.";

      image.addEventListener("load", () => { 
        ctx.drawImage(image, 0, 0, width, height);
        ctx.fillStyle = "white"; 
        ctx.font = "30px Arial";
        ctx.fillText("Hello, asdadadnn!", 50, 50);
      });
      image.addEventListener("ontouch", () => {
        console.log("touch");
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    handleCanvas(canvas);
  }, [handleCanvas]);

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
    <View style={{ flex: 1, position: "relative" }}>
      <Canvas ref={canvasRef} style={{ flex: 1 }} />
      <View
        style={{
          position: "absolute",
          width: touchableWidth,
          height: touchableHeight,
          left: touchableX,
          top: touchableY,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: touchableWidth,
            height: touchableHeight,
          }}
          onPress={TouchHandle}
        ></TouchableOpacity>
        {onTouch && (
          <Text
            style={{
              position: "absolute",
              backgroundColor: "black",
              color: "white",
              padding: 10,
              borderRadius: 10,
              left: textPositionX - 30,
              top: textPositionY - 30,
            }}
          >
            Rau cải
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          width: 80,
          height: 50, 
          //x
          left:490,
          //y
          top: 270,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        }}
      >
        <TouchableOpacity style={{}} onPress={TouchHandle}></TouchableOpacity>
        {onTouch && (
          <Text
            style={{
              position: "absolute",
              backgroundColor: "black",
              color: "white",
              padding: 10,
              borderRadius: 10,
              left: textPositionX - 30,
              top: textPositionY - 30,
            }}
          >
            Rau cải
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
