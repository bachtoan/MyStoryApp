import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function Slider({setMinTime, setMaxTime}) {
    const [values, setValues] = useState([540, 1380]);

    const minutesToTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedTime = `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
        return formattedTime;
    };
    const minutesToTimeWithoutDot = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedTime = `${hours}${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
        return formattedTime;
    };
    

    const CustomSliderMarkerLeft = ({ currentValue }) => (
        <View style={styles.customMarker}>
            <Text style={styles.customMarkerValue}>{minutesToTime(currentValue)}</Text>
        </View>
    );


    const CustomSliderMarkerRight = ({ currentValue }) => (
        <View style={styles.customMarker}>
            <Text style={styles.customMarkerValue}>{minutesToTime(currentValue)}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <MultiSlider
                isMarkersSeparated={true}
                customMarkerLeft={(e) => (
                    <CustomSliderMarkerLeft currentValue={e.currentValue} />
                )}
                customMarkerRight={(e) => (
                    <CustomSliderMarkerRight currentValue={e.currentValue} />
                )}
                values={values}
                onValuesChange={(newValues) => setValues(newValues)}
                onValuesChangeFinish={(newValues) => {
                    const newMinTime = minutesToTimeWithoutDot(newValues[0]);
                    const newMaxTime = minutesToTimeWithoutDot(newValues[1]);
                    setMinTime(newMinTime);
                    setMaxTime(newMaxTime);
                }}
                
                min={540}
                max={1380}
                step={1}
                sliderLength={280}
                allowOverlap={false}
                trackStyle={{
                    height: 5,
                    backgroundColor: 'lightblue',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    customMarker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        width: 60,
        marginTop: 4,
        height: 30,
        borderRadius: 10,
    },
    customMarkerValue: {
        color: 'white',
        fontWeight: 'bold',
    },

});
