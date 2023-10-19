import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import ModalPlaces from '../my_component/ModalPlaces'

export default function MapScreen() {
    const [modalVisible, setModalVisible] = useState(false)

    function OpenModal(){
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesomeIcon icon={faLocationCrosshairs} size={20} color='red'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={OpenModal}>
                    <FontAwesomeIcon icon={faClock} size={20} color='red'/>
                </TouchableOpacity>
            </View>
            
            <ModalPlaces visible = {modalVisible} setModalVisible ={setModalVisible}></ModalPlaces>
            

            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'relative'
    },
    buttonView:{
        position:'absolute',
        top:100,
        right:10
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        width:40,
        height:40,
        borderWidth:1,
        borderRadius:5
    }
})