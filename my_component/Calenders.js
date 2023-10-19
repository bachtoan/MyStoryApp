import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';

export default function Calenders({ visible,setVisible, setDayPicker }) {
    const [selected, setSelected] = useState('');
    function Close(){
        setVisible(false)
    }
    function Submit(){
        setDayPicker(selected);
        setVisible(false)

    }
    return (
        <Modal visible={visible} transparent={false} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <Calendar

                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={Close}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={Submit}>
                            <Text style={styles.text}>Ok</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0,
        width: "80%",
        paddingBottom: 20,
        backgroundColor: 'white',
        borderWidth: 1
    },
    buttonView: {
        flexDirection: 'row',
        marginLeft: "50%"
    },
    button: {
        padding: 10,
        marginTop: 20,
        marginRight: 10,

    },
    text: {
        fontSize: 20
    }
})