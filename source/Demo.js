import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Image, Path, Shadow, useImage, useTouchHandler } from '@shopify/react-native-skia'
import { useState } from 'react';

export default function Demo() {
    const {width,height} = Dimensions.get('window');
    const img = useImage(require("../image/page1.png"))    
    const [animPath, setAnimPath] = useState('');
    const [layer, setLayer] = useState(0);

    let gestureDir = 0;
    const gestureAnim = (dir, absX, absY) => {
          if (dir == 1) {
            let A = { x: absX, y: absY }
            let C = { x: (width - ((width - absX + absY / 4) / 7)), y: 0 }
            let B = { x: A.x + (C.x - A.x) / 4, y: height }
            let fixCurve1 = { x: A.x + (C.x - A.x) / 2, y: C.y + (A.y - C.y) / 1.5 };
            let fixCurve2 = { x: B.x, y: A.y + (B.y - A.y) / 1.25 };
            setAnimPath('M ' + A.x + ' ' + A.y + ' Q ' + fixCurve1.x + ' ' + fixCurve1.y + ' ' + C.x + ' ' + C.y + ' L ' + B.x + ' ' + B.y + ' Q ' + fixCurve2.x + ' ' + fixCurve2.y + ' ' + A.x + ' ' + A.y + ' Z');
          }
      if (dir == -1) {
          setAnimPath('M ' + absX + ' ' + absY + ' L ' + (absX * 0.5) + ' ' + height + ' L ' + (absX * 0.3) + ' 0' + ' Z');
      }
    }
  
  
    const touchHandler = useTouchHandler({
      onStart: ({ x, y }) => {
  
        console.log(x);
        setLayer(1)
        if (x > width - width / 3) gestureDir = 1; // if gesture is swipe from left to right , it means co to previous page
        if (x < width / 3) gestureDir = -1;
      },
  
      onActive: ({ x, y }) => {
        
        if (gestureDir != 0) { // if use intend to change page , trigger the aim
          gestureAnim(gestureDir, Math.round(x), Math.round(y))
        }
      },
  
      onEnd: () => {
        setLayer(0)
        gestureDir = 0;
        setAnimPath('');
      }
  
  
    })
  return (
    <Canvas style={{ position: "absolute", width: "100%", height: "100%", zIndex: layer}} onTouch={touchHandler}>
        {/* <Image
            image={img}
            fit="fill"
            width={width}
            height={height}
        /> */}

        <Path
          path={animPath}
          color={'#eee4b0'}
        >
          <Shadow
            dx={25}
            dy={15}
            blur={35}
            color="black"
          />
          <Shadow
            inner
            dx={-35}
            dy={0}
            blur={25}
            color="#93b8c4"
          />
        </Path>

      </Canvas>
  )
}

const styles = StyleSheet.create({})