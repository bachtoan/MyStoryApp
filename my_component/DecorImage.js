import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'

export default function DecorImage() {
    const { width, height } = Dimensions.get('window')
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <Image
                resizeMode='contain'
                source={require("../icons/decor/decor2.png")}
                style={[styles.image,{width:300,height:130}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    image: {
        
    },
})
