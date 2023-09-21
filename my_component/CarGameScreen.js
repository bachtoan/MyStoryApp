import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const CarGameScreen = () => {
    const [carPosition, setCarPosition] = useState(new Animated.Value(25));
    const [carScale, setCarScale] = useState(new Animated.Value(1));
    const navigation = useNavigation();

    

    const moveCarToLane = (lane) => {
        Animated.parallel([
            Animated.timing(carPosition, {
                toValue: lane,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(carScale, {
                toValue: lane === 60 ? 0.8 : 1,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start();
    }; 

    return (
        <ImageBackground
            source={require('../image/backgroundCountry.jpg')}
            resizeMode="stretch"
            style={styles.container}>
            <View style={styles.container}>
                
                <TouchableOpacity style={{marginTop: 190 , height:50}} onPress={() => moveCarToLane(60)}/>
                <TouchableOpacity style={{height:50}} onPress={() => moveCarToLane(25)}/>
            
                <Animated.Image
                    style={[
                        styles.car,
                        { bottom: carPosition, transform: [{ scale: carScale }] }
                    ]}
                    source={require('../image/carMcQueen.png')}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lane: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderBottomWidth: 1,
    },
    car: {
        width: 100,
        height: 100,
        marginLeft: 50,
        position: 'absolute',     
    },
})

export default CarGameScreen;
