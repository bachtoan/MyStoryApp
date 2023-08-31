import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Canvas, Image, useImage, useTouchHandler, useValue, Text, useFont, Paint, Fill } from "@shopify/react-native-skia";

export default function DemoSkiaCanvas() {
    const image = useImage("https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428");
    const { width, height } = Dimensions.get('window');
    const [isTouch, setisTouch] = useState(false);

    const cx = useValue(100);
    const cy = useValue(100);

    const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
    
    // console.log(font.getTextWidth("aaaaaaaaaaa"));
    const [timeoutId, setTimeoutId] = useState(null);


    const touchHandler = useTouchHandler({
        
        onActive: ({ x, y }) => {
            cx.current = x;
            cy.current = y;
            console.log("active:" + cx.current +"-"+ cy.current);
            if(cx.current >= 380 && cx.current <= 480 && cy.current >=250 && cy.current <= 350){
                setisTouch(false);
                setisTouch(true);
                setTimeout(() => {
                    setisTouch(false);
                }, 3000);                    
            }
        },       
    });
    return (
       
        <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
        
            <Image image={image} fit="cover" x={0} y={0} width={width} height={height} />
            
                <Text 
                    x={width/2 - 100}
                    y={height/2 - 150}
                    text="make a Salad bowl"
                    
                    font={font} 
                    color="red"
                    >          
                </Text>
            {isTouch && (            
                <Text
                x={cx.current-60}
                y={cy.current-30}
                text="Cabages"
                font={font} 
                color="red"               
                >         
                <Paint color="blue"></Paint>             
            </Text>)}
                
            </Canvas>
            
        
    )
}

const styles = StyleSheet.create({})