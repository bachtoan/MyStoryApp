import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { IMAGE_REQUIRE } from '../assets/ImageSource'

export default function DecorImage({decor}) {
    const { width, height } = Dimensions.get('window')
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <Image
                resizeMode='contain'
                source={IMAGE_REQUIRE[decor]}
                style={[styles.image]}
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
        width:300,
        height:100
    },
})
