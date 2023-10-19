import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { IMAGE_REQUIRE } from '../assets/ImageSource'

export default function DecorImage({decor, imageHeight, imageWidth, imageLeft}) {
    const { width, height } = Dimensions.get('window')
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <Image
                resizeMode='contain'
                source={IMAGE_REQUIRE[decor]}
                // source={require('../icons/decor/decor5.png')}
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    left:imageLeft,
                    // backgroundColor:'red'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
       
    },
    
})
