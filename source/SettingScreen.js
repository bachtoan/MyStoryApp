import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import Toolbar from '../my_component/Toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBook, faFileAudio,faGear, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import HandlerAnimation from '../my_component/HandlerAnimation'

export default function SettingScreen({navigation}) {
    function OpenAudioManager(){
        navigation.navigate('Audio')
    }
    function OpenStoryManager(){
        navigation.navigate('StoryManager')
    }
    function OpenMap(){
        navigation.navigate('Map')
    }

    return (
        
            <ImageBackground source={require('../image/landscape.jpg')} style={styles.container}>
            <Toolbar></Toolbar>
            <View style={styles.row}>

                <HandlerAnimation style={styles.touchable} animation="slideInLeft">
                    <TouchableOpacity style={styles.touchable} onPress={OpenAudioManager}>
                        <FontAwesomeIcon icon={faFileAudio} size={40} color='black' />
                        <Text style={styles.text}>Audio</Text>
                    </TouchableOpacity>
                </HandlerAnimation>

                <HandlerAnimation style={styles.touchable} animation="slideInDown">
                    <TouchableOpacity style={styles.touchable} onPress={OpenStoryManager}>
                        <FontAwesomeIcon icon={faBook} size={40} color='black' />
                        <Text style={styles.text}>Story</Text>
                    </TouchableOpacity>
                </HandlerAnimation>
            </View>
            <View style={styles.row}>
                <HandlerAnimation style={styles.touchable} animation="slideInUp">
                    <TouchableOpacity style={styles.touchable} onPress={OpenMap}>
                        <FontAwesomeIcon icon={faMapLocationDot} size={40} color='black' />
                        <Text style={styles.text}>Map</Text>
                    </TouchableOpacity>
                </HandlerAnimation>

                <HandlerAnimation style={styles.touchable} animation="slideInRight">
                    <TouchableOpacity style={styles.touchable}>
                        <FontAwesomeIcon icon={faGear} size={40} color='black' />
                        <Text style={styles.text}>Setting</Text>
                    </TouchableOpacity>
                </HandlerAnimation>
            </View>
            </ImageBackground>
            

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        paddingHorizontal:120,
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    touchable: {
        backgroundColor: 'white',
        width: 200,
        height: 100,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        marginTop: 5,
        textAlign: "center"
    }
})