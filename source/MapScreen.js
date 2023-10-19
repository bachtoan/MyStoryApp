import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import ModalPlaces from '../my_component/ModalPlaces'
import Map from '../my_component/Map'

export default function MapScreen() {
    const [modalVisible, setModalVisible] = useState(false)

    function OpenModal(){
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Map></Map>

            <View style={styles.buttonView}>
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
        flex:1,
        position:'relative'
    },
    buttonView:{
        position:'absolute',
        top:150,
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
})