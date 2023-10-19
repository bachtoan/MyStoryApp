import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { ContextAPI } from '../context/ContextAPI';

export default function Map() {
    const mapViewRef = useRef();
    const [currentLocation, setCurrentLocation] = useState(null);
    const {locations} = useContext(ContextAPI);

    // Hàm để lấy vị trí hiện tại bằng GPS
    
    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Cập nhật vị trí hiện tại và định vị trên bản đồ
            setCurrentLocation({ latitude, longitude });
            mapViewRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapViewRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 20.99516226378963,
                    longitude: 105.80556624635713,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {locations && locations.map((location) => (
                    <Marker
                    key={location.id}
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lng,
                    }}
                    title={location.name}
                />
                ))}

                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        title="Your Location"
                        description="You are here"
                    />
                )}
            </MapView>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
                    <FontAwesomeIcon icon={faLocationCrosshairs} size={20} color='red'/>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    buttonView:{
        position:'absolute',
        top:100,
        backgroundColor:'white',
        right:10,
        borderWidth:1,
        borderRadius:5
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        width:40,
        height:40,
        
    }
});
