import React, { useRef, useEffect, useCallback } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Canvas,  {Image as CanvasImage} from 'react-native-canvas';

export default function DemoCanvas() {
    const canvasRef = useRef(null);
    const { width, height } = Dimensions.get('window');
    const touchableWidth = 150;
    const touchableHeight = 50;
    const touchableX = (width - touchableWidth) / 2;
    const touchableY = (height - touchableHeight) / 2;
   
    const handleCanvas = useCallback(async(canvas) => {

        if (canvas) {
            const ctx = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;
              
             
            
            

            const image = new CanvasImage(canvas);
            image.src = 'https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428';
            
            
            image.addEventListener('load', () => {
                ctx.drawImage(image, 0, 0, width, height);
                ctx.fillStyle = 'white';
                ctx.font = '30px Arial';
                ctx.fillText('Hello, asdadadnn!', 50, 50);   
                ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
                ctx.fillRect(touchableX, touchableY, touchableWidth, touchableHeight);
                
            });
            
            
            
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        handleCanvas(canvas);
    }, [handleCanvas]);

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Canvas ref={canvasRef} style={{ flex: 1 }} />
            <TouchableOpacity style={{ 
                position: 'absolute',
                width: touchableWidth,
                height: touchableHeight,
                left: touchableX,
                top: touchableY,
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
            </TouchableOpacity>
          
        </View>
    );
}

const styles = StyleSheet.create({
    
})
