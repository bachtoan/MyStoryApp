import { Modal, StyleSheet, Text, View, Image, Animated, Easing, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faHandPointUp } from '@fortawesome/free-solid-svg-icons';

export default function PromptSwipe() {
    const iconPositionX = new Animated.Value(0);
    const iconPositionY = new Animated.Value(0);

    const animateIcon = () => {
        Animated.timing(iconPositionX, {
            toValue: 100, 
            duration: 1000, 
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            iconPositionX.setValue(0);
            animateIcon();
        });     

    };
    const animateIcon2 = () => {
        Animated.timing(iconPositionY, {
            toValue: -100,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            iconPositionY.setValue(0);
            animateIcon2();
        });     

    };

    useEffect(() => {
        animateIcon();
        animateIcon2();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ flexDirection: 'row',width:'68%', justifyContent:'space-between' }}>
                <Animated.View
                    style={{
                        backgroundColor: "#EDB7ED",
                        width: 0,
                        transform: [{ translateX: iconPositionX }],
                    }}
                >
                    <FontAwesomeIcon icon={faArrowRight} size={50} />
                </Animated.View>
                <Animated.View
                    style={{
                        backgroundColor: "#EDB7ED", 
                        width: 0,
                        marginLeft:-30,
                        transform: [{ translateX: iconPositionY }], 
                        
                    }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={50} />
                </Animated.View>
                
            </View>

        </SafeAreaView>

    );
}
